package com.example.demo.jira.groupChat.chat.dto;

import com.example.demo.jira.items.profile.dto.ProfileResponse;
import lombok.Data;

import java.util.List;


public record ChatRequest(
        String title,
        String about,
        List<ProfileResponse> members
) {

}
