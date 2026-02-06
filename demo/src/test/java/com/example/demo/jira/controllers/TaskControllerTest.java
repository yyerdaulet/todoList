package com.example.demo.jira.controllers;


import com.example.demo.jira.TaskManagerApplication;
import com.example.demo.jira.project.dto.ProjectResponse;
import com.example.demo.jira.task.Dto.TaskResponse;
import com.example.demo.jira.user.Dto.UserResponse;
import com.example.demo.utils.ProjectHelper;
import com.example.demo.utils.TaskHelper;
import com.example.demo.utils.TestConfig;
import com.example.demo.utils.UserHelper;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest(classes = TaskManagerApplication.class)
@AutoConfigureMockMvc
@Import(TestConfig.class)
class TaskControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserHelper userHelper;

    @Autowired
    private ProjectHelper projectHelper;

    @Autowired
    private TaskHelper taskHelper;

    private final ObjectMapper mapper = new ObjectMapper();

    @Test
    void taskLifeCycle() throws Exception {
        UserResponse createdUser = userHelper.createUser();  // post request(User)

        Long userId = createdUser.id();

        ProjectResponse createdProject = projectHelper.createProject(userId); // post request(Project)

        Long projectId = createdProject.id();

        TaskResponse createdTask = taskHelper.createTask(userId,projectId);  // post request(Task)

        Long taskId = createdTask.id();

        taskHelper.getTask(userId,projectId,taskId); // get request(Task)

        taskHelper.updateTask(userId,projectId,taskId); // put request(Task)

        taskHelper.deleteTask(userId,projectId,taskId); // delete request(Task)


    }


}
