package com.example.demo.jira.controllers;


import com.example.demo.jira.TaskManagerApplication;
import com.example.demo.jira.project.dto.ProjectResponse;
import com.example.demo.jira.user.Dto.UserResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.checkerframework.checker.formatter.qual.UnknownFormat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ProjectControllerTest {
    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper mapper = new ObjectMapper();

    @Test
    void projectLifeCycle() throws Exception {

        String userJson = """
			{
				"name":"Yerdaulet"
			}
			""";

        MvcResult creation = mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(userJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Yerdaulet"))
                .andReturn();

        String respondUser = creation.getResponse().getContentAsString();

        UserResponse createdUser = mapper.readValue(respondUser, UserResponse.class);
        Long userId = createdUser.id();

        String userName = createdUser.name();

        String projectJson = """
			{
				"name":"todo List"
			}
			""";

        MvcResult projectCreate = mockMvc.perform(post("/users/"+userId+"/projects")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(projectJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("todo List"))
                .andReturn();

        String respondProject = projectCreate.getResponse().getContentAsString();


        ProjectResponse createdProject = mapper.readValue(respondProject, ProjectResponse.class);
        Long projectId = createdProject.id();
        String projectName = createdProject.name();

        String projectUpdateJson = """
			{
				"name":"Task Manager"
			}
			""";

        mockMvc.perform(get("/users/" +userId+"/projects/"+projectId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.owner").value(userName))
                .andExpect(jsonPath("$.name").value(projectName));



        mockMvc.perform(put("/users/" +userId+"/projects/"+projectId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(projectUpdateJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Task Manager"));

        mockMvc.perform(delete("/users/" +userId+"/projects/"+projectId))
                .andExpect(status().isNoContent());

        mockMvc.perform(delete("/users/" +userId))
                .andExpect(status().isNoContent());
    }

}
