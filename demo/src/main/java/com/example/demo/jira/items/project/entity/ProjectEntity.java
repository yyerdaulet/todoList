package com.example.demo.jira.items.project.entity;

import com.example.demo.jira.items.profile.model.ProfileEntity;
import com.example.demo.jira.items.project.enums.Status;
import com.example.demo.jira.items.task.entity.TaskEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name="projects")
@AllArgsConstructor
@NoArgsConstructor
public class ProjectEntity {
    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String title;

    @Column(name="purpose")
    private String purpose;

    @Column(name="status")
    private Status status;

    @Column(name="result")
    private String result;

    @ManyToMany()
    @JoinTable(name="project_authors",
            joinColumns = @JoinColumn(name="project_id"),
            inverseJoinColumns = @JoinColumn(name="profile_id")
    )
    private Set<ProfileEntity> authors;

    @ManyToOne()
    private ProfileEntity lead;

    @Column(name="pictures")
    private List<String> pictures;

    @OneToMany(mappedBy = "project")
    private List<TaskEntity> tasks;
}
