import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {

            await axios.put(
                "http://localhost:5000/api/users/reset-password",
                {
                    email: form.email,
                    newPassword: form.newPassword
                }
            );

            alert("Password updated successfully!");

            navigate("/login");

        } catch (err) {

            alert(
                err.response?.data?.error ||
                "Something went wrong"
            );

        }

    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fdf5ec"
            }}
        >

            <Card
                style={{
                    width: "450px",
                    padding: "35px",
                    borderRadius: "20px",
                    backgroundColor: "#f5e7d0",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.25)"
                }}
            >

                <h2
                    className="text-center mb-4"
                    style={{
                        color: "#5a3e2b"
                    }}
                >
                    Reset Password
                </h2>

                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>

                        <Form.Control
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>

                        <Form.Control
                            type="password"
                            name="newPassword"
                            value={form.newPassword}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Confirm Password</Form.Label>

                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={form.confirmPassword}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        className="w-100 border-0"
                        style={{
                            backgroundColor: "#5a3e2b",
                            padding: "12px",
                            borderRadius: "12px"
                        }}
                    >
                        Reset Password
                    </Button>

                </Form>

            </Card>

        </div>
    );
}

export default ForgotPassword;