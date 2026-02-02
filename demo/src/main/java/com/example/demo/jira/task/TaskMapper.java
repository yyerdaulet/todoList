package com.example.demo.jira.task;

import com.example.demo.jira.task.Dto.TaskRequest;
import com.example.demo.jira.task.Dto.TaskResponse;
import org.springframework.stereotype.Component;

@Component
public class TaskMapper {
    public TaskResponse toDomain(TaskEntity task){
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getStatus(),
                task.getManager().getName(),
                task.getComments()
        );
    }


}
