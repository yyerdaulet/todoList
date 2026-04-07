package com.example.demo.jira.items.lab.entity;

import com.example.demo.jira.items.article.entity.ArticleEntity;
import com.example.demo.jira.items.profile.model.ProfileEntity;
import com.example.demo.jira.items.project.entity.ProjectEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="lab")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LabEntity {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="info")
    private String info;

    @OneToMany(mappedBy = "lab")
    private List<ProfileEntity> researches;

}
