package com.example.demo.jira.student.dto;

import com.example.demo.jira.student.Enum.Degree;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public record StudentCrReq(
        Long user_id,

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
