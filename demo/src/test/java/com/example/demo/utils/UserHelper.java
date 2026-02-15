package com.example.demo.utils;

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
public class UserHelper {
    @Autowired
    private MockMvc mockMvc;

    private final ObjectMapper mapper = new ObjectMapper();

    public ProfileResponse createUser() throws Exception{
        String requestJson = """
			{
				"name":"Yerdaulet"
			}
			""";

        MvcResult creation = mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Yerdaulet"))
                .andReturn();

        String respond = creation.getResponse().getContentAsString();

        return mapper.readValue(respond, ProfileResponse.class);

    }

    public void getUser(Long userId) throws Exception{
        mockMvc.perform(get("/users/" + userId))
                .andExpect(status().isOk());
    }

    public void updateUser(Long userId) throws Exception{
        String updateJson = """
				{
				"name":"Bakyt"
					}			\t
			\t""";

        mockMvc.perform(put("/users/"+userId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateJson)
                ).andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Bakyt"));
    }


    public void deleteUser(Long userId) throws Exception{
        mockMvc.perform(delete("/users/"+userId))
                .andExpect(status().isNoContent());
    }
}
