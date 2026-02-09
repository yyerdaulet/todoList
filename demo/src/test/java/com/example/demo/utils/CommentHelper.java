package com.example.demo.utils;


import com.example.demo.jira.comment.dto.CommentResponse;
import com.example.demo.jira.task.Dto.TaskResponse;
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
public class CommentHelper {

    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper mapper = new ObjectMapper();

    public CommentResponse createComment(Long userId, Long projectId,Long taskId) throws Exception {
        String path = "/users/" + userId + "/projects/" + projectId + "/tasks/" + taskId + "/comments";

        String taskRequest = """
                {
                "text" : "Only integer numbers"
                }
                """;


        MvcResult respond = mockMvc.perform(post(path)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(taskRequest))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.text").value("Only integer numbers"))
                .andReturn();

        String createdTask = respond.getResponse().getContentAsString();
        return mapper.readValue(createdTask, CommentResponse.class);
    }

    public void getComment(Long userId, Long projectId, Long taskId,Long commentId)  throws Exception {
        String path = "/users/" + userId + "/projects/" + projectId + "/tasks/" + taskId + "/comments/"+ commentId;
        mockMvc.perform(get(path))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.text").value("Only integer numbers"));
    }

    public void updateComment(Long userId, Long projectId, Long taskId,Long commentId) throws  Exception{
        String path = "/users/" + userId + "/projects/" + projectId + "/tasks/" + taskId + "/comments/"+ commentId;

        String commentUpdateRequest = """
                {
                "text" : "All numbers allowed"
                }
                """;

        mockMvc.perform(MockMvcRequestBuilders.put(path)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(commentUpdateRequest))
                .andExpect(jsonPath("$.text").value("All numbers allowed"));

    }

    public void deleteTask(Long userId, Long projectId, Long taskId,Long commentId) throws Exception{
        String path = "/users/" + userId + "/projects/" + projectId + "/tasks/" + taskId + "/comments/"+ commentId;
        mockMvc.perform(delete(path))
                .andExpect(status().isNoContent());
    }

}
