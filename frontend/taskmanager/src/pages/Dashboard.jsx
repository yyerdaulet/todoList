import { useEffect, useState } from "react";
import api from "../api";

export default function Dashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    api.get("/students").then(res => setStudents(res.data));
  }, []);

  const averageMark =
    students.reduce((a, b) => a + b.mark, 0) / students.length || 0;

  return (
    <div>
      <h3>Dashboard</h3>
      <p>Total Students: {students.length}</p>
      <p>Average Mark: {averageMark.toFixed(2)}</p>
    </div>
  );
}