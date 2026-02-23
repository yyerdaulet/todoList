import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

export default function CreateProject() {

  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { profile_id } = useParams();

  const createProject = async () => {
    try {
      const response = await api.post(
        `/profiles/${profile_id}/projects/create`,
        { name }
      );


      const newProjectId = response.data.id;
      localStorage.setItem("project_id",newProjectId);
      navigate(`/profiles/${profile_id}/projects/${newProjectId}`);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Project</h2>

      <input
        type="text"
        placeholder="Project Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={createProject}>
        Create
      </button>
    </div>
  );
}
