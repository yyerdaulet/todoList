package com.example.demo.jira.student.dto;

import com.example.demo.jira.student.Enum.Degree;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

import java.time.LocalDate;
import java.util.List;

public record StudentCreateResponse(
        @Id
        @NotNull
        Long id,

        @NotNull
        String name,

        String lastName,

        String midName,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        LocalDate birthday,

        String city,

        Degree degree,

        Long mark
){
}
