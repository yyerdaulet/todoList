package com.example.demo;

import com.example.demo.jira.TaskManagerApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;

@SpringBootTest(classes = TaskManagerApplication.class)
@AutoConfigureMockMvc
class ToDoListApplicationTests {

}
