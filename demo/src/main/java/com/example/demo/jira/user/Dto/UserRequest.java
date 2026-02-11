package com.example.demo.jira.user.Dto;

import com.example.demo.jira.user.UserRole;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record UserRequest(
        @NotNull
        String email,

        @NotNull
        String name,

        @NotNull
        String password
){
}
