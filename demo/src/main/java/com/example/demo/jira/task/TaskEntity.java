package com.example.demo.jira.task;


import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Table(name="Tasks")
@Entity
public class TaskEntity {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name="title")
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name="status")
    private Status status;

    @Column(name="assignee")
    private String assignee;

    @Column(name="comments")
    private List<String> comments;

    public TaskEntity(Long id, String title, Status status, String assignee, List<String> comments) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.assignee = assignee;
        this.comments = comments;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getAssignee() {
        return assignee;
    }

    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }

    public List<String> getComments() {
        return comments;
    }

    public void setComments(List<String> comments) {
        this.comments = comments;
    }
}
