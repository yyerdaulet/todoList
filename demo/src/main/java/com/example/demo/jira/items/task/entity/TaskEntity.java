package com.example.demo.jira.items.task.entity;

import com.example.demo.jira.items.profile.model.ProfileEntity;
import com.example.demo.jira.items.project.entity.ProjectEntity;
import com.example.demo.jira.items.task.enums.State;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="tasks")
@Getter
@Setter
public class TaskEntity {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", length = 200)
    private String title;

    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "start")
    private LocalDateTime start;

    @Column(name = "finish")
    private LocalDateTime finish;

    @Column(name="state")
    private State state;

    @Column(name = "report")
    private String reportPath;

    @ManyToMany
    @JoinTable(
            name = "task_assignees",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "profile_id")
    )
    private Set<ProfileEntity> assignees;

    @ManyToOne
    @JoinColumn(name = "project")
    private ProjectEntity project;
}

