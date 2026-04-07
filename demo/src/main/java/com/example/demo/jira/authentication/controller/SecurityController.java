package com.example.demo.jira.authentication.controller;

import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.authentication.Dto.TokenDto;
import com.example.demo.jira.authentication.Dto.UserCreateRequest;
import com.example.demo.jira.authentication.Dto.UserLoginRequest;
import com.example.demo.jira.authentication.Dto.UserLoginResponse;
import com.example.demo.jira.authentication.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class SecurityController {

    private UserService service;

    @LogExecutionTime
    @PostMapping("/register")
    ResponseEntity<TokenDto> registration(
            @RequestBody UserCreateRequest request
            ){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.registration(request));
    }

    @LogExecutionTime
    @PostMapping("/login")
    ResponseEntity<UserLoginResponse> login(
            @RequestBody UserLoginRequest request
    ){
        return ResponseEntity.status(HttpStatus.OK).body(service.login(request));
    }

    @GetMapping("register/verify")
    public ResponseEntity<String> verifyEmail(@RequestParam String token){
        return ResponseEntity.status(200).body(service.verifyEmail(token));
    }

    @LogExecutionTime
    @GetMapping("/login/{user_id}/check")
    ResponseEntity<Boolean> check(
           @PathVariable("user_id")  Long user_id){
        return ResponseEntity.status(HttpStatus.OK).body(service.check(user_id));
    }

}
