package com.example.demo.jira.profile.dto;

import com.example.demo.jira.profile.Enum.Degree;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ProfileRequest(
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
