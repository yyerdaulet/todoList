package com.example.demo.jira.items.lab.mapper;

import com.example.demo.jira.items.article.mapper.ArticleMapper;
import com.example.demo.jira.items.lab.dto.LabResponse;
import com.example.demo.jira.items.lab.entity.LabEntity;
import com.example.demo.jira.items.profile.mapper.ProfileMapper;
import com.example.demo.jira.items.project.mapper.ProjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;


@Component
@AllArgsConstructor
public class LabMapper {
    private final ProjectMapper projectMapper;
    private final ProfileMapper profileMapper;
    private final ArticleMapper articleMapper;

    public LabResponse toDomain(LabEntity labEntity) {
         return new LabResponse(
                 labEntity.getId(),
           labEntity.getName(),
                 labEntity.getInfo(),
                 null,
                 null,
                 null
         );
    }
}
