package com.example.demo.jira.integrations.pdfService;

import org.springframework.stereotype.Component;

@Component
public interface UserPdfService {

    byte[] generateStudentPdf(Long id);
}
