package com.example.demo.jira.profile.Dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public record ProfileCreateResponse(
        @Id
        @NotNull
        Long id,

        @NotNull
        String name,

        String lastName,

        @JsonFormat(shape= JsonFormat.Shape.STRING,pattern = "dd-MM-yyyy")
        LocalDate birthday,

        String degree,

        String university,

        @Null
        List<String> projects
){
}
