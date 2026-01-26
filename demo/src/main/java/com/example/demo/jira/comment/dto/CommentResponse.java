package com.example.demo.jira.comment.dto;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

public record CommentResponse(
        @Id
        @Null
        Long id,

        @NotNull
        String text,

        @NotNull
        String author
) {

}
