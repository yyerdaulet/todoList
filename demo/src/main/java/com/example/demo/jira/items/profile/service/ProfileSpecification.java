package com.example.demo.jira.items.profile.service;

import com.example.demo.jira.items.profile.model.ProfileEntity;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
@AllArgsConstructor
public class ProfileSpecification {

    public static Specification<ProfileEntity> search(String query){
        return (root, cq, cb) -> {
            if (query == null || query.isBlank()) return null;
            String like = "%" + query.toLowerCase() + "%";
            return cb.or(
              cb.like(cb.lower(root.get("name")),like),
              cb.like(cb.lower(root.get("lastName")),like),
              cb.like(cb.lower(root.get("orcid")),like)
            );
        };
    }
}
