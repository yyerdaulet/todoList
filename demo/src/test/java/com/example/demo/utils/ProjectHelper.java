package com.example.demo.utils;

import com.example.demo.jira.project.dto.ProjectResponse;
import com.example.demo.jira.profile.Dto.ProfileResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Component
public class ProjectHelper {
    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper mapper = new ObjectMapper();

    public ProjectResponse createProject(Long userId) throws Exception {

        String projectJson = """
                {
                	"name":"todo List"
                }
                """;

        MvcResult projectCreate = mockMvc.perform(post("/users/" + userId + "/projects")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(projectJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("todo List"))
                .andReturn();

        String respondProject = projectCreate.getResponse().getContentAsString();

        return mapper.readValue(respondProject, ProjectResponse.class);
    }

    public void getProject(ProfileResponse createdUser, ProjectResponse createdProject) throws Exception {
        Long userId = createdUser.id();
        String userName = createdUser.name();

        Long projectId = createdProject.id();
        String projectName = createdProject.name();

        mockMvc.perform(get("/users/" +userId+"/projects/"+projectId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.owner").value(userName))
                .andExpect(jsonPath("$.name").value(projectName));
    }

    public void updateProject(Long userId,Long projectId) throws Exception{
        String projectUpdateJson = """
			{
				"name":"Task Manager"
			}
			""";

        mockMvc.perform(put("/users/" +userId+"/projects/"+projectId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(projectUpdateJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Task Manager"));
    }

    public void deleteProject(Long userId,Long projectId) throws Exception {
        mockMvc.perform(delete("/users/" +userId+"/projects/"+projectId))
                .andExpect(status().isNoContent());
    }

}
