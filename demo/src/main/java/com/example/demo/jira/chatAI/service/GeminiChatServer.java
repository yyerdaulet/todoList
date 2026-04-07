package com.example.demo.jira.chatAI.service;

import com.example.demo.jira.chatAI.dto.AIChatRequest;
import com.example.demo.jira.chatAI.dto.AIChatResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class GeminiChatServer {
    private final RestClient restClient = RestClient.create();

    @Value("${rag.service.url:http://localhost:8000}")
    private String ragServiceURL;

    public AIChatResponse chat(AIChatRequest request){
        return restClient.post()
                .uri(ragServiceURL+"/chat")
                .contentType(MediaType.APPLICATION_JSON)
                .body(request)
                .retrieve()
                .body(AIChatResponse.class);
    }


}
