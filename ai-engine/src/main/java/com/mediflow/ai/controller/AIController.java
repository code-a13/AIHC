package com.mediflow.ai.controller;

import org.springframework.web.bind.annotation.*;

import com.mediflow.ai.service.ClinicalService;
import com.mediflow.ai.service.RAGService;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*") 
public class AIController {

    private final RAGService ragService;
    private final ClinicalService clinicalService;

    public AIController(RAGService ragService, ClinicalService clinicalService) {
        this.ragService = ragService;
        this.clinicalService = clinicalService;
    }

    // === RAG ENDPOINTS ===

    @PostMapping("/api/rag/ingest")
    public Map<String, String> ingest(@RequestBody Map<String, String> req) {
        ragService.ingestKnowledge(req.get("text"));
        return Map.of("status", "success", "message", "Knowledge saved to ChromaDB");
    }

    @PostMapping("/api/rag/query")
    public Map<String, String> query(@RequestBody Map<String, String> req) {
        String answer = ragService.searchAndAnswer(req.get("query"));
        return Map.of("answer", answer);
    }

    @PostMapping("/api/rag/suggest-rx")
    public String suggestRx(@RequestBody Map<String, String> req) {
        return ragService.suggestPrescription(req.get("description"));
    }

    // === CLINICAL ENDPOINTS ===

    @PostMapping("/api/summary")
    public String summary(@RequestBody Map<String, Object> req) {
        return clinicalService.generateSummary(req.toString());
    }

    @PostMapping("/api/safety-check")
    public String safetyCheck(@RequestBody Map<String, Object> req) {
        return clinicalService.checkSafety(
            req.get("allergies").toString(),
            req.get("new_meds").toString()
        );
    }

    @PostMapping("/api/analyze-trends")
    public String analyzeTrends(@RequestBody Map<String, String> req) {
        return clinicalService.analyzeTrends(req.get("recent_diagnoses"));
    }
    
    @GetMapping("/health")
    public Map<String, String> health() {
        return Map.of("status", "online", "engine", "Java Spring Boot");
    }
}