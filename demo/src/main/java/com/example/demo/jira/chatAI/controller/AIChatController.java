package com.example.demo.jira.chatAI.controller;

import com.example.demo.jira.chatAI.dto.AIChatRequest;
import com.example.demo.jira.chatAI.dto.AIChatResponse;
import com.example.demo.jira.chatAI.service.GeminiChatServer;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AIChatController {
    private final GeminiChatServer geminiChatServer;

    @PostMapping("/ai/chat")
    public ResponseEntity<AIChatResponse> chat(
            @RequestBody AIChatRequest request
    ){
        return ResponseEntity.status(HttpStatus.OK).body(geminiChatServer.chat(request));
    }

}
