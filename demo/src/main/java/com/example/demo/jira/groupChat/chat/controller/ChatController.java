package com.example.demo.jira.groupChat.chat.controller;

import com.example.demo.jira.groupChat.chat.dto.ChatRequest;
import com.example.demo.jira.groupChat.chat.dto.ChatResponse;
import com.example.demo.jira.groupChat.chat.services.ChatService;
import com.example.demo.jira.items.profile.dto.ProfileResponse;
import com.example.demo.jira.log.LogExecutionTime;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @LogExecutionTime
    @PostMapping("/chats")
    public ResponseEntity<ChatResponse> createChat(
            @RequestBody ChatRequest request,
            Principal principal
    ){
        String profileEmail = principal.getName();
        System.out.println(request);
        return ResponseEntity.status(HttpStatus.OK)
                .body(chatService.createGroupChat(profileEmail,request));
    }

    @LogExecutionTime
    @GetMapping("/chats/{chatId}")
    public ResponseEntity<ChatResponse> getChat(@PathVariable Long chatId){
        return ResponseEntity.status(HttpStatus.OK)
                .body(chatService.getGroupChat(chatId));
    }

    @LogExecutionTime
    @GetMapping("/chats")
    public ResponseEntity<List<ChatResponse>> getChats(){
        return ResponseEntity.status(HttpStatus.OK)
                .body(chatService.getChats());
    }

    @LogExecutionTime
    @PostMapping("/chats/{chatId}/add")
    public ResponseEntity<ChatResponse> addMembers(
            @PathVariable Long chatId,
            @RequestBody List<ProfileResponse> profiles
            ){
        return ResponseEntity.status(HttpStatus.OK)
                .body(chatService.addMembers(chatId,profiles));
    }
}
