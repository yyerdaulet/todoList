# Todo List Backend

Simple REST API for managing todo tasks built with Java and Spring Boot.

## 🚀 Features
- Create todo
- Get all todos
- Update todo
- Delete todo
- Mark todo as completed

## 🛠 Tech Stack
- Java
- Spring Boot
- Spring MVC
- Hibernate (JPA)
- PostgreSQL
- Maven

## 📌 API Endpoints

| Method | Endpoint                | Description                 |
|--------|------------------------|-----------------------------|
| GET    | /tasks                 | Get all tasks               |
| POST   | /tasks                 | Create new task             |
| GET    | /tasks/{id}            | Get task by ID              |
| PUT    | /tasks/{id}            | Update task                 |
| DELETE | /tasks/{id}            | Delete task                 |
| PATCH  | /tasks/{id}/complete   | Mark task as completed      |
| GET    | /tasks/completed       | Get all completed tasks     |
| GET    | /tasks/active          | Get all active tasks        |




