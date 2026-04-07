package com.example.demo.jira.items.profile.dto;

import com.example.demo.jira.items.profile.Enum.Degree;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public record ProfileCrReq(
        Long user_id,

        Long lab_id,

        String orcid,

        String name,

        String lastName,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        LocalDate birthday,

        Degree degree
){

}
