package com.mediflow.ai.service;
import dev.langchain4j.data.embedding.Embedding;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.store.embedding.EmbeddingStore;
import dev.langchain4j.store.embedding.inmemory.InMemoryEmbeddingStore;
import dev.langchain4j.store.embedding.EmbeddingSearchRequest;
import dev.langchain4j.store.embedding.EmbeddingSearchResult;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.stream.Collectors;

@Service
public class RAGService {

    private final EmbeddingModel embeddingModel;
    private final EmbeddingStore<TextSegment> embeddingStore;
    private final ChatLanguageModel chatModel;
    
    // The File where we save our Brain 
    private static final String STORAGE_FILE = "mediflow-brain.json";

    public RAGService(EmbeddingModel embeddingModel, EmbeddingStore<TextSegment> embeddingStore, ChatLanguageModel chatModel) {
        this.embeddingModel = embeddingModel;
        this.embeddingStore = embeddingStore;
        this.chatModel = chatModel;
    }

    // --- 1. Auto-Load on Startup ---
    @PostConstruct
    public void loadBrain() {
        File file = new File(STORAGE_FILE);
        if (file.exists()) {
            try {
                String json = new String(Files.readAllBytes(Paths.get(STORAGE_FILE)));
                // We cast to InMemoryEmbeddingStore to use the load method
                if (embeddingStore instanceof InMemoryEmbeddingStore) {
                    ((InMemoryEmbeddingStore<TextSegment>) embeddingStore).fromJson(json);
                    System.out.println(" Brain Loaded from JSON file!");
                }
            } catch (Exception e) {
                System.err.println(" Failed to load brain: " + e.getMessage());
            }
        }
    }

    // --- 2. Ingest & Save ---
    public void ingestKnowledge(String text) {
        TextSegment segment = TextSegment.from(text);
        Embedding embedding = embeddingModel.embed(segment).content();
        embeddingStore.add(embedding, segment);
        
        // Auto-Save after learning
        saveBrain();
    }

    private void saveBrain() {
        try {
            if (embeddingStore instanceof InMemoryEmbeddingStore) {
                String json = ((InMemoryEmbeddingStore<TextSegment>) embeddingStore).serializeToJson();
                Files.write(Paths.get(STORAGE_FILE), json.getBytes());
                System.out.println("💾 Brain Saved to JSON file!");
            }
        } catch (IOException e) {
            System.err.println("⚠️ Failed to save brain: " + e.getMessage());
        }
    }

    // --- 3. Query (Same as before) ---
    public String searchAndAnswer(String query) {
        String context = retrieveContext(query);
        String prompt = "CONTEXT: " + context + "\nQUESTION: " + query + "\nANSWER:";
        return chatModel.generate(prompt);
    }
    
    // --- 4. Suggest RX (Same as before) ---
    public String suggestPrescription(String description) {
        String context = retrieveContext(description);
        String prompt = """
            SYSTEM: Prescriber AI. CONTEXT: %s
            CONDITION: %s
            OUTPUT: Respond ONLY in JSON format: { "suggestions": [{ "name": "DrugName", "dosage": "500mg", "freq": "BID", "dur": "3 days" }] }
            """.formatted(context, description);
        return cleanJson(chatModel.generate(prompt));
    }

    private String retrieveContext(String text) {
        Embedding queryEmbedding = embeddingModel.embed(text).content();
        EmbeddingSearchResult<TextSegment> searchResult = embeddingStore.search(
            EmbeddingSearchRequest.builder()
                .queryEmbedding(queryEmbedding)
                .maxResults(3)
                .minScore(0.6)
                .build()
        );

        return searchResult.matches().stream()
                .map(match -> match.embedded().text())
                .collect(Collectors.joining("\n"));
    }
    
    private String cleanJson(String response) {
        return response.replaceAll("```json", "").replaceAll("```", "").trim();
    }
}