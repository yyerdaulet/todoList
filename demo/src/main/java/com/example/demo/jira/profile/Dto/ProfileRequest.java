package com.example.demo.jira.profile.Dto;

import jakarta.validation.constraints.NotNull;

public record ProfileRequest(
        @NotNull
        String email,

        @NotNull
        String name,

        @NotNull
        String password
){
}
