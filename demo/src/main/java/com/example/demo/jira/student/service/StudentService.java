package com.example.demo.jira.student.service;

import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.student.dto.*;
import com.example.demo.jira.student.model.StudentEntity;
import com.example.demo.jira.student.mapper.StudentMapper;
import com.example.demo.jira.student.repo.StudentRepository;
import com.example.demo.jira.user.UserEntity;
import com.example.demo.jira.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@AllArgsConstructor
@Service
public class StudentService {
    private final StudentRepository repository;
    private final UserRepository userRepository;
    private final StudentMapper mapper;
    private final FileStorageService fileService;

    @LogExecutionTime
    @GetMapping
    public List<StudentResponse> getAllStudents() {
        return repository.findAll().stream().map(mapper::toDomain).toList();
    }

    @LogExecutionTime()
    public StudentResponse getStudentById(Long id) {
        StudentEntity student = repository
                .findById(id)
                .orElseThrow( () -> new EntityNotFoundException("Student Entity not found"));
        return mapper.toDomain(student);
    }

    @Transactional
    @LogExecutionTime()
    public StudentCreateResponse createStudent(@Valid StudentCrReq studentToCreate) {

        UserEntity user = userRepository.findById(studentToCreate.user_id()).orElseThrow(
                () -> new EntityNotFoundException("User not found")
        );

        var newStudent = new StudentEntity(
                null,
                studentToCreate.jsn(),
                studentToCreate.name(),
                studentToCreate.lastName(),
                studentToCreate.midName(),
                studentToCreate.birthday(),
                studentToCreate.city(),
                studentToCreate.degree(),
                studentToCreate.mark(),
                null,
                null,
                user
        );

        repository.save(newStudent);


        return mapper.toStudentCreateResponse(newStudent);
    }

    @Transactional
    @LogExecutionTime()
    @PutMapping
    public StudentResponse updateStudent(Long id,
                                         @Valid StudentRequest studentToUpdate) {
            var student = repository.findById(id).orElseThrow(
                    () -> new EntityNotFoundException("Student not found")
            );

            student.setName(studentToUpdate.name());
            student.setLastName(student.getLastName());
            student.setMidName(studentToUpdate.midName());
            student.setBirthday(studentToUpdate.birthday());
            student.setDegree(studentToUpdate.degree());
            student.setCity(studentToUpdate.city());
            student.setMark(studentToUpdate.mark());

            repository.save(student);
            return mapper.toDomain(student);
    }

    @Transactional
    @LogExecutionTime()
    public void deleteStudent(Long id) {
        if(!repository.existsById(id)){
            throw new EntityNotFoundException("Student found item");
        }
        UserEntity user = userRepository.findById(id)
                        .orElseThrow(
                                () -> new EntityNotFoundException("User not found")
                        );
        user.setProfile(null);
        userRepository.save(user);
        repository.deleteById(id);

    }


    public StudentFileResponse uploadStudentPhoto(Long id, MultipartFile file) throws IOException {
        StudentEntity student = repository.findById(id).orElseThrow(
                () ->  new EntityNotFoundException("Student not found")
        );

        String fileName = fileService.saveFile(file);

        student.setPhotoURL(fileName);
        repository.save(student);

        return mapper.toStudentFileResponse(id,fileName);
    }

    public StudentFileResponse uploadStudentMedicalPage(Long id, MultipartFile file) throws IOException {
        StudentEntity student = repository.findById(id).orElseThrow(
                () -> new EntityNotFoundException("Student not found")
        );

        String fileName = fileService.saveFile(file);
        student.setMedicalPageURL(fileName);

        repository.save(student);

        return mapper.toStudentFileResponse(id,fileName);
    }


}
