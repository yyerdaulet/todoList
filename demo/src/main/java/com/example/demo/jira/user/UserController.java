package com.example.demo.jira.user;

import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.user.Dto.UserRequest;
import com.example.demo.jira.user.Dto.UserResponse;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    private final static Logger log = LoggerFactory.getLogger(UserController.class);

    public UserController(UserService userService) {this.userService = userService;}

    @GetMapping()
    @LogExecutionTime()
    public ResponseEntity<List<UserResponse>> getAllUsers(){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    @LogExecutionTime()
    public ResponseEntity<UserResponse> getUserById(
            @PathVariable("id") Long id
    ){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.getUserById(id));
    }

    @PostMapping()
    @LogExecutionTime()
    public ResponseEntity<UserResponse> createUser(
            @RequestBody @Valid UserRequest userToCreate
            ){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(userToCreate));
    }

    @PutMapping("/{id}")
    @LogExecutionTime()
    public ResponseEntity<UserResponse> updateUser(
            @PathVariable Long id,
            @RequestBody @Valid UserRequest userToUpdate
    ){
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.updateUser(id,userToUpdate));
    }

    @DeleteMapping("/id")
    @LogExecutionTime()
    public ResponseEntity<Void> deleteUser(
            @PathVariable("id") Long id
    ){
        userService.deleteUser(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }


}
