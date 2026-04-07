package com.example.demo.jira.items.profile.model;

import com.example.demo.jira.items.article.entity.ArticleEntity;
import com.example.demo.jira.items.lab.entity.LabEntity;
import com.example.demo.jira.items.profile.Enum.Degree;
import com.example.demo.jira.items.profile.utils.OrcidHolder;
import com.example.demo.jira.items.project.entity.ProjectEntity;
import com.example.demo.jira.authentication.entity.UserEntity;
import com.example.demo.jira.items.task.entity.TaskEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Profiles")
public class ProfileEntity implements OrcidHolder {
    @Id
    @Column(name="id")
    private Long id;

    @Column(name="orcid")
    private String orcid;

    @Column(name="name",nullable = false,length = 20)
    private String name;

    @Column(name="lastName",length=20)
    private String lastName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name="birthday")
    private LocalDate birthday;

    @Column(name="degree")
    @Enumerated(EnumType.STRING)
    private Degree degree;

    @OneToOne
    @MapsId
    @JoinColumn(name="id")
    private UserEntity user;

    @ManyToMany(mappedBy = "authors")
    private Set<ProjectEntity> projects = new HashSet<>();

    @ManyToMany(mappedBy = "assignees")
    private Set<TaskEntity> task = new HashSet<>();

    @ManyToOne()
    @JoinColumn(name = "lab")
    private LabEntity lab;

    @ManyToMany(mappedBy = "authors")
    private Set<ArticleEntity> articles;

    @Column(name="profile_image")
    private String profileImage;


}
