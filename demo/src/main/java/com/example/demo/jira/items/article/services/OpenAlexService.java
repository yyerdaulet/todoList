package com.example.demo.jira.items.article.services;

import com.example.demo.jira.items.article.dto.AlexResponseDTO;
import com.example.demo.jira.items.article.dto.ArticleAlexFetch;
import com.example.demo.jira.items.article.dto.OpenAlexResponse;
import com.example.demo.jira.log.LogExecutionTime;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class OpenAlexService {
    private final WebClient webClient;

    @LogExecutionTime
    public List<AlexResponseDTO> getWorksByOrcid(String orcid){
        return Optional.ofNullable(
                webClient.get()
                        .uri(u -> u.path("/works")
                                .queryParam("filter","author.orcid:"+orcid)
                                .build()
                        )
                        .retrieve()
                        .bodyToMono(OpenAlexResponse.class)
                        .timeout(Duration.ofSeconds(10))
                        .block()
        )
                .map(OpenAlexResponse::results)
                .orElse(List.of());
    }




    public ArticleAlexFetch getArticle(String doi){
        ArticleAlexFetch article = webClient.get()
                .uri(uriBuilder -> {
                    uriBuilder.path("/works/"+doi);
                    return uriBuilder.build();
                })
                .retrieve()
                .bodyToMono(ArticleAlexFetch.class)
                .block();

        return article;



    }


}
