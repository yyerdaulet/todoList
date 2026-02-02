package com.example.demo.jira.project.dto;

import com.example.demo.jira.task.TaskEntity;
import com.example.demo.jira.user.UserEntity;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;

import java.util.List;

public record ProjectResponse(
   Long id,

   String name,

   String owner,
   
   List<String> tasks
) {
}
