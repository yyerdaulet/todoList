import { useEffect, useState, useMemo } from "react";
import api from "../api";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [degreeFilter, setDegreeFilter] = useState("ALL");
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await api.get("/students");
      setStudents(response.data);
    };
    fetchStudents();
  }, []);

  // FILTER + SORT
  const processedStudents = useMemo(() => {
    let data = [...students];

    // 🔎 Search
    data = data.filter((s) =>
      `${s.name} ${s.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    // 🎓 Degree filter
    if (degreeFilter !== "ALL") {
      data = data.filter((s) => s.degree === degreeFilter);
    }

    // ↕ Sorting
    data.sort((a, b) => {
      let valueA = a[sortField];
      let valueB = b[sortField];

      if (typeof valueA === "string") {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
      return 0;
    });

    return data;
  }, [students, search, degreeFilter, sortField, sortDirection]);

  // 📊 Statistics
  const totalStudents = processedStudents.length;

  const averageMark =
    totalStudents > 0
      ? (
          processedStudents.reduce((sum, s) => sum + s.mark, 0) /
          totalStudents
        ).toFixed(2)
      : 0;

  const topStudent =
    processedStudents.length > 0
      ? processedStudents.reduce((max, s) =>
          s.mark > max.mark ? s : max
        )
      : null;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div>
      <h3 className="mb-4">Students List</h3>

      {/* 🔎 Search */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🎓 Degree Filter */}
      <select
        className="form-select mb-3"
        value={degreeFilter}
        onChange={(e) => setDegreeFilter(e.target.value)}
      >
        <option value="ALL">All Degrees</option>
        <option value="BACHELOR">Bachelor</option>
        <option value="MASTER">Master</option>
        <option value="DOCTOR">Doctor</option>
      </select>

      {/* 📊 Statistics */}
      <div className="mb-4 p-3 bg-light rounded">
        <p><strong>Total Students:</strong> {totalStudents}</p>
        <p><strong>Average Mark:</strong> {averageMark}</p>
        {topStudent && (
          <p>
            <strong>Top Student:</strong> {topStudent.name}{" "}
            {topStudent.lastName} ({topStudent.mark})
          </p>
        )}
      </div>

      {/* 📋 Table */}
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>
              ID
            </th>
            <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
              Name
            </th>
            <th onClick={() => handleSort("degree")} style={{ cursor: "pointer" }}>
              Degree
            </th>
            <th onClick={() => handleSort("city")} style={{ cursor: "pointer" }}>
              City
            </th>
            <th onClick={() => handleSort("mark")} style={{ cursor: "pointer" }}>
              Mark
            </th>
          </tr>
        </thead>
        <tbody>
          {processedStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name} {student.lastName}</td>
              <td>{student.degree}</td>
              <td>{student.city}</td>
              <td>{student.mark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}