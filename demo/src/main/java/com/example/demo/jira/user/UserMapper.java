package com.example.demo.jira.user;

import com.example.demo.jira.user.Dto.UserRequest;
import com.example.demo.jira.user.Dto.UserResponse;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserResponse toDomain(UserEntity user){
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getProjects()
        );
    }

    public UserEntity toEntity(Long id,UserRequest user){
        return new UserEntity(
                id,
                user.name(),
                user.projects()
        );
    }


}
