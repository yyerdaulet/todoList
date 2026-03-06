import {Routes, Route , Link} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import CreateProfile from "./pages/CreateProfile";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import StudentsPage from "./pages/StudentsPage";
import AdminLayout from "./pages/AdminLayout";
import Dashboard from "./pages/Dashboard";
import VerifyEmail from "./pages/VerifyEmail"
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
        <Route path="/admin" element={<AdminLayout />} />
          <Route path="/admin/profiles" element={<StudentsPage />} />
          <Route path="dashboard" element={<Dashboard />} />
        <Route path="/profiles" element={<CreateProfile />} />
        <Route path="/register/verify" element={<VerifyEmail />} />
      </Routes>
    </div>
  );
}

export default App;
