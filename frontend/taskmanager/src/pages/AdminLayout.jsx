import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="d-flex">
      <div style={{ width: "250px", background: "#212529", minHeight: "100vh", color: "white" }}>
        <h4 className="p-3">Admin Panel</h4>
        <ul className="list-unstyled p-3">
          <li>
            <Link to="students" className="text-white text-decoration-none">
              Students
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}