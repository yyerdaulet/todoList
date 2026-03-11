package com.example.demo.jira.profile.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record OpenAlexResponse(
        List<AlexResponseDTO> results
) {
}
