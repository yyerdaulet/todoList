package com.example.demo.jira.task.Dto;


import com.example.demo.jira.task.Status;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

import java.time.LocalDate;
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

        @NotNull
        List<String> comments


){
}
