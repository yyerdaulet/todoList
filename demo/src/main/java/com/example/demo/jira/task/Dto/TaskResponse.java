package com.example.demo.jira.task.Dto;


import com.example.demo.jira.comment.CommentEntity;
import com.example.demo.jira.task.Status;
import com.example.demo.jira.user.UserEntity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

import java.util.List;

public record TaskResponse(
        @Null
        Long id,

        @NotNull
        String title,

        @NotNull
        @Enumerated(EnumType.STRING)
        Status status,

        @NotNull
        String assignee,

        List<CommentEntity> comments


){
}
