package com.example.demo.jira.common;

import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.user.Dto.UserCreateResponse;
import com.example.demo.jira.user.Dto.UserRequest;
import com.example.demo.jira.user.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.service.annotation.GetExchange;

@AllArgsConstructor
@RestController
public class AuthorizationController {
    private UserService userService;


    @GetMapping("/login")
    public String getLoginPage() {
        return "public/authorization/login-page";
    }

    @GetMapping("/registration")
    public String getRegistrationPage(){
        return "public/authorization/registration-page";
    }

    @PostMapping("/registration")
    @LogExecutionTime()
    public ResponseEntity<UserCreateResponse> createUser(
            @RequestBody @Valid UserRequest userToCreate
    ){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(userToCreate));
    }
}
