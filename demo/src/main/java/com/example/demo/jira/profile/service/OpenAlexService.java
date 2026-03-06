package com.example.demo.jira.profile.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@AllArgsConstructor
public class OpenAlexService {
    private final WebClient webClient;

    public String searchArticles(String orcid){
        return webClient.get()
                .uri(uriBuilder -> {
                    uriBuilder.path("/works");
                    uriBuilder.queryParam("filter","author.orcid:"+orcid);
                    return uriBuilder.build();
                })
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

}
