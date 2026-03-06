package com.example.demo.jira.profile.dto;

import com.example.demo.jira.profile.Enum.Degree;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public record ProfileCrReq(
        Long user_id,

        String orcid,

        String name,

        String lastName,

        String midName,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        LocalDate birthday,

        Degree degree,

        Long mark,

        String city,

        Long jsn
){

}
