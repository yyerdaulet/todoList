package com.example.demo.jira.user;

import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.user.Dto.UserCreateRequest;
import com.example.demo.jira.user.Dto.UserLoginRequest;
import com.example.demo.jira.user.Dto.UserLoginResponse;
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
    ResponseEntity<Void> registration(
            @RequestBody UserCreateRequest request
            ){
        service.registration(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @LogExecutionTime
    @PostMapping("/login")
    ResponseEntity<UserLoginResponse> login(
            @RequestBody UserLoginRequest request
    ){
        return ResponseEntity.status(HttpStatus.OK).body(service.login(request));
    }

    @LogExecutionTime
    @GetMapping("/login/{user_id}/check")
    ResponseEntity<Boolean> check(
           @PathVariable("user_id")  Long user_id){
        return ResponseEntity.status(HttpStatus.OK).body(service.check(user_id));
    }

}
