package com.example.demo.jira.user.Dto;

import com.example.demo.jira.project.ProjectEntity;
import com.example.demo.jira.project.dto.ProjectResponse;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

import java.util.ArrayList;
import java.util.List;

public record UserResponse(
        Long id,

        @NotNull
        String name,

        List<String> projects
) {
}
