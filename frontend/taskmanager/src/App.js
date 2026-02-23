import {Routes, Route , Link, Navigate} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import CreateProfile from "./pages/CreateProfile";
import CreateTask from "./pages/CreateTask";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import Project from "./pages/Project";
import Task from "./pages/Task";
import Tasks from "./pages/Tasks";


const token = localStorage.getItem("token");

function App(){

    const [isAuth,setIsAuth] = useState(!!localStorage.getItem("token"));

    const profile_id = localStorage.getItem("id");
    const project_id = localStorage.getItem("profile_id");
    const task_id = localStorage.getItem("task_id");

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
    }

    return (
        <div>


        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            {!isAuth ? (<>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </>
            ) : (
                <>

                    <Link to={`/profiles/${profile_id}`}> Profile</Link>
                    <Link to={`/profiles/${profile_id}/projects`}> Projects</Link>
                    


                    <button onClick={ () => {
                        localStorage.removeItem("token");
                        window.location.href="/login";
                    }}>
                    Log out
                    </button>
                </>
            )

            }
        </nav>

        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
            <Route path="/profiles/:profile_id" element={<Profile />} />
            <Route path="/profiles/:profile_id/projects" element={<Projects />} />

            <Route path="/profiles/:profile_id/projects/:project_id/tasks" element={<Tasks />} />
            <Route path="/profiles/:profile_id/projects/:project_id/tasks/:task_id" element={<Task />} />
            <Route path="/profiles/:profile_id/projects/create" element={<CreateProject />} />
            <Route path="/profiles/:profile_id/projects/:project_id/tasks/create" element={<CreateTask />} />
            <Route path="/profiles" element={<CreateProfile />} />

            <Route path="/profiles/:profile_id/projects/:project_id" element={<Project />} />
        </Routes>

        </div>
    );
}

export default App;
