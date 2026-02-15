package com.example.demo.jira.user.Dto;

import com.example.demo.jira.user.UserRole;

public record UserCreateRequest (
    String name,
    String email,
    String password,
    UserRole role
){
}
