package com.example.demo.jira.items.news.dto;

import java.time.LocalDate;

public record NewsRequest(
        String publication_title,
        LocalDate publication_date,
        String publication_text
) {
}
