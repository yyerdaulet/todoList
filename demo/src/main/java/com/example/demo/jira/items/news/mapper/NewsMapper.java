package com.example.demo.jira.items.news.mapper;

import com.example.demo.jira.items.news.dto.NewsRequest;
import com.example.demo.jira.items.news.entity.NewsEntity;
import org.springframework.stereotype.Component;

@Component
public class NewsMapper {
    public NewsRequest toDomain(NewsEntity newsEntity) {
        return new NewsRequest(
                newsEntity.getPublication_title(),
                newsEntity.getPublication_date(),
                newsEntity.getPublication_text()
        );
    }

    public NewsEntity toEntity(NewsRequest request) {
        return new NewsEntity(
                null,
                request.publication_title(),
                request.publication_date(),
                request.publication_text()
        );
    }
}
