package com.example.demo.jira.items.news.service;

import com.example.demo.jira.items.news.dto.NewsRequest;
import com.example.demo.jira.items.news.entity.NewsEntity;
import com.example.demo.jira.items.news.mapper.NewsMapper;
import com.example.demo.jira.items.news.repository.NewsRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class NewsService {
    private final NewsRepository repository;
    private final NewsMapper mapper;

    public List<NewsRequest> getAllNews() {
        return repository.findAll()
                .stream()
                .map(mapper::toDomain).toList();
    }

    public NewsRequest getNews(Long id) {
        NewsEntity news =  repository.findById(id)
                .orElseThrow(
                        () -> new EntityNotFoundException("News not found")
                );
        return mapper.toDomain(news);
    }

    public Void createNews(NewsRequest request) {
        repository.save(mapper.toEntity(request));
        return null;
    }

    public NewsRequest updateNews(Long id,NewsRequest request){
        NewsEntity news = repository.findById(id)
                .orElseThrow(
                        () -> new EntityNotFoundException("News not found")
                );

        news.setPublication_text(request.publication_text());
        news.setPublication_date(request.publication_date());
        news.setPublication_title(request.publication_title());

        repository.save(news);

        return mapper.toDomain(news);
    }


    public void deleteNews(Long id) {
        repository.deleteById(id);
    }
}
