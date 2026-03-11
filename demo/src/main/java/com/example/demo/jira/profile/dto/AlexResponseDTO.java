package com.example.demo.jira.profile.dto;


import java.util.List;
import java.util.Map;

public record AlexResponseDTO(
        Map<String, List<Integer>> abstract_inverted_index,
        List<Authorship> authorships,
        String title,
        Integer cited_by_count,
        Integer referenced_works_count,
        String doi,
        Integer publication_year,
        String id

) {
}
