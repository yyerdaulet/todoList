package com.example.demo.task.Dto;


import com.example.demo.task.State;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

import java.time.LocalDate;

public record TaskResponse(
        @Null
        Long id,
        @NotNull
        String text,
        @FutureOrPresent
        @NotNull
        LocalDate startTime,
        @NotNull
        @FutureOrPresent
        LocalDate deadLine,
        State state
){
}
