package com.example.demo.jira.items.news.repository;

import com.example.demo.jira.items.news.entity.NewsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends JpaRepository<NewsEntity,Long> {
}
