package com.example.demo.utils;


import com.example.demo.jira.task.Dto.TaskResponse;
import com.example.demo.jira.task.Status;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Component
public class TaskHelper {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper mapper = new ObjectMapper();

    public TaskResponse createTask(Long userId, Long projectId) throws Exception {
        String path = "/users/" + userId + "/projects/" + projectId + "/tasks";

        String taskRequest = """
                {
                "title" : "Fill table"
                }
                """;


        MvcResult respond = mockMvc.perform(post(path)
                .contentType(MediaType.APPLICATION_JSON)
                .content(taskRequest))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Fill table"))
                .andExpect(jsonPath("$.status").value("NEW"))
                .andReturn();

        String createdTask = respond.getResponse().getContentAsString();
        return mapper.readValue(createdTask, TaskResponse.class);
    }

    public void getTask(Long userId, Long projectId, Long taskId)  throws Exception {
        String path = "/users/" + userId + "/projects/" + projectId + "/tasks/" + taskId;
        mockMvc.perform(get(path))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Fill table"))
                .andExpect(jsonPath("$.status").value("NEW"));
    }

    public void updateTask(Long userId, Long projectId, Long taskId) throws  Exception{
        String path = "/users/" + userId + "/projects/" + projectId + "/tasks/" + taskId;

        String taskUpdateRequest = """
                {
                "title" : "Fill table clearly"
                }
                """;

      mockMvc.perform(MockMvcRequestBuilders.put(path)
                .contentType(MediaType.APPLICATION_JSON)
                .content(taskUpdateRequest))
                .andExpect(jsonPath("$.title").value("Fill table clearly"))
                .andExpect(jsonPath("$.status").value("CHANGED"));

    }

    public void deleteTask(Long userId, Long projectId, Long taskId) throws Exception{
        String path = "/users/" + userId + "/projects/" + projectId + "/tasks/" + taskId;
        mockMvc.perform(delete(path))
                .andExpect(status().isNoContent());
    }
}
