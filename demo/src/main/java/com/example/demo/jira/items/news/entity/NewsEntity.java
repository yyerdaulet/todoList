package com.example.demo.jira.items.news.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name="news")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NewsEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="publication_title")
    private String publication_title;

    @Column(name="publication_date")
    private LocalDate publication_date;

    @Column(name="publication_text")
    private String publication_text;
}
