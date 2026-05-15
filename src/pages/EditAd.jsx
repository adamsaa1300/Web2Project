import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditAd() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          title: data.title || "",
          price: data.price || "",
          description: data.description || "",
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });

    alert("Listing updated successfully");
    navigate("/profile");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6efe7",
        padding: "40px",
      }}
    >
      <div
        style={{
          maxWidth: 700,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 20,
          padding: 30,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <h1
          style={{
            color: "#5f4632",
            fontWeight: "bold",
            marginBottom: 20,
            textAlign: "center",
          }}
        >
          Edit Listing
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="form-control mb-3"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <input
            type="text"
            inputMode="numeric"
            placeholder="Price"
            className="form-control mb-3"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />

          <textarea
            placeholder="Description"
            className="form-control mb-3"
            rows={5}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="btn"
            style={{
              background: "#7b5647",
              color: "#fff",
              borderRadius: 10,
              padding: "10px 20px",
              fontWeight: 700,
            }}
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}