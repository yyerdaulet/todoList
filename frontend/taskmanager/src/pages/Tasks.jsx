import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function Tasks() {
    const { profile_id,project_id } = useParams();
    const navigate = useNavigate();

    const [tasks,setTasks] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get(`profiles/${profile_id}/projects/${project_id}/tasks`);
                setTasks(response.data);
            } catch(err){
                console.error(err);
            } finally{
                setLoading(false);
            }
        };

        fetchTasks();
    }, [profile_id,project_id]);

    function createTask() {
        navigate(`/profiles/${profile_id}/projects/${project_id}/tasks/create`);
    }

    if(loading) return <p>Loading...</p>
    if(!tasks) return <p>Not found</p>

    return(
        <div>
            <h1>Tasks : </h1>
            <ul>
                {tasks.map((tasks) => (
                    <li key={tasks.id}>{tasks.name}</li>
                            ))}
                        </ul>
            <button onClick={createTask}>Create Task</button>
        </div>
    );
}
