package com.example.demo;

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

@SpringBootTest(classes = TaskManagerApplication.class)
@AutoConfigureMockMvc
class ToDoListApplicationTests {

}
