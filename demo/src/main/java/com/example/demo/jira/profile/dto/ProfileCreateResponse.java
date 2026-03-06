package com.example.demo.jira.profile.dto;

import com.example.demo.jira.profile.Enum.Degree;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ProfileCreateResponse(
        @Id
        @NotNull
        Long id,

        String orcid,

        @NotNull
        String name,

        String lastName,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        LocalDate birthday,

        Degree degree
){
}
