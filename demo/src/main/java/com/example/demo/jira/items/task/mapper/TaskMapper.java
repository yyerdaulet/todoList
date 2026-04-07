package com.example.demo.jira.items.task.mapper;

import com.example.demo.jira.items.profile.mapper.ProfileMapper;
import com.example.demo.jira.items.task.dto.TaskCreateRequest;
import com.example.demo.jira.items.task.dto.TaskResponse;
import com.example.demo.jira.items.task.entity.TaskEntity;
import com.example.demo.jira.items.task.enums.State;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
@AllArgsConstructor
public class TaskMapper {
    private final ProfileMapper profileMapper;

    public TaskResponse toDomain(TaskEntity task){

        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getStart(),
                task.getFinish(),
                task.getState(),
                task.getReportPath(),
                task.getAssignees()
                        .stream().map(
                                profileMapper::toDomain
                        ).collect(Collectors.toSet())
        );
    }

    public TaskEntity toEntity(TaskCreateRequest createRequest){
        return new TaskEntity(
                null,
                createRequest.title(),
                createRequest.description(),
                createRequest.start(),
                createRequest.finish(),
                State.NEW,
                null,
                null,
                null
        );
    }


}
