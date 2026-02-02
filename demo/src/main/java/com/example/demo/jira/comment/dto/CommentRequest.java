package com.example.demo.jira.comment.dto;

import jakarta.validation.constraints.NotNull;

public record CommentRequest (
        @NotNull
        String text
){

}
