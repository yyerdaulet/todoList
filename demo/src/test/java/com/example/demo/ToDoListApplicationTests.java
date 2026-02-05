package com.example.demo;

import com.example.demo.jira.TaskManagerApplication;
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
	@Autowired
	private MockMvc mockMvc;

	private final ObjectMapper mapper = new ObjectMapper();


	@Test
	void userLifeCycle() throws Exception {

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

		UserResponse createdUser = mapper.readValue(respond, UserResponse.class);
		Long userId = createdUser.id();

		mockMvc.perform(get("/users/" + userId))
				.andExpect(status().isOk());

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

		mockMvc.perform(delete("/users/"+userId))
				.andExpect(status().isNoContent());
	}

}
