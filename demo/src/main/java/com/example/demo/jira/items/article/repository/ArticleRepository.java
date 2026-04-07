package com.example.demo.jira.items.article.repository;

import com.example.demo.jira.items.article.entity.ArticleEntity;
import com.example.demo.jira.items.profile.model.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.swing.text.html.Option;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface ArticleRepository extends JpaRepository<ArticleEntity,Long> {
    ArticleEntity findByDoi(String doi);

    boolean existsByDoi(String doi);

    @Query("""
    SELECT DISTINCT a from ArticleEntity a 
    LEFT JOIN FETCH a.authors 
    WHERE EXISTS (
        SELECT 1 FROM a.authors author
        WHERE author.orcid IN :orcidList
    ) 
""")
    List<ArticleEntity> findAllByResearchersOrcids(@Param("orcidList") List<String> orcidList);



    @Query("""
    SELECT DISTINCT a from ArticleEntity a
    JOIN a.authors author
    WHERE author = :profile
""")
    List<ArticleEntity> findAllByProfile(@Param("profile")ProfileEntity profile);
}

