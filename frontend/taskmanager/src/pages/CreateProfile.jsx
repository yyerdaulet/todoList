import React, { useState } from "react";
import api from "../api";

const UserForm = () => {
  const id = localStorage.getItem("id");
  const [formData, setFormData] = useState({
    user_id: id,
    name: "",
    lastName: "",
    midName: "",
    birthday: "",
    degree: "BACHELOR",
    city: "",
    mark: ""
  });

  // For file uploads
  const [studentImage, setStudentImage] = useState(null);
  const [medicalPdf, setMedicalPdf] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/students", formData);
      alert("Profile saved successfully");
      console.log(response.data);
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    }
  };

  // Upload student image
  const handleUploadImage = async () => {
    if (!studentImage) {
      alert("Select an image first");
      return;
    }
    const form = new FormData();
    form.append("file", studentImage);
    form.append("user_id", id);

    try {
      const response = await api.post(`students/${id}/upload`, form, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setUploadMessage("Student image uploaded successfully");
      console.log(response.data);
    } catch (err) {
      console.error(err);
      setUploadMessage("Student image upload failed");
    }
  };

  // Upload medical certificate PDF
  const handleUploadPdf = async () => {
    if (!medicalPdf) {
      alert("Select a PDF first");
      return;
    }
    const form = new FormData();
    form.append("file", medicalPdf);
    form.append("user_id", id);

    try {
      const response = await api.post(`students/${id}/uploadFile`,form, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setUploadMessage("Medical certificate uploaded successfully");
      console.log(response.data);
    } catch (err) {
      console.error(err);
      setUploadMessage("Medical certificate upload failed");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          {/* User Form */}
          <div className="card shadow-lg border-0 rounded-4 mb-4">
            <div className="card-body p-5">
              <h3 className="mb-4 text-center fw-bold">User Information</h3>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" name="lastName" value={formData.lastname} onChange={handleChange} />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Middle Name</label>
                    <input type="text" className="form-control" name="midName" value={formData.midName} onChange={handleChange} />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Birthday</label>
                    <input type="date" className="form-control" name="birthday" value={formData.birthday} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Degree</label>
                    <select className="form-select" name="degree" value={formData.degree} onChange={handleChange}>
                      <option value="BACHELOR">Bachelor</option>
                      <option value="MASTER">Master</option>
                      <option value="DOCTOR">Doctor</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Mark</label>
                    <input type="number" className="form-control" name="mark" min="0" max="140" value={formData.mark} onChange={handleChange} />
                  </div>
                </div>

                <button type="submit" className="btn btn-dark w-100 py-2 rounded-3">Save Information</button>
              </form>
            </div>
          </div>

          {/* File Uploads */}
          <div className="card shadow-lg border-0 rounded-4 mb-4">
            <div className="card-body p-5">
              <h3 className="mb-4 text-center fw-bold">Uploads</h3>

              {/* Student Image */}
              <div className="mb-3">
                <label className="form-label">Student Image</label>
                <input type="file" accept="image/*" className="form-control mb-2" onChange={e => setStudentImage(e.target.files[0])} />
                <button className="btn btn-primary" onClick={handleUploadImage}>Upload Image</button>
              </div>

              {/* Medical PDF */}
              <div className="mb-3 mt-3">
                <label className="form-label">Medical Certificate (PDF)</label>
                <input type="file" accept="application/pdf" className="form-control mb-2" onChange={e => setMedicalPdf(e.target.files[0])} />
                <button className="btn btn-secondary" onClick={handleUploadPdf}>Upload PDF</button>
              </div>

              {uploadMessage && <p className="mt-2">{uploadMessage}</p>}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserForm;