package com.example.demo.jira.project.dto;

import java.util.List;

public record ProjectResponse(
   Long id,

   String name,

   String owner,
   
   List<String> tasks
) {
}
