package com.example.demo.jira.groupChat.messages.mapper;

import com.example.demo.jira.groupChat.messages.dto.MessageRequest;
import com.example.demo.jira.groupChat.messages.dto.MessageResponse;
import com.example.demo.jira.groupChat.messages.entity.MessageEntity;
import com.example.demo.jira.items.profile.mapper.ProfileMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
@RequiredArgsConstructor
public class MessageMapper {
    private final ProfileMapper profileMapper;

    public MessageResponse toDomain(MessageEntity entity){
        return new MessageResponse(
                entity.getId(),
                profileMapper.toDomain(entity.getProfile()),
                entity.getContent(),
                entity.getCreatedAt()
        );
    }

    public MessageEntity toEntity(MessageRequest request){
        return new MessageEntity(
                null,
                null,
                null,
                request.content(),
                Instant.now()
        );
    }
}
