package com.example.demo.jira.profile.repo;

import com.example.demo.jira.profile.model.ArticleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRepository extends JpaRepository<ArticleEntity,Long> {
    List<ArticleEntity> findAllByProfileId(Long profile_id);

    ArticleEntity findByDoi(String doi);
}

