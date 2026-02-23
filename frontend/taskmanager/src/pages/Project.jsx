import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Project(){
    const { project_id } = useParams();
    const [project, setProject] = useState(null);
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();
    const { profile_id } = useParams();
    useEffect( () => {

        const fetchProject = async () =>{
            try {
                const response = await api.get(`/profiles/${profile_id}/projects/${project_id}`);
                setProject(response.data);
                }
            catch(err){
                console.error(err);
                }finally{
                    setLoading(false);
                    }
            }
        fetchProject();
        }, [profile_id,project_id]);

        function createTask(){
            navigate(`/profiles/${profile_id}/projects/${project_id}/tasks/create`)
            }

        if (loading) return <p>Loading...</p>;
        if (!project) return <p>Not found</p>;

        return (
            <div>
                <h1>Name: {project.name}</h1>
                <h1>Owner: {project.owner}</h1>
                <button onClick={createTask}>Create task</button>
            </div>

            )
    }
