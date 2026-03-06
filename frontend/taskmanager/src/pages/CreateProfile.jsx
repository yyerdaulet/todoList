import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
    const navigate = useNavigate();
  const id = localStorage.getItem("id"); // optional if you need user_id
  const [formData, setFormData] = useState({
    user_id: id,        // keep it if backend expects it
    orcid: "",
    name: "",
    lastName: "",
    birthday: "",
    degree: "BACHELOR",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/profiles", formData);
      alert("Profile saved successfully");
      console.log(response.data);
      navigate(`/profiles/${id}`)
    } catch (err) {
      console.error(err);
      alert("Error saving profile");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow-lg border-0 rounded-4 mb-4">
            <div className="card-body p-5">
              <h3 className="mb-4 text-center fw-bold">Profile Information</h3>
              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">ORCID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="orcid"
                    value={formData.orcid}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Birthday</label>
                  <input
                    type="date"
                    className="form-control"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Degree</label>
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

                <button type="submit" className="btn btn-dark w-100 py-2 rounded-3">
                  Save Profile
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;