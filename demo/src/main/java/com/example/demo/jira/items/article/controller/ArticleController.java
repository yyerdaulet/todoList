package com.example.demo.jira.items.article.controller;

import com.example.demo.jira.items.article.dto.ArticleResponse;
import com.example.demo.jira.items.article.services.ArticleService;
import com.example.demo.jira.log.LogExecutionTime;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class ArticleController {
    private final ArticleService service;

    @LogExecutionTime
    @GetMapping("/labs/{lab_id}/articles")
    public ResponseEntity<List<ArticleResponse>> getAllLabArticles(
            @PathVariable Long lab_id
    ){

        return ResponseEntity.status(HttpStatus.OK)
                .body(service.getAllLabArticles(lab_id));
    }

    @GetMapping("/profiles/{profile_id}/articles")
    public ResponseEntity<List<ArticleResponse>> getAllProfileArticles(
            @PathVariable Long profile_id
    ){
        return ResponseEntity.status(HttpStatus.OK)
                .body(service.getArticlesById(profile_id));
    }

    @GetMapping("/profiles/{profileId}/articles/{articleId}")
    public ResponseEntity<ArticleResponse> getArticleById(
            @PathVariable("profileId") Long profile_id,
            @PathVariable("articleId") Long articleId
    ){
        return ResponseEntity.status(HttpStatus.OK)
                .body(service.getArticleById(articleId));
    }


    @LogExecutionTime
    @GetMapping("/labs/{lab_id}/articles/update")
    public ResponseEntity<Void> updateArticles(
            @PathVariable Long lab_id
    ) throws Exception {
        service.updateLabArticlesFromAlex(lab_id);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @LogExecutionTime
    @GetMapping("/articles")
    public ResponseEntity<List<ArticleResponse>> getAllArticles(){
        return ResponseEntity.status(HttpStatus.OK)
                .body(service.getAllArticles());
    }

}
