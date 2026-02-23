package com.example.demo.jira.project;

import com.example.demo.jira.task.TaskEntity;
import com.example.demo.jira.profile.ProfileEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Entity
@Table(name="Projects")
public class ProjectEntity {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @ManyToOne
    @JoinColumn(name="profile_id")
    @JsonBackReference
    private ProfileEntity owner;

    @OneToMany(mappedBy = "project")
    @JsonManagedReference
    private List<ProfileEntity> assignees;


    @OneToMany(mappedBy = "project",cascade = CascadeType.REMOVE)
    @JsonManagedReference
    private List<TaskEntity> tasks;


}
