package com.example.demo.jira.authentication.Dto;

public record UserLoginResponse(
        Long id,
        String jwt
) {
}
