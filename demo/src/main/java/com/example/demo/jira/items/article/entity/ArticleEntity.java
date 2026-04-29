package com.example.demo.jira.items.article.entity;

import com.example.demo.jira.items.lab.entity.LabEntity;
import com.example.demo.jira.items.profile.model.ProfileEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Articles")
public class ArticleEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name="description",length = 10000)
    private String description;

    @Column(name="title")
    private String title;

    @Column(name="citationCount")
    private Integer citationCount;

    @Column(name="referenced_works_count")
    private Integer referenced_works_count;

    @Column(name="doi",unique = true)
    private String doi;

    @Column(name="publication_year")
    private Integer publication_year;

    @ManyToMany
    @JoinTable(
            name="article_authors",
            joinColumns=@JoinColumn(name="article_id"),
            inverseJoinColumns = @JoinColumn(name="profile_id")
    )
    private Set<ProfileEntity> authors = new HashSet<>();

}
