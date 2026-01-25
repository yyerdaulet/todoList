package com.example.demo.jira.task.Dto;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record TaskRequest (
        @NotNull
        String text,
        @FutureOrPresent
        @NotNull
        LocalDate startTime,
        @NotNull
        @FutureOrPresent
        LocalDate deadLine
){
}
