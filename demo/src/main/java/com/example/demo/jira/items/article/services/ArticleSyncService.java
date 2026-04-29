package com.example.demo.jira.items.article.services;

import com.example.demo.jira.items.article.dto.AlexResponseDTO;
import com.example.demo.jira.items.article.dto.Authorship;
import com.example.demo.jira.items.article.entity.ArticleEntity;
import com.example.demo.jira.items.article.repository.ArticleRepository;
import com.example.demo.jira.items.lab.entity.LabEntity;
import com.example.demo.jira.items.lab.repository.LabRepository;
import com.example.demo.jira.items.profile.model.ProfileEntity;
import com.example.demo.jira.items.profile.repo.ProfileRepository;
import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.tools.TextBuilder;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import static java.util.function.Function.identity;
import static java.util.stream.Collectors.partitioningBy;
import static java.util.stream.Collectors.toMap;

@Service
@AllArgsConstructor
public class ArticleSyncService {
    private final LabRepository labRepository;
    private final OpenAlexService alexService;
    private final ProfileRepository profileRepository;
    private final ArticleRepository articleRepository;
    private final TextBuilder textBuilder;
    private final static Logger logger = LoggerFactory.getLogger(ArticleSyncService.class);

    @LogExecutionTime
    @Transactional
    public void syncResearcherArticles(String orcid){
        List<AlexResponseDTO> receivedArticles = alexService.getWorksByOrcid(orcid);

        for(AlexResponseDTO article : receivedArticles){
            Map<Boolean,List<Authorship>> partition = article.authorships().stream()
                    .collect(partitioningBy(
                            authorship -> authorship.author().hasOrcid()
                    ));

            Set<String> eachAuthorsOrcid = partition.get(true).stream()
                    .map(
                            authorship -> authorship.author().orcid()
                    ).collect(Collectors.toSet());

            Set<ProfileEntity> profiles = new HashSet<>(profileRepository.findAllByOrcidIn(eachAuthorsOrcid));
            if(articleRepository.existsByDoi(article.doi())){
                updateExisting(article,profiles);
            }else {
                createNew(article,profiles);
            }
        }

    }

    @Transactional
    @LogExecutionTime
    public void syncLabArticles(Long labId){
        LabEntity requestedLab = labRepository.findById(labId)
                .orElseThrow(
                        () -> new EntityNotFoundException(
                                "Lab not found : " + labId
                        )
                );

        Set<String> researchersOrcid = requestedLab
                .getResearches().stream()
                .map(ProfileEntity::getOrcid)
                .collect(Collectors.toSet());

        for(String orcid : researchersOrcid){
            syncResearcherArticles(orcid);
        }
    }

    private void updateExisting(AlexResponseDTO article,Set<ProfileEntity> authors){
        ArticleEntity entity = articleRepository.findByDoi(article.doi());
        entity.setAuthors(authors);
        entity.setDescription(textBuilder.BuildTextFromIndex(article.abstract_inverted_index()));
        entity.setCitationCount(article.cited_by_count());
        entity.setTitle(article.title());
        entity.setReferenced_works_count(article.referenced_works_count());
        articleRepository.save(entity);
    }

    private void createNew(AlexResponseDTO article,Set<ProfileEntity> authors){
        ArticleEntity entity = new ArticleEntity(
                null,
                textBuilder.BuildTextFromIndex(article.abstract_inverted_index()),
                article.title(),
                article.cited_by_count(),
                article.referenced_works_count(),
                article.doi(),
                article.publication_year(),
                authors
        );

        articleRepository.save(entity);
    }



}
