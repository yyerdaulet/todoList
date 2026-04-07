package com.example.demo.jira.items.lab.services;

import com.example.demo.jira.items.lab.dto.LabCreateRequest;
import com.example.demo.jira.items.lab.dto.LabResponse;
import com.example.demo.jira.items.lab.entity.LabEntity;
import com.example.demo.jira.items.lab.mapper.LabMapper;
import com.example.demo.jira.items.lab.repository.LabRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;


import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class LabServiceTest {
    @Mock
    private LabRepository repository;

    @InjectMocks
    private LabService service;

    @Mock
    private LabMapper mapper;

    private LabEntity labEntity;
    private LabResponse labResponse;
    private LabCreateRequest createRequest;

    @BeforeEach
    void setUp(){
        labEntity = new LabEntity(1L, "AI Lab", "Some info", null, null, null);
        labResponse = new LabResponse("AI Lab","Some info",null,null,null);
        createRequest = new LabCreateRequest("AI Lab","Some Info");
    }


    @Test
    void getAllLabs_shouldReturnAllLabs() {
        doReturn(List.of(labEntity)).when(repository).findAll();
        doReturn(labResponse).when(mapper).toDomain(labEntity);

        List<LabResponse> result = service.getAllLabs();

        assertEquals(1,result.size());
        assertEquals("AI Lab",result.get(0).name());
        verify(repository,times(1)).findAll();
    }

    @Test
    void getLab() {
        Long lab_id = 1L;

        doReturn(Optional.of(labEntity)).when(repository).findById(lab_id);
        doReturn(labResponse).when(mapper).toDomain(labEntity);

        LabResponse result = service.getLab(lab_id);

        assertEquals("AI Lab",result.name());
        assertEquals("Some info",result.info());
    }

    @Test
    void createLab() {

    }

    @Test
    void updateLab() {

    }

    @Test
    void deleteLab() {
    }
}