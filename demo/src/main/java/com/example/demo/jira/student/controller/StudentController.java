package com.example.demo.jira.student.controller;

import com.example.demo.jira.log.LogExecutionTime;
import com.example.demo.jira.student.dto.*;
import com.example.demo.jira.student.service.StudentService;
import com.example.demo.jira.student.service.pdfService.UserPdfService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


@RestController
@RequestMapping("/students")
@AllArgsConstructor
public class StudentController {
    private final StudentService studentService;
    private final UserPdfService userPdfService;

    @GetMapping()
    @LogExecutionTime()
    public ResponseEntity<List<StudentResponse>> getAllStudents(){
        return ResponseEntity.status(HttpStatus.OK).body(studentService.getAllStudents());
    }

    @GetMapping("/{id}")
    @LogExecutionTime()
    public ResponseEntity<StudentResponse> getStudentById(
            @PathVariable("id") Long id
    ){
        return ResponseEntity.status(HttpStatus.OK).body(studentService.getStudentById(id));
    }

    @PostMapping()
    @LogExecutionTime()
    public ResponseEntity<StudentCreateResponse> createStudent(
            @RequestBody @Valid StudentCrReq studentToCreate
            ){
        return ResponseEntity.status(HttpStatus.CREATED).body(studentService.createStudent(studentToCreate));
    }

    @PutMapping("/{id}")
    @LogExecutionTime()
    public ResponseEntity<StudentResponse> updateStudent(
            @PathVariable Long id,
            @RequestBody @Valid StudentRequest studentToUpdate
    ){
        return ResponseEntity.status(HttpStatus.OK).body(studentService.updateStudent(id,studentToUpdate));
    }

    @DeleteMapping("/{id}")
    @LogExecutionTime()
    public ResponseEntity<Void> deleteStudent(
            @PathVariable("id") Long id
    ){
        studentService.deleteStudent(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/{id}/upload")
    public ResponseEntity<StudentFileResponse> uploadPhoto(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
            ) throws IOException {
        return ResponseEntity.status(HttpStatus.OK).body(studentService.uploadStudentPhoto(id,file));
    }

    @PostMapping("/{id}/uploadFile")
    public ResponseEntity<StudentFileResponse> uploadFile(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file
    ) throws IOException {
        return ResponseEntity.status(HttpStatus.OK).body(studentService.uploadStudentMedicalPage(id,file));
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<byte[]> downloadUserPage(
            @PathVariable Long id
    ){
        byte[] pdf = userPdfService.generateStudentPdf(id);

        return ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                    "attachment; filename=student-info.pdf"
                ).contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @GetMapping("/{id}/photo/{filename}")
    public ResponseEntity<Resource> getPhoto(
            @PathVariable("filename") String filename
    ) throws IOException {
        Path path = Paths.get(System.getProperty("user.home") + "/Downloads/uploads/").resolve(filename);
        Resource resource = new UrlResource(path.toUri());
        String contentType = Files.probeContentType(path);
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.parseMediaType(contentType))
                .body(resource);
    }
}
