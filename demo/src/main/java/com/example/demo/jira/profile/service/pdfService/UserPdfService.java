package com.example.demo.jira.profile.service.pdfService;

import org.springframework.stereotype.Component;

@Component
public interface UserPdfService {

    byte[] generateStudentPdf(Long id);
}
