package com.example.demo.jira.groupChat.chat.dto;


import com.example.demo.jira.groupChat.messages.dto.MessageResponse;
import com.example.demo.jira.items.profile.dto.ProfileResponse;

import java.util.List;

public record ChatResponse(
        Long chatId,
        String title,
        String about,
        List<ProfileResponse> members,
        List<MessageResponse> messages
) {
}
