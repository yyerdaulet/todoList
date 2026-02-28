import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function ProfileForm() {
  const { student_id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    midName: "",
    birthday: "",
    degree: "BACHELOR",
    city: "",
    mark: ""
  });

  const [photoPreview, setPhotoPreview] = useState(null);
  const [pdfName, setPdfName] = useState(null);

  const baseURL = "http://localhost:8080";

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await api.get(`/students/${student_id}`);
      setFormData(response.data);
      setPhotoPreview(response.data.photoURL || null);
      setPdfName(response.data.medicalPageURL || null);
    };
    fetchProfile();
  }, [student_id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/students/${student_id}`, formData);
    alert("Profile updated!");
  };

  const handleDownloadStudentInfo = async () => {
    try {
      const response = await api.get(
        `/students/${student_id}/download`,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], {
        type: "application/pdf",
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `student_${student_id}_info.pdf`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to generate student PDF");
    }
  };

  const handleDeleteStudent = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/students/${student_id}`);
      alert("Student deleted successfully!");
      window.location.href = "/students";
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete student");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-11">
          <div
            className="p-5 shadow-lg"
            style={{
              background: "linear-gradient(145deg,#f8f9fa,#e9ecef)",
              borderRadius: "24px"
            }}
          >
            <h3 className="text-center mb-5 fw-bold">Student Profile</h3>

            <div className="row g-5">
              {/* LEFT COLUMN */}
              <div className="col-lg-4">

                {/* PHOTO DISPLAY ONLY */}
                <div
                  className="p-3 mb-4 text-center"
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
                  }}
                >
                  <div
                    style={{
                      width: "180px",
                      height: "230px",
                      margin: "0 auto 15px",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                    }}
                  >
                    {photoPreview ? (
                      <img
                        src={`${baseURL}/students/${student_id}/photo/${photoPreview}`}
                        alt="Student"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                        No Photo
                      </div>
                    )}
                  </div>
                </div>

                {/* MEDICAL CERTIFICATE DISPLAY ONLY */}
                <div
                  className="p-3"
                  style={{
                    background: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
                  }}
                >
                  <h6 className="mb-3 fw-semibold">Medical Certificate</h6>

                  {pdfName ? (
                    <div
                      className="text-center p-2"
                      style={{
                        background: "#f1f3f5",
                        borderRadius: "8px",
                        fontSize: "0.9rem"
                      }}
                    >
                      {pdfName}
                    </div>
                  ) : (
                    <div className="text-muted text-center">
                      No Medical Certificate
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="col-lg-8">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label>First Name</label>
                      <input
                        className="form-control"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>Last Name</label>
                      <input
                        className="form-control"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>Middle Name</label>
                      <input
                        className="form-control"
                        name="midName"
                        value={formData.midName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>Birthday</label>
                      <input
                        type="date"
                        className="form-control"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>Degree</label>
                      <select
                        className="form-select"
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                      >
                        <option value="BACHELOR">Bachelor</option>
                        <option value="MASTER">Master</option>
                        <option value="DOCTOR">Doctor</option>
                      </select>
                    </div>

                    <div className="col-md-6 mb-3">
                      <label>City</label>
                      <input
                        className="form-control"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label>Mark</label>
                      <input
                        type="number"
                        className="form-control"
                        name="mark"
                        min="0"
                        max="140"
                        value={formData.mark}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-dark w-100 py-3 fw-semibold"
                    style={{ borderRadius: "12px" }}
                  >
                    Save Changes
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-primary w-100 py-3 mb-3 mt-4 fw-semibold"
                    style={{ borderRadius: "12px" }}
                    onClick={handleDownloadStudentInfo}
                  >
                    Download Student Info PDF
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger w-100 py-3 mb-3 mt-4 fw-semibold"
                    style={{ borderRadius: "12px" }}
                    onClick={handleDeleteStudent}
                  >
                    Delete Student
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}