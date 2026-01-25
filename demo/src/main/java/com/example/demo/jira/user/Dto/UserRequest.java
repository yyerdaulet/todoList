package com.example.demo.jira.user.Dto;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record UserRequest(

        @NotNull
        String name,

        @NotNull
        List<String> projects
){
}
