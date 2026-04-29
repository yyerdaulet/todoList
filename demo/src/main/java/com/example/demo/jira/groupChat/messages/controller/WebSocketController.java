package com.example.demo.jira.groupChat.messages.controller;

import com.example.demo.jira.groupChat.messages.dto.MessageRequest;
import com.example.demo.jira.groupChat.messages.services.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;


@RestController
@RequiredArgsConstructor
public class WebSocketController {
    private final MessageService messageService;


    @MessageMapping("/chat/{chatId}")
    public void send(
            @DestinationVariable Long chatId,
            @Payload MessageRequest content,
            Principal principal
    ) {
        messageService.createAndSendMessage(content, principal.getName(), chatId);
    }
}
