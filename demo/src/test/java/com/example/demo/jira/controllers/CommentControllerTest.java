package com.example.demo.jira.controllers;
import com.example.demo.jira.TaskManagerApplication;
import com.example.demo.jira.comment.dto.CommentResponse;
import com.example.demo.jira.project.dto.ProjectResponse;
import com.example.demo.jira.task.Dto.TaskResponse;
import com.example.demo.jira.profile.Dto.ProfileResponse;
import com.example.demo.utils.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;


@SpringBootTest(classes = TaskManagerApplication.class)
@AutoConfigureMockMvc
@Import(TestConfig.class)
class CommentControllerTest {

    @Autowired
    private UserHelper userHelper;

    @Autowired
    private ProjectHelper projectHelper;

    @Autowired
    private TaskHelper taskHelper;

    @Autowired
    private CommentHelper commentHelper;

    @Test
    void commentLifeCycle() throws Exception {
        ProfileResponse createdUser = userHelper.createUser();  // post request(User)

        Long userId = createdUser.id();

        ProjectResponse createdProject = projectHelper.createProject(userId); // post request(Project)

        Long projectId = createdProject.id();

        TaskResponse createdTask = taskHelper.createTask(userId,projectId);  // post request(Task)

        Long taskId = createdTask.id();

        CommentResponse createdComment = commentHelper.createComment(userId,projectId,taskId);  // post request(Comment)

        Long commentId = createdComment.id();

        commentHelper.getComment(userId,projectId,taskId,commentId);  // get request(Comment)

        commentHelper.updateComment(userId,projectId,taskId,commentId); // post request(Comment)

        commentHelper.deleteTask(userId,projectId,taskId,commentId); // delete request(Comment)

    }


}
