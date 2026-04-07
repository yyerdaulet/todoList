package com.example.demo.jira.items.lab.services;

import com.example.demo.jira.items.lab.dto.LabCreateRequest;
import com.example.demo.jira.items.lab.entity.LabEntity;
import com.example.demo.jira.items.lab.mapper.LabMapper;
import com.example.demo.jira.items.lab.repository.LabRepository;
import com.example.demo.jira.items.lab.dto.LabResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class LabService {
    private final LabRepository repository;
    private final LabMapper mapper;
    private final static Logger logger = LoggerFactory.getLogger(LabService.class);

    public List<LabResponse> getAllLabs() {
        return  repository.findAll()
                .stream()
                .map(mapper::toDomain)
                .toList();
    }

    public LabResponse getLab(Long id) {
        LabEntity lab = repository.findById(id)
                .orElseThrow(
                        () -> new EntityNotFoundException("Lab not found")
                );
        return mapper.toDomain(lab);
    }



    public LabResponse updateLab(Long lab_id,LabCreateRequest request) {
        LabEntity lab = repository.findById(lab_id)
                .orElseThrow(
                        () -> new EntityNotFoundException("Lab not found")
                );
        lab.setInfo(request.info());
        lab.setName(request.name());

        repository.save(lab);

        return mapper.toDomain(lab);
    }

    public void deleteLab(Long labId) {
        LabEntity lab = repository.findById(labId)
                .orElseThrow(
                        () -> new EntityNotFoundException("Lab not found")
                );
        repository.delete(lab);
    }

    public LabResponse createLab(LabCreateRequest request) {
        LabEntity newLab = new LabEntity(
                null,
                request.info(),
                request.name(),
                null
        );
        repository.save(newLab);

        return mapper.toDomain(newLab);
    }
}
