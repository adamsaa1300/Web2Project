import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditProfile() {
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");

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
    birthDate: currentUser?.birthDate || "",
    profileImage: currentUser?.profileImage || "",
  });

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    currentUser?.profileImage || ""
  );

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    setProfileImageFile(file);
    setPreviewImage(URL.createObjectURL(file));
  }

  function handleRemoveImage() {
    setProfileImageFile(null);
    setPreviewImage("");

    setFormData({
      ...formData,
      profileImage: "",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const token = sessionStorage.getItem("token");

    const data = new FormData();

    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("uni", formData.university);
    data.append("faculty", formData.faculty);
    data.append("location", formData.location);
    data.append("birthDate", formData.birthDate);
    data.append("profileImage", formData.profileImage);

    if (profileImageFile) {
      data.append("profileImage", profileImageFile);
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/users/${currentUser.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const savedUser = {
        ...res.data,
        id: res.data._id,
      };

      sessionStorage.setItem("user", JSON.stringify(savedUser));
      alert("Profile updated successfully ✨");
      window.location.href = "/profile";
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: "700px" }}>
      <div className="card p-4 shadow-sm border-0 rounded-4">
        <h2 className="mb-4 fw-bold">Edit Profile</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Profile Photo</label>

            <div className="d-flex align-items-center gap-3 flex-wrap">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  background: "#f2e8dc",
                  overflow: "hidden",
                  border: "3px solid #fff",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <i
                    className="bi bi-person-fill"
                    style={{
                      fontSize: "2.2rem",
                      color: "#7b5647",
                    }}
                  />
                )}
              </div>

              <div className="d-flex gap-2 flex-wrap">
                <label className="btn btn-outline-secondary mb-0">
                  Choose Photo
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    hidden
                    onChange={handleImageChange}
                  />
                </label>

                {previewImage && (
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={handleRemoveImage}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

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

          <div className="mb-3">
            <label className="form-label">Birth Date</label>

            <input
              type="date"
              className="form-control"
              name="birthDate"
              value={
                formData.birthDate ? formData.birthDate.substring(0, 10) : ""
              }
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}