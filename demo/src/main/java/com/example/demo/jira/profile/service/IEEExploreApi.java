package com.example.demo.jira.profile.service;

import com.example.demo.jira.profile.dto.AlexResponseDTO;
import com.example.demo.jira.profile.dto.ArticleAlexFetch;
import com.example.demo.jira.profile.dto.ArticleResponse;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@AllArgsConstructor
public class IEEExploreApi {
    private final WebClient webClient;

    public ArticleResponse getArticle(String url) throws Exception{
        String html =  webClient.get().uri( uriBuilder -> {
                    uriBuilder.scheme("https");
                    uriBuilder.host("ieeexplore.ieee.org");
                    uriBuilder.path("/document/"+url);
                    return uriBuilder.build();
                }
                ).retrieve()
                .bodyToMono(String.class)
                .block();
        Pattern pattern = Pattern.compile(
                "xplGlobal\\.document\\.metadata\\s*=\\s*(\\{.*?\\});",
                Pattern.DOTALL
        );

        Matcher matcher = pattern.matcher(html);

        if(!matcher.find()){
            throw new RuntimeException("Matches not found");
        }

        String json = matcher.group(1);

        ObjectMapper mapper = new ObjectMapper();

        Map<String,Object> data = mapper.readValue(json, new TypeReference<Map<String, Object>>() {
        });

        return new ArticleResponse(
                data.get("abstract").toString(),
                data.get("authorNames").toString(),
                data.get("displayDocTitle").toString(),
                Integer.parseInt(data.get("citationCount").toString()),
                null,
                null,
                null,
                null
        );
    }
}
