package com.example.demo.jira.profile.Dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public record ProfileCrReq (
        Long user_id,
        String name,
        String lastName,
        String email,
        @JsonFormat(shape= JsonFormat.Shape.STRING,pattern = "dd-MM-yyyy")
        LocalDate birthday,
        String degree,
        String university
){
}
