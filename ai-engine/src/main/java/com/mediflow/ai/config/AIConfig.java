package com.mediflow.ai.config;

import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.ollama.OllamaChatModel;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.model.ollama.OllamaEmbeddingModel;
import dev.langchain4j.store.embedding.EmbeddingStore;
import dev.langchain4j.store.embedding.inmemory.InMemoryEmbeddingStore; 
import dev.langchain4j.data.segment.TextSegment;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;

@Configuration
public class AIConfig {

    @Bean
    public ChatLanguageModel chatLanguageModel() {
        return OllamaChatModel.builder()
                .baseUrl("http://localhost:11434")
                .modelName("phi3")
                .temperature(0.3)
                .timeout(Duration.ofSeconds(60))
                .build();
    }

    @Bean
    public EmbeddingModel embeddingModel() {
        return OllamaEmbeddingModel.builder()
                .baseUrl("http://localhost:11434")
                .modelName("nomic-embed-text")
                .build();
    }

    @Bean
    public EmbeddingStore<TextSegment> embeddingStore() {
        return new InMemoryEmbeddingStore<>(); 
    }
}