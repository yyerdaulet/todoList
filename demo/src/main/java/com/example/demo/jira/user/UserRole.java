package com.example.demo.jira.user;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

public enum UserRole {
    STUDENT,
    ADMIN;

    public SimpleGrantedAuthority toAuthority(){
        return new SimpleGrantedAuthority("ROLE_"+this.name());
    }
}
