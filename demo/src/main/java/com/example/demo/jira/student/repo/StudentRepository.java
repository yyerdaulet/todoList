package com.example.demo.jira.student.repo;

import com.example.demo.jira.student.model.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface StudentRepository extends JpaRepository<StudentEntity,Long> {
}
