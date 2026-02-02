package com.example.demo.jira.user;

import com.example.demo.jira.project.ProjectEntity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity()
@Table(name="Users")
public class UserEntity {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @OneToMany(mappedBy = "owner",cascade = CascadeType.REMOVE)
    // @JoinColumn(name="projects_id")
    @JsonManagedReference
    private List<ProjectEntity> projects = new ArrayList<>();

}
