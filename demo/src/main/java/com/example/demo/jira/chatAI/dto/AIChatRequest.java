package com.example.demo.jira.chatAI.dto;

public record AIChatRequest(
        String message,
        String sessionId
) {
}
