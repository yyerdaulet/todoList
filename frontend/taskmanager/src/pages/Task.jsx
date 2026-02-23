import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import api from "../api";

export default function Task(){
    const { project_id,profile_id,task_id } = useParams();
    const [task, setTask] = useState(null);
    const [loading,setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect( () => {

        const fetchTask = async () =>{
            try {
                const response = await api.get(`/profiles/${profile_id}/projects/${project_id}/tasks/${task_id}`);
                setTask(response.data);
                }
            catch(err){
                console.error(err);
                }finally{
                    setLoading(false);
                    }
            }
        fetchTask();
        }, [profile_id,project_id],task_id);

        function createTask(){
            navigate(`/profiles/${profile_id}/projects/${project_id}/create`)
            }

        if (loading) return <p>Loading...</p>;
        if (!task) return <p>Not found</p>;

        return (
            <div>
                <h1>Title: {task.title}</h1>
                <h1>Status: {task.status}</h1>

            </div>

            )
    }