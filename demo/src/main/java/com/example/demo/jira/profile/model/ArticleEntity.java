package com.example.demo.jira.profile.model;

import com.example.demo.jira.profile.dto.Authorship;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Articles")
public class ArticleEntity {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name="description")
    private String description;

    @Column(name="authors")
    private String authors;

    @Column(name="title")
    private String title;

    @Column(name="citationCount")
    private Integer citationCount;

    @Column(name="referenced_works_count")
    private Integer referenced_works_count;

    @Column(name="doi")
    private String doi;

    @Column(name="publication_year")
    private Integer publication_year;

    @ManyToOne()
    @JoinColumn(name="profile_id")
    private ProfileEntity profile;

}
