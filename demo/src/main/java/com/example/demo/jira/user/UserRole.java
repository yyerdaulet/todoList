package com.example.demo.jira.user;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

public enum UserRole {
    MANAGER,
    ASSIGNEE;

    public SimpleGrantedAuthority toAuthority(){
        return new SimpleGrantedAuthority("ROLE_"+this.name());
    }
}
