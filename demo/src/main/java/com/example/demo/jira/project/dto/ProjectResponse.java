package com.example.demo.jira.project.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

import java.util.List;

public record ProjectResponse(
   @Null
   Long id,
   @NotNull
   String name,
   @NotNull
   String owner,
   @NotNull
   List<String> tasks
) {
}
