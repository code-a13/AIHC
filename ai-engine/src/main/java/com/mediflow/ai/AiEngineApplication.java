package com.mediflow.ai;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AiEngineApplication {
    public static void main(String[] args) {
        SpringApplication.run(AiEngineApplication.class, args);
        System.out.println("🚀 AI Brain (Java) is Active on Port 8080!");
    }
}