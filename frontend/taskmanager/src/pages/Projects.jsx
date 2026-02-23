import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function Projects() {
    const { profile_id } = useParams();
    const navigate = useNavigate();

    const [projects,setProjects] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get(`profiles/${profile_id}/projects`);
                setProjects(response.data);
            } catch(err){
                console.error(err);
            } finally{
                setLoading(false);
            }
        };

        fetchProjects();
    }, [profile_id]);

    function createProject() {
        navigate(`/profiles/${profile_id}/projects/create`);
    }

    if(loading) return <p>Loading...</p>
    if(!projects) return <p>Not found</p>

    return(
        <div>
            <h1>Projects : </h1>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>{project.name}</li>
                            ))}
                        </ul>
            <button onClick={createProject}>Create Project</button>
        </div>
    );
}
