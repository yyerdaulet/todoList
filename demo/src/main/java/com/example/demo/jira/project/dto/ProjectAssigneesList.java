package com.example.demo.jira.project.dto;

import com.example.demo.jira.profile.ProfileEntity;

import java.util.List;

public record ProjectAssigneesList(
        List<ProfileEntity> assignees
) {
}
