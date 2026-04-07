package com.example.demo.jira.items.project.dto;

import com.example.demo.jira.items.profile.dto.ProfileResponse;

import java.util.List;

public record ProjectCreateRequest(
        String title,
        String purpose,
        List<String> tasks,
        String result,
        List<ProfileResponse> authors
) {

}
