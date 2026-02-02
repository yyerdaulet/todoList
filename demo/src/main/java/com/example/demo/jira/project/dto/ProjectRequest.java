package com.example.demo.jira.project.dto;

import jakarta.validation.constraints.NotNull;

public record ProjectRequest(
        @NotNull
        String name
) {
}