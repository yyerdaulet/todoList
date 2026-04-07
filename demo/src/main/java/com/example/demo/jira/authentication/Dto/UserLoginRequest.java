package com.example.demo.jira.authentication.Dto;


public record UserLoginRequest (
        String email,
        String password
){
}
