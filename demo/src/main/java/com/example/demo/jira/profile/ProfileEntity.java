package com.example.demo.jira.profile;

import com.example.demo.jira.project.ProjectEntity;
import com.example.demo.jira.user.UserEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Profiles")
public class ProfileEntity {
    @Id
    @Column(name="id")
    private Long id;

    @Column(name="name",nullable = false,length = 20)
    private String name;

    @Column(name="lastname",length=20)
    private String lastName;

    @JsonFormat(shape= JsonFormat.Shape.STRING,pattern = "dd-MM-yyyy")
    @Column(name="birthday")
    private LocalDate birthday;

    @Column(name="degree")
    private String degree;

    @Column(name="university")
    private String university;

    @OneToMany(mappedBy = "owner",cascade = CascadeType.REMOVE)
    // @JoinColumn(name="projects_id")
    @JsonManagedReference
    private List<ProjectEntity> projects = new ArrayList<>();

    @OneToOne
    @MapsId
    @JoinColumn(name="id")
    private UserEntity user;

}
