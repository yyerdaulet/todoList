import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function Profile(){
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const fetchProfile = async () => {
            try {
                const response = await api.get(`profiles/${id}`);
                setProfile(response.data);
                }
            catch(err){
                console.error(err);
                }finally{
                    setLoading(false);
                    }
            };

            fetchProfile();
        }, [id]);

        if (loading) return <p>Loading...</p>;
        if (!profile) return <p>Not found</p>;

        return (
            <div>
                <h1>Name : {profile.name}</h1>
                <h1>Last Name : {profile.lastName}</h1>
                <h1>Birthday : {profile.birthday}</h1>
                <h1>Degree : {profile.degree}</h1>
                <h1>University : {profile.university}</h1>
            </div>
            );


    }