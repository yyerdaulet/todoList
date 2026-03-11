package com.example.demo.jira.profile.service;

import com.example.demo.jira.profile.dto.ArticleAlexFetch;
import com.example.demo.jira.profile.dto.ArticleResponse;
import com.example.demo.jira.profile.dto.OpenAlexResponse;
import com.example.demo.jira.profile.tool.TextBuilder;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;

@Service
@AllArgsConstructor
public class OpenAlexService {
    private final WebClient webClient;
    private final TextBuilder textBuilder;

    public List<ArticleResponse> searchArticles(String orcid){

        OpenAlexResponse response =  webClient.get()
                .uri(uriBuilder -> {
                    uriBuilder.path("/works");
                    uriBuilder.queryParam("filter","author.orcid:"+orcid);
                    return uriBuilder.build();
                })
                .retrieve()
                .bodyToMono(OpenAlexResponse.class)
                .block();

        return response.results().stream()
                .map(
                        (alexResDto ->
                                new ArticleResponse(
                                        textBuilder.BuildTextFromIndex(alexResDto.abstract_inverted_index()),
                                        textBuilder.getAuthors(alexResDto.authorships()),
                                        alexResDto.title(),
                                        alexResDto.cited_by_count(),
                                        alexResDto.referenced_works_count(),
                                        alexResDto.doi(),
                                        alexResDto.publication_year(),
                                        alexResDto.id()
                                ))
                ).toList();

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
