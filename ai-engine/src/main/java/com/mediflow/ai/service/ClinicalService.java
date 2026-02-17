package com.mediflow.ai.service;

import dev.langchain4j.model.chat.ChatLanguageModel;
import org.springframework.stereotype.Service;

@Service
public class ClinicalService {

    private final ChatLanguageModel chatModel;

    public ClinicalService(ChatLanguageModel chatModel) {
        this.chatModel = chatModel;
    }

    public String generateSummary(String patientData) {
        String prompt = """
            SYSTEM: Summarize patient history.
            DATA: %s
            OUTPUT: Respond ONLY in JSON format: { "summary": "...", "risk_factors": [], "suggested_actions": [] }
            """.formatted(patientData);
        return cleanJson(chatModel.generate(prompt));
    }

    public String checkSafety(String allergies, String newMeds) {
        String prompt = """
            SYSTEM: Drug Interaction Checker. 
            ALLERGIES: %s
            NEW MEDS: %s
            OUTPUT: Respond ONLY in JSON format: { "safe": boolean, "warnings": [] }
            """.formatted(allergies, newMeds);
        return cleanJson(chatModel.generate(prompt));
    }

    public String analyzeTrends(String recentDiagnoses) {
        String prompt = "Analyze trends: " + recentDiagnoses + ". Respond ONLY in JSON { 'trend': '', 'alert': '' }";
        return cleanJson(chatModel.generate(prompt));
    }

    private String cleanJson(String response) {
        return response.replaceAll("```json", "").replaceAll("```", "").trim();
    }
}