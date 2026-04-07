package com.example.demo.jira.items.article.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record Author(
        String display_name,
        String orcid
){
    public boolean hasOrcid(){
        return orcid() != null;
    }
}

