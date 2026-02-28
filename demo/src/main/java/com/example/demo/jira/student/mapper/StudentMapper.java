package com.example.demo.jira.student.mapper;

import com.example.demo.jira.student.dto.StudentCreateResponse;
import com.example.demo.jira.student.dto.StudentFileResponse;
import com.example.demo.jira.student.dto.StudentResponse;
import com.example.demo.jira.student.model.StudentEntity;
import jakarta.validation.Valid;
import org.springframework.stereotype.Component;

@Component
public class StudentMapper {
    public StudentResponse toDomain(StudentEntity student){
        return new StudentResponse(
                student.getId(),
                student.getName(),
                student.getLastName(),
                student.getMidName(),
                student.getBirthday(),
                student.getCity(),
                student.getDegree(),
                student.getMark(),
                student.getPhotoURL(),
                student.getMedicalPageURL()
        );
    }

    public StudentCreateResponse toStudentCreateResponse(StudentEntity student){
        return new @Valid StudentCreateResponse(
                student.getId(),
                student.getName(),
                student.getLastName(),
                student.getMidName(),
                student.getBirthday(),
                student.getCity(),
                student.getDegree(),
                student.getMark()
        );
    }

    public StudentFileResponse toStudentFileResponse(Long id, String fileName) {
        return new StudentFileResponse(
                id,
                fileName
        );
    }
}
