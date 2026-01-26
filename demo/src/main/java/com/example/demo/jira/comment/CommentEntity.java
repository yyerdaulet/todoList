package com.example.demo.jira.comment;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Table(name="Comments")
public class CommentEntity {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long id;

    @Column(name="text")
    @NotNull
    String text;

    @NotNull
    @Column(name="author")
    String author;

    public CommentEntity(Long id, String text, String author) {
        this.id = id;
        this.text = text;
        this.author = author;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
