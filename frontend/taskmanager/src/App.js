import {Routes, Route , Link, Navigate} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile"
import CreateProfile from "./pages/CreateProfile";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';



const token = localStorage.getItem("token");

function App(){

    const [isAuth,setIsAuth] = useState(!!localStorage.getItem("token"));

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
                    <a class="navbar-brand" href="#">Navbar</a>
                    <Link to="/"> Profile</Link>
                    <Link to="/"> Projects</Link>
                    <Link to="/"> Assignee</Link>

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
            <Route path="/profiles/:id" element={<Profile />} />
            <Route path="/profiles" element={<CreateProfile />} />
        </Routes>

        </div>
    );
}

export default App;
