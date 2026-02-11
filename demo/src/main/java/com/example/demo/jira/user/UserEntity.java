package com.example.demo.jira.user;

import com.example.demo.jira.project.ProjectEntity;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
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

    @Column(name="name",nullable = false,length = 20)
    private String name;

    @Column(name="email",nullable = false,length = 30,unique = true)
    private String email;

    @Column(name="password",nullable = false,length = 70)
    private String password;

    @Column(name="role",nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @OneToMany(mappedBy = "owner",cascade = CascadeType.REMOVE)
    // @JoinColumn(name="projects_id")
    @JsonManagedReference
    private List<ProjectEntity> projects = new ArrayList<>();

}
