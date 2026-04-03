import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

const Register = () => {
    const [form, setForm] = useState({
        email: "",
        birthDate: "",
        location: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        setErrors((prev) => ({
            ...prev,
            [e.target.name]: "",
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let newErrors = {};

        if (!form.email || !form.email.includes("@")) {
            newErrors.email = "Invalid email";
        }

        if (!form.birthDate) {
            newErrors.birthDate = "Birth date is required";
        }

        if (!form.location) {
            newErrors.location = "Location is required";
        }

        if (!form.password || form.password.length < 4) {
            newErrors.password = "Password must be at least 4 characters";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            alert("Register successful");
        }
    };

    const inputStyle = (hasError) => ({
        borderRadius: "12px",
        padding: "12px",
        fontSize: "15px",
        border: hasError ? "2px solid #b04a4a" : "1px solid #e6d3b3",
    });

    const buttonStyle = {
        width: "100%",
        borderRadius: "12px",
        fontWeight: "600",
        fontSize: "16px",
        backgroundColor: "#d2b48c",
        border: "2px solid #5a3e2b",
        color: "#5a3e2b",
        padding: "12px",
        marginTop: "10px",
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fdf5ec",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
        >
            <Card
                style={{
                    width: "480px",
                    padding: "35px",
                    borderRadius: "20px",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
                    backgroundColor: "#f5e7d0",
                }}
            >
                <h2
                    style={{
                        textAlign: "center",
                        color: "#5a3e2b",
                        marginBottom: "25px",
                        fontWeight: "700",
                        fontSize: "28px",
                    }}
                >
                    Register
                </h2>

                <Form onSubmit={handleSubmit} noValidate>

                    {/* EMAIL */}
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            style={inputStyle(errors.email)}
                        />
                        {errors.email && (
                            <div style={{ color: "#b04a4a", fontSize: "13px" }}>
                                {errors.email}
                            </div>
                        )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Birth Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="birthDate"
                            value={form.birthDate}
                            onChange={handleChange}
                            style={inputStyle(errors.birthDate)}
                        />
                        {errors.birthDate && (
                            <div style={{ color: "#b04a4a", fontSize: "13px" }}>
                                {errors.birthDate}
                            </div>
                        )}
                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            style={inputStyle(errors.location)}
                        />
                        {errors.location && (
                            <div style={{ color: "#b04a4a", fontSize: "13px" }}>
                                {errors.location}
                            </div>
                        )}
                    </Form.Group>


                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            style={inputStyle(errors.password)}
                        />
                        {errors.password && (
                            <div style={{ color: "#b04a4a", fontSize: "13px" }}>
                                {errors.password}
                            </div>
                        )}
                    </Form.Group>


                    <Button type="submit" style={buttonStyle}>
                        Submit
                    </Button>

                </Form>
            </Card>
        </div>
    );
};

export default Register;