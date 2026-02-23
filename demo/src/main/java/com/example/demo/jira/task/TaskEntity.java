package com.example.demo.jira.task;


import com.example.demo.jira.comment.CommentEntity;
import com.example.demo.jira.project.ProjectEntity;
import com.example.demo.jira.profile.ProfileEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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

    @ManyToOne
    @JoinColumn(name="profile_id")
    @JsonIgnore
    private ProfileEntity assignee;

    @ManyToOne()
    @JoinColumn(name="project_id")
    @JsonIgnore
    private ProjectEntity project;

    @OneToMany(mappedBy = "task",cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<CommentEntity> comments;


}
