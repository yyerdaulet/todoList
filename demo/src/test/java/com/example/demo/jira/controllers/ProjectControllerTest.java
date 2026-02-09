package com.example.demo.jira.controllers;



import com.example.demo.jira.project.dto.ProjectResponse;
import com.example.demo.jira.user.Dto.UserResponse;
import com.example.demo.utils.ProjectHelper;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Import(TestConfig.class)
class ProjectControllerTest {
    @Autowired
    private UserHelper userHelper;

    @Autowired
    private ProjectHelper projectHelper;


    @Test
    void projectLifeCycle() throws Exception {

        UserResponse createdUser = userHelper.createUser();  // post request(User)

        Long userId = createdUser.id();

        ProjectResponse createdProject = projectHelper.createProject(userId); // post request(Project)

        Long projectId = createdProject.id();

        projectHelper.getProject(createdUser,createdProject);   // get request(Project)

        projectHelper.updateProject(userId,projectId);   // put request(Project)

        projectHelper.deleteProject(userId,projectId);  // delete request(Project)

        userHelper.deleteUser(userId);   // delete request(User)
    }

}
