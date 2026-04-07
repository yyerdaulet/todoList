package com.example.demo.jira.items.article.dto;

import com.example.demo.jira.items.profile.model.ProfileEntity;

import java.util.List;

public record CoAuthorsEntity(
        List<ProfileEntity> coAuthors
) {
}
