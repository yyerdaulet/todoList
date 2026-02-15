package com.example.demo.jira.user.Dto;


public record UserLoginRequest (
        String email,
        String password
){
}
