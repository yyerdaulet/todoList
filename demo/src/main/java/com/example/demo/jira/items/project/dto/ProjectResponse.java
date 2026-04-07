package com.example.demo.jira.items.project.dto;

import com.example.demo.jira.items.profile.dto.ProfileResponse;
import com.example.demo.jira.items.project.enums.Status;

import java.util.List;

public record ProjectResponse(
        Long id,
        String title,
        Status status,
        String purpose,
        List<String> tasks,
        String result,
        List<ProfileResponse> profiles,
        List<String> pictures
) {
}
