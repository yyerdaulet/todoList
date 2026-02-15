package com.example.demo.jira.profile.Dto;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record ProfileResponse(
        Long id,

        @NotNull
        String name,

        List<String> projects
) {
}
