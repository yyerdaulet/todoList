package com.example.demo.jira.user;

import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.project.ProjectService;
import com.example.demo.jira.user.Dto.UserCreateResponse;
import com.example.demo.jira.user.Dto.UserRequest;
import com.example.demo.jira.user.Dto.UserResponse;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;


@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository repository;
    private final UserMapper mapper;
    private final PasswordEncoder passwordEncoder;

    @LogExecutionTime
    @GetMapping
    public List<UserResponse> getAllUsers() {
        return repository.findAll().stream().map(mapper::toDomain).toList();
    }

    @LogExecutionTime()
    public UserResponse getUserById(Long id) {
        UserEntity user = repository
                .findById(id)
                .orElseThrow( () -> new EntityNotFoundException("User Entity found item"));
        return mapper.toDomain(user);
    }

    @Transactional
    @LogExecutionTime()
    public UserCreateResponse createUser(@Valid UserRequest userToCreate) {
        String encodedPassword = passwordEncoder.encode(userToCreate.password());

        var newUser = new UserEntity(
                null,
                userToCreate.name(),
                userToCreate.email(),
                encodedPassword,
                UserRole.ASSIGNEE,
                null
        );

        repository.save(newUser);

        return mapper.toUserCreateResponse(newUser);
    }

    @Transactional
    @LogExecutionTime()
    @PutMapping
    public UserResponse updateUser(Long id,
            @Valid UserRequest userToUpdate) {
            var user = repository.findById(id).orElseThrow(
                    () -> new EntityNotFoundException("User not found")
            );
            user.setName(userToUpdate.name());
            repository.save(user);
            return mapper.toDomain(user);
    }

    @Transactional
    @LogExecutionTime()
    public void deleteUser(Long id) {
        if(!repository.existsById(id)){
            throw new EntityNotFoundException("User found item");
        }
        repository.deleteById(id);

    }
}
