package com.example.demo.jira.groupChat.chat.mapper;

import com.example.demo.jira.groupChat.chat.dto.ChatRequest;
import com.example.demo.jira.groupChat.chat.dto.ChatResponse;
import com.example.demo.jira.groupChat.chat.entity.ChatEntity;
import com.example.demo.jira.groupChat.messages.mapper.MessageMapper;
import com.example.demo.jira.items.profile.mapper.ProfileMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@AllArgsConstructor
public class ChatMapper {
    private ProfileMapper profileMapper;
    private MessageMapper messageMapper;

    public ChatEntity toCreateEntity(ChatRequest request){
        return new ChatEntity(
                null,
                request.title(),
                request.about(),
                null,
                null
        );
    }

    public ChatResponse toDomain(ChatEntity entity){
        return new ChatResponse(
                entity.getId(),
                entity.getTitle(),
                entity.getAbout(),
                Optional.ofNullable(entity.getMembers())
                        .orElse(List.of())
                        .stream()
                        .map(profileMapper::toDomain)
                        .toList(),
                Optional.ofNullable(entity.getMessages())
                        .orElse(List.of())
                        .stream()
                        .map(messageMapper::toDomain)
                        .toList()
        );
    }
}
