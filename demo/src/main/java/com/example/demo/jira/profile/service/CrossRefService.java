package com.example.demo.jira.profile.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@AllArgsConstructor
@Service
public class CrossRefService {
    private final WebClient webClient;

    public Object getArticle(String url){
        return null;
    }
}
