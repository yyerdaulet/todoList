package com.example.demo.jira.controllers;

import com.example.demo.jira.TaskManagerApplication;
import com.example.demo.jira.user.Dto.UserResponse;
import com.example.demo.utils.TestConfig;
import com.example.demo.utils.UserHelper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;

@SpringBootTest(classes = TaskManagerApplication.class)
@Import(TestConfig.class)
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private UserHelper helper;


    @Test
    void userLifeCycle() throws Exception {

        UserResponse createdUser = helper.createUser();  // post request

        Long userId = createdUser.id();

        helper.getUser(userId);  // get request

        helper.updateUser(userId); // put request

        helper.deleteUser(userId);  // delete request

    }

}
