package com.example.demo.jira.items.task.dto;

import com.example.demo.jira.items.profile.dto.ProfileResponse;
import com.example.demo.jira.items.task.enums.State;

import java.time.LocalDateTime;
import java.util.Set;

public record TaskUpdateRequest(
        String title,
        String description,
        LocalDateTime start,
        LocalDateTime finish,
        State state,
        String reportPath,
        Set<ProfileResponse> assignee
) {

}
