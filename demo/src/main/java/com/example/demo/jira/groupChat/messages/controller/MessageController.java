package com.example.demo.jira.groupChat.messages.controller;

import com.example.demo.jira.groupChat.messages.dto.MessageRequest;
import com.example.demo.jira.groupChat.messages.dto.MessageResponse;
import com.example.demo.jira.groupChat.messages.services.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequiredArgsConstructor
public class MessageController {
    private final MessageService groupChatService;

    @GetMapping("/chats/{chatId}/messages")
    public ResponseEntity<Page<MessageResponse>> getMessages(
            @PathVariable Long chatId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ){
        return ResponseEntity.status(HttpStatus.OK)
                .body(groupChatService.getMessages(chatId,page,size));
    }

    @PostMapping("/chats/{chatId}/messages")
    public ResponseEntity<MessageResponse> sendMessage(
            @PathVariable Long chatId,
            @RequestBody MessageRequest request,
            Principal principal
            ){
        return ResponseEntity.status(HttpStatus.OK)
                .body(groupChatService.createAndSendMessage(request, principal.getName(), chatId));
    }


}
