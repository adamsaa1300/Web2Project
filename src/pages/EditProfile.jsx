import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function EditProfile() {
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();
  useEffect(() => {

    const token =
        sessionStorage.getItem("token");
    axios.put(
        `/api/users/${currentUser.id}`
    )
    if (!token) {

      navigate("/login");

    }

  }, []);
  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    university: currentUser?.uni || "",
    faculty: currentUser?.faculty || "",
    location: currentUser?.location || "",
    bio: currentUser?.bio || "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    sessionStorage.setItem(
      "user",
      JSON.stringify({
        ...currentUser,
        name: formData.name,
        email: formData.email,
        uni: formData.university,
        faculty: formData.faculty,
        location: formData.location,
        bio: formData.bio,
      })
    );

    alert("Profile updated successfully ✨");

    window.location.href = "/profile";
  }

  return (
    <div
      className="container py-5"
      style={{ maxWidth: "700px" }}
    >
      <div className="card p-4 shadow-sm border-0 rounded-4">
        <h2 className="mb-4 fw-bold">Edit Profile</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>

            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">University</label>

            <input
              type="text"
              className="form-control"
              name="university"
              value={formData.university}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Faculty</label>

            <input
              type="text"
              className="form-control"
              name="faculty"
              value={formData.faculty}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>

            <input
              type="text"
              className="form-control"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Bio</label>

            <textarea
              className="form-control"
              rows="4"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}