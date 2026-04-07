package com.example.demo.jira.authentication.Dto;

import com.example.demo.jira.authentication.enums.UserRole;

public record UserCreateRequest (
    String name,
    String email,
    String password,
    UserRole role
){
}
