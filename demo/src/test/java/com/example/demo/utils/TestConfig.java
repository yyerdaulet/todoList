package com.example.demo.utils;

import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.test.web.servlet.MockMvc;

@TestConfiguration
public class TestConfig {

    @Bean
    public UserHelper userHelper(){
        return new UserHelper();
    }

    @Bean
    public ProjectHelper projectHelper(){
        return new ProjectHelper();
    }

    @Bean
    public TaskHelper taskHelper(){
        return new TaskHelper();
    }
}
