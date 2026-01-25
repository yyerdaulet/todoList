package com.example.demo.jira.project;

import jakarta.persistence.*;

import java.util.List;

@Table(name="Projects")
public class ProjectEntity {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="owner")
    private String owner;

    @Column(name="tasks")
    private List<String> tasks;

    public ProjectEntity(Long id, String name, String owner, List<String> tasks) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.tasks = tasks;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public List<String> getTasks() {
        return tasks;
    }

    public void setTasks(List<String> tasks) {
        this.tasks = tasks;
    }
}
