package com.example.demo.jira.profile.dto;

public record ArticleResponse(
    String description,
    String authors,
    String title,
    Integer cited_by_count,
    Integer referenced_works_count,
    String doi,
    Integer publication_year,
    String id
) {
}
