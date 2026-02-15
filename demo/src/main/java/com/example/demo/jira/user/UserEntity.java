package com.example.demo.jira.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="Users")
public class UserEntity  {
    @Id
    @Column(name="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name",nullable = false,length = 20)
    private String name;

    @Column(name="email",nullable = false,length = 30,unique = true)
    private String email;

    @Column(name="password",nullable = false,length = 90)
    private String password;

    @Column(name="role",nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role;
}
