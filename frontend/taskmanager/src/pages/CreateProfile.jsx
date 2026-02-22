import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function CreateProfile(){
    const [name,setName] = useState("");
    const [lastname,setLastName] = useState("");
    const [birthday,setBirthday] = useState("");
    const [degree, setDegree] = useState("");
    const [university,setUniversity] = useState("");

    const navigate = useNavigate();

    const createProfile = async () => {

            try{
                console.log(localStorage.getItem("token"));
                console.log(localStorage.getItem("id"));

                const user_id = localStorage.getItem("id");
                const response = await api.post("/profiles",{
                    user_id,
                    name,
                    lastname,
                    birthday,
                    degree,
                    university
                    });


                    navigate(`profiles/${user_id}`);
                }catch(error){
                    console.error(error);
                    }
        };

        return (
            <div>
                <input
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                />

                <input
                    placeholder="birthday"
                    onChange={(e) => setBirthday(e.target.value)}
                    />

                <input
                    placeholder="degree"
                    onChange={(e) => setDegree(e.target.value)}
                    />

                <input
                    placeholder="university"
                    onChange={(e) => setUniversity(e.target.value)}
                    />

                <button onClick = {createProfile}>Create Profile</button>
                </div>

            )

    }