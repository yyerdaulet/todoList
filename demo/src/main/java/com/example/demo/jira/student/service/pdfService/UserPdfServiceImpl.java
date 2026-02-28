package com.example.demo.jira.student.service.pdfService;

import com.example.demo.jira.student.model.StudentEntity;
import com.example.demo.jira.student.repo.StudentRepository;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;

import org.thymeleaf.context.Context;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
@AllArgsConstructor
public class UserPdfServiceImpl implements UserPdfService{

    private final TemplateEngine templateEngine;
    private final StudentRepository repository;


    @Override
    public byte[] generateStudentPdf(Long id) {
        StudentEntity student = repository.findById(id)
                .orElseThrow(
                        () -> new EntityNotFoundException("Student Not found")
                );
        Context context = new Context();
        context.setVariable("id",student.getJsn());
        context.setVariable("name",student.getName());
        context.setVariable("lastname",student.getLastName());
        context.setVariable("midname",student.getMidName());
        context.setVariable("birthday",student.getBirthday());
        context.setVariable("city",student.getCity());
        context.setVariable("degree",student.getDegree());
        context.setVariable("mark",student.getMark());

        String html = templateEngine.process("student-info",context);

        try(ByteArrayOutputStream outputStream = new ByteArrayOutputStream()){
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.withHtmlContent(html,null);
            builder.toStream(outputStream);

            builder.run();
            return outputStream.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
