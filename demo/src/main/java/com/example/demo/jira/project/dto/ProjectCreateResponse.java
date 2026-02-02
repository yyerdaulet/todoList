package com.example.demo.jira.project.dto;

import jakarta.validation.constraints.Null;

import java.util.List;

public record ProjectCreateResponse(
        Long id,

        String name,

        String owner
) {
}
