package com.example.demo.jira.items.profile.dto;

import com.example.demo.jira.items.profile.Enum.Degree;
import com.example.demo.jira.items.profile.utils.OrcidHolder;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record ProfileResponse(
        @Id
        @NotNull
        Long id,

        String orcid,

        @NotNull
        String name,

        String lastName,

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        LocalDate birthday,

        Degree degree,
        String profileImage

) implements OrcidHolder {
        @Override
        public String getOrcid(){
                return orcid;
        }
}
