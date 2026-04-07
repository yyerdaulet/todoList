package com.example.demo.jira.items.article.dto;

import com.example.demo.jira.items.profile.dto.ProfileResponse;

import java.util.List;

public record ArticleResponse(
    String description,
    List<ProfileResponse> authors,
    String title,
    Integer cited_by_count,
    Integer referenced_works_count,
    String doi,
    Integer publication_year,
    String id,
    Long lab_id
) {
}
