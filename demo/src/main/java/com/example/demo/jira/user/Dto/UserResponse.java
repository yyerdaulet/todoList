package com.example.demo.jira.user.Dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

import java.util.List;

public record UserResponse(
        @Null
        Long id,

        @NotNull
        String name,

        @NotNull
        List<String> projects
) {
}
