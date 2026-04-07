package com.example.demo.jira.integrations.fileStorage;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class FileStorageService {
    private final String upLoadDir = System.getProperty("user.home") + "/Downloads/uploads/";

    public String saveFile(MultipartFile file ) throws IOException {
        Path uploadPath = Paths.get(upLoadDir);
        if(!Files.exists(uploadPath)){
            Files.createDirectories(uploadPath);
        }

        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(filename);
        Files.copy(file.getInputStream(),filePath, StandardCopyOption.REPLACE_EXISTING);

        return filename;
    }

    public void deleteFile(String fileName){
        try{
            Files.deleteIfExists(Paths.get(upLoadDir).resolve(fileName));
        } catch (IOException e){
            System.err.println("Delete failed : " + e.getMessage());
        }
    }
}
