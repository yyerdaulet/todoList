package com.example.demo.jira.user.Dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

import java.util.List;

public record UserCreateResponse (
        @Null
        Long id,

        @NotNull
        String name,

        @Null
        List<String> projects
){
}
