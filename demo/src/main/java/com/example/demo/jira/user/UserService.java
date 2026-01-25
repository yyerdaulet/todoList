package com.example.demo.jira.user;

import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.user.Dto.UserRequest;
import com.example.demo.jira.user.Dto.UserResponse;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;

import java.util.List;

public class UserService {
    private final UserRepository repository;
    private final UserMapper mapper;

    public UserService(UserRepository repository, UserMapper mapper) {
        this.mapper = mapper;
        this.repository = repository;
    }

    @LogExecutionTime()
    public List<UserResponse> getAllUsers() {
        return repository.findAll().stream().map(mapper::toDomain).toList();
    }

    @LogExecutionTime()
    public UserResponse getUserById(Long id) {
        UserEntity user = repository
                .findById(id)
                .orElseThrow( () -> new EntityNotFoundException("not found item"));
        return mapper.toDomain(user);
    }

    @LogExecutionTime()
    public UserResponse createUser(@Valid UserRequest userToCreate) {
        var newUser = new UserEntity(
                null,
                userToCreate.name(),
                userToCreate.projects()
        );
        repository.save(newUser);
        return mapper.toDomain(newUser);
    }

    @LogExecutionTime()
    public UserResponse updateUser(Long id,
            @Valid UserRequest userToUpdate) {
            if(!repository.existsById(id)){
                throw new EntityNotFoundException("Not found item");
            }
            var userToSave = mapper.toEntity(id,userToUpdate);
            var updatedTask = repository.save(userToSave);
            return mapper.toDomain(updatedTask);
    }

    @LogExecutionTime()
    public void deleteUser(Long id) {
        if(!repository.existsById(id)){
            throw new EntityNotFoundException("Not found item");
        }
        repository.deleteById(id);

    }
}
