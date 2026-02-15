package com.example.demo.jira.profile.Dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

import java.util.List;

public record ProfileCreateResponse(
        Long id,

        @NotNull
        String name,

        @Null
        List<String> projects
){
}
