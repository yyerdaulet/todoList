package com.example.demo.jira.user;

import com.example.demo.jira.project.ProjectEntity;
import com.example.demo.jira.user.Dto.UserCreateResponse;
import com.example.demo.jira.user.Dto.UserResponse;
import jakarta.validation.Valid;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserResponse toDomain(UserEntity user){
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getProjects().stream().map(ProjectEntity::getName).toList()
        );
    }

    public UserCreateResponse toUserCreateResponse(UserEntity user){
        return new @Valid UserCreateResponse(
                user.getId(),
                user.getName(),
                null
        );
    }

}
