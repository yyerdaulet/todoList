package com.example.demo.jira.project.dto;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record ProjectRequest(
    @NotNull
    String name,
    @NotNull
    String owner,
    @NotNull
    List<String> tasks
) {
}
