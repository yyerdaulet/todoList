package com.example.demo.jira.items.lab.dto;

import java.util.List;

public record LabResponse(
        Long id,
        String name,
        String info,
        List<String> projects,
        List<String> articles,
        List<String> researchers
) {
}
