package com.example.demo.jira.comment.dto;

import com.example.demo.jira.task.TaskEntity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

public record CommentResponse(
        @Id
        Long id,

        @NotNull
        String text,

        @NotNull String task
) {

}
