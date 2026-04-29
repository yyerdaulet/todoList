package com.example.demo.jira.groupChat.messages.dto;

import com.example.demo.jira.items.profile.dto.ProfileResponse;

import java.time.Instant;

public record MessageResponse(
        Long messageId,
        ProfileResponse profile,
        String content,
        Instant createdAt
) {
}
