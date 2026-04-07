package com.example.demo.jira.items.article.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ArticleAlexFetch(
        String title,
        String publication_date,
        Map<String, List<Integer>> abstract_inverted_index,
        Integer referenced_works_count,
        List<Authorship> authorships,
        String doi,
        Integer publication_year,
        Integer cited_by_count,
        String id
) {
}



