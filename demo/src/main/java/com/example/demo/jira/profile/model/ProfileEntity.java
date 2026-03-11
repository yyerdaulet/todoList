package com.example.demo.jira.profile.model;

import com.example.demo.jira.profile.Enum.Degree;
import com.example.demo.jira.user.UserEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;


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



}
