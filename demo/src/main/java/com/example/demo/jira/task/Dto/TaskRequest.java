package com.example.demo.jira.task.Dto;

import com.example.demo.jira.task.Status;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;



import java.util.List;

public record TaskRequest(
        @NotNull
        String title
){
}