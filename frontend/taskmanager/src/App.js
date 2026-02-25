import {Routes, Route , Link} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import CreateProject from "./pages/CreateProject";
import CreateProfile from "./pages/CreateProfile";
import CreateTask from "./pages/CreateTask";
import Project from "./pages/Project";
import Task from "./pages/Task";
import Tasks from "./pages/Tasks";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isAuth,setIsAuth] = useState(!!localStorage.getItem("token"));

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {!isAuth ? (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to={`/profiles/${localStorage.getItem("id")}`}>Profile</Link>
            <Link to={`/profiles/${localStorage.getItem("id")}/projects`}>Projects</Link>
            <button onClick={() => {
              localStorage.removeItem("token");
              setIsAuth(false);
            }}>Log out</button>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/profiles/:profile_id" element={<Profile />} />
        <Route path="/profiles/:profile_id/projects" element={<Projects />} />
        <Route path="/profiles/:profile_id/projects/create" element={<CreateProject />} />
        <Route path="/profiles/:profile_id/projects/:project_id" element={<Project />} />
        <Route path="/profiles/:profile_id/projects/:project_id/tasks" element={<Tasks />} />
        <Route path="/profiles/:profile_id/projects/:project_id/tasks/create" element={<CreateTask />} />
        <Route path="/profiles/:profile_id/projects/:project_id/tasks/:task_id" element={<Task />} />
        <Route path="/profiles" element={<CreateProfile />} />
      </Routes>
    </div>
  );
}

export default App;
