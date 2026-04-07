package com.example.demo.jira.items.article.services;

import com.example.demo.jira.items.article.entity.ArticleEntity;
import com.example.demo.jira.items.article.mapper.ArticleMapper;
import com.example.demo.jira.items.article.repository.ArticleRepository;
import com.example.demo.jira.items.lab.entity.LabEntity;
import com.example.demo.jira.items.lab.repository.LabRepository;
import com.example.demo.jira.items.article.dto.ArticleResponse;
import com.example.demo.jira.items.profile.model.ProfileEntity;
import com.example.demo.jira.items.profile.repo.ProfileRepository;
import com.example.demo.jira.items.profile.utils.ProfileUtils;
import com.example.demo.jira.log.LogExecutionTime;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ArticleService {
    private final ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;
    private final ArticleSyncService articleSyncService;
    private final static Logger logger = LoggerFactory.getLogger(ArticleService.class);
    private final LabRepository labRepository;
    private final ProfileRepository profileRepository;

    public void updateLabArticlesFromAlex(Long labId){
        articleSyncService.syncLabArticles(labId);
    }

    @LogExecutionTime
    public List<ArticleResponse> getAllLabArticles(Long labId) {
        LabEntity lab = labRepository.findById(labId)
                .orElseThrow(
                        () -> new EntityNotFoundException(
                                "Lab not found"
                        )
                );

      //  List<String> listOrcid = lab.getResearches().stream().map(ProfileEntity::getOrcid).toList();
        List<String> listOrcid = ProfileUtils.fetchListORCID(lab.getResearches());
        logger.info("List of orcid : " + listOrcid.size());


         // List<ArticleEntity> articles = articleRepository.findAllByResearchersOrcids(listOrcid);
        List<ArticleEntity> articles = articleRepository.findAll();
        logger.info("We send data, it's not us fault; The data : " + articles.size());


        return articles.stream().map(articleMapper::toDomain).toList();
    }

    public List<ArticleResponse> getArticlesById(Long id) {
        ProfileEntity requestedProfile = profileRepository.findById(id)
                .orElseThrow(
                        () -> new EntityNotFoundException("Profile Not found")
                );

        return articleRepository.findAllByProfile(requestedProfile)
                .stream()
                .map(articleMapper::toDomain)
                .toList();
    }

    public List<ArticleResponse> getAllArticles() {
        return articleRepository.findAll().stream().map(
                articleMapper::toDomain
        ).toList();
    }
}
