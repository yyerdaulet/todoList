import React from "react";
import { useState } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { profile_id, project_id } = useParams();

  const createTask = async () => {
    try {
      const response = await api.post(
        `/profiles/${profile_id}/projects/${project_id}/tasks/create`,
        { title }
      );

      const newTaskId = response.data.id;
      localStorage.setItem("task_id",newTaskId);
      navigate(`/profiles/${profile_id}/projects/${project_id}/tasks/${newTaskId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={createTask}>Create</button>
    </div>
  );
}
