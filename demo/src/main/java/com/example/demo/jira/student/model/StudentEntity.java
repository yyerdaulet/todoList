package com.example.demo.jira.student.model;

import com.example.demo.jira.student.Enum.Degree;
import com.example.demo.jira.user.UserEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;



@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="Profiles")
public class StudentEntity {
    @Id
    @Column(name="id")
    private Long id;

    @Column(name="jsn",unique = true,length = 12)
    private Long jsn;

    @Column(name="name",nullable = false,length = 20)
    private String name;

    @Column(name="lastName",length=20)
    private String lastName;

    @Column(name="midName",length=20)
    private String midName;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @Column(name="birthday")
    private LocalDate birthday;

    @Column(name="city",length = 15)
    private String city;

    @Column(name="degree")
    @Enumerated(EnumType.STRING)
    private Degree degree;

    @Column(name="mark",length = 3)
    private Long mark;

    @Column(name="photo_url")
    private String photoURL;

    @Column(name="medicalPageURL")
    private String medicalPageURL;

    @OneToOne
    @MapsId
    @JoinColumn(name="id")
    private UserEntity user;

}
