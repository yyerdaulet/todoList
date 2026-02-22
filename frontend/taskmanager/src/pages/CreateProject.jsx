import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function CreateProfile(){
    const [name,setName] = useState("");

    const navigate = useNavigate();


    const createProfile() = async () => {

        try{
            const response = await api.post(`/profiles/${profile_id}/projects`,
                {
                   name
                    }

                );


            navigate(`profiles/${profile_id}/projects/${project_id}`);

            }catch(error){
                console.error(error);
                }

        };

        return (
            <div>
                <input>
                   placeholder="Project Name"
                   onChange={(e) => setName(e.target.value)}
                </div>
            )

    }