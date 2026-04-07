package com.example.demo.jira.items.task.dto;

import com.example.demo.jira.items.profile.dto.ProfileResponse;

import java.time.LocalDateTime;
import java.util.Set;

public record TaskCreateResponse(
        Long id,
        String title,
        String description,
        LocalDateTime start,
        LocalDateTime finish,
        Set<ProfileResponse> assignee
) {
}
