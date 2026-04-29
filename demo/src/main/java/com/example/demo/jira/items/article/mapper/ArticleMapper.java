package com.example.demo.jira.items.article.mapper;

import com.example.demo.jira.items.article.dto.AlexResponseDTO;
import com.example.demo.jira.items.article.dto.OpenAlexResponse;
import com.example.demo.jira.items.article.entity.ArticleEntity;
import com.example.demo.jira.items.article.dto.ArticleResponse;
import com.example.demo.jira.items.lab.repository.LabRepository;
import com.example.demo.jira.items.profile.dto.ProfileResponse;
import com.example.demo.jira.items.profile.mapper.ProfileMapper;
import com.example.demo.jira.items.profile.model.ProfileEntity;
import com.example.demo.jira.tools.TextBuilder;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
@AllArgsConstructor
public class ArticleMapper {
    private final ProfileMapper profileMapper;
    private static final String ORCID_PREFIX = "https://orcid.org/";
    private final TextBuilder textBuilder;

    public ArticleResponse toResponse(AlexResponseDTO work, Map<String,
            ProfileEntity> profilesByOrcid,
                                      Long labId){
            List<ProfileResponse> authors = work.authorships().stream()
                    .map(a -> extractOrcid(a.author().orcid()))
                    .filter(profilesByOrcid::containsKey)
                    .map(profilesByOrcid::get)
                    .map(profileMapper::toDomain)
                    .toList();

            return new ArticleResponse(
                    null,
                    textBuilder.BuildTextFromIndex(work.abstract_inverted_index()),
                    authors,
                    work.title(),
                    work.cited_by_count(),
                    work.referenced_works_count(),
                    work.doi(),
                    work.publication_year(),
                    labId
            );
    }



    private String extractOrcid(String fullOrcidUrl) {
        return fullOrcidUrl.replace(ORCID_PREFIX,"");
    }

    public ArticleResponse toDomain(ArticleEntity article){
            return new ArticleResponse(
                    article.getId(),
                    article.getDescription(),
                    article.getAuthors()
                            .stream()
                            .map(profileMapper::toDomain).toList(),
                    article.getTitle(),
                    article.getCitationCount(),
                    article.getReferenced_works_count(),
                    article.getDoi(),
                    article.getPublication_year(),
                    null
            );
    }


}
