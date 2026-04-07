package com.example.demo.jira.items.news.controller;

import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.items.news.dto.NewsRequest;
import com.example.demo.jira.items.news.service.NewsService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/news")
public class NewsController {
    private final NewsService service;

    @GetMapping
    @LogExecutionTime
    public ResponseEntity<List<NewsRequest>> getAllNews(){
        return ResponseEntity.status(HttpStatus.OK).body(service.getAllNews());
    }

    @GetMapping("/{id}")
    @LogExecutionTime
    public ResponseEntity<NewsRequest> getNews(
            @PathVariable Long id
    ){
        return ResponseEntity.status(HttpStatus.OK).body(service.getNews(id));
    }

    @PostMapping()
    @LogExecutionTime
    public ResponseEntity<Void> createNews(
            @RequestBody NewsRequest request
    ){
        return ResponseEntity.status(HttpStatus.OK).body(service.createNews(request));
    }

    @PutMapping("/{id}")
    @LogExecutionTime
    public ResponseEntity<NewsRequest> updateNews(
            @RequestBody NewsRequest request,
            @PathVariable Long id
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(service.updateNews(id,request));

    }

    @DeleteMapping("/{id}")
    @LogExecutionTime
    public ResponseEntity<NewsService> deleteNews(
            @PathVariable Long id
    ) {
        service.deleteNews(id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
