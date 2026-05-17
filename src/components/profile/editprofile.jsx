import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function EditProfileModal({
                                             show,
                                             handleClose,
                                             user,
                                             setUser,
                                         }) {

    const [form, setForm] = useState({
        name: user.fullName || "",
        location: user.location || "",
        faculty: user.major || "",
        university: user.university || "",
        bio: user.bio || "",
        emailUsername:
            user.email?.replace("@sawweq.com", "") || "",
    });
    const [message, setMessage] = useState("");
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };
    const handleSave = async () => {

        try {

            const res = await axios.put(
                `http://localhost:5000/api/users/${user.id}`,
                {
                    name: form.name,
                    location: form.location,
                    faculty: form.faculty,
                    uni: form.university,
                    bio: form.bio,
                    email: `${form.emailUsername}@sawweq.com`,
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${sessionStorage.getItem("token")}`
                    }
                }
            );

            const updatedUser = {
                ...user,

                fullName: form.name,
                name: form.name,

                location: form.location,

                major: form.faculty,
                faculty: form.faculty,

                university: form.university,
                uni: form.university,

                bio: form.bio,

                email: `${form.emailUsername}@sawweq.com`,
            };

            setUser(updatedUser);

            sessionStorage.setItem(
                "user",
                JSON.stringify({
                    ...JSON.parse(sessionStorage.getItem("user")),

                    name: form.name,

                    location: form.location,

                    faculty: form.faculty,

                    uni: form.university,

                    bio: form.bio,

                    email: `${form.emailUsername}@sawweq.com`,
                })
            );

            setMessage("Profile updated successfully!");

            setTimeout(() => {

                handleClose();

                setMessage("");

            }, 1000);

        } catch (err) {

            console.log(err);

        }

    };

    const inputStyle = {
        borderRadius: "12px",
        padding: "12px",
        fontSize: "15px",
        border: "1px solid #e6d3b3",
    };

    return (

        <Modal
            show={show}
            onHide={handleClose}
            centered
        >

            <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {message && (

                    <div
                        style={{
                            backgroundColor: "#e8f5e4",
                            color: "#557c55",
                            padding: "10px 14px",
                            borderRadius: "10px",
                            marginBottom: "16px",
                            fontWeight: "500",
                            fontSize: ".95rem",
                        }}
                    >
                        <i className="bi bi-check-circle-fill me-2" />

                        {message}
                    </div>

                )}
                <Form>

                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>

                        <Form.Control
                            name="name"
                            autoComplete="off"
                            value={form.name}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">

                        <Form.Label>Email</Form.Label>

                        <div style={{ display: "flex" }}>

                            <Form.Control
                                name="emailUsername"
                                value={form.emailUsername}
                                onChange={handleChange}
                                autoComplete="off"
                                style={{
                                    ...inputStyle,
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                }}
                            />

                            <div
                                style={{
                                    backgroundColor: "#e6d3b3",
                                    padding: "12px",
                                    border: "1px solid #e6d3b3",
                                    borderLeft: "none",
                                    borderTopRightRadius: "12px",
                                    borderBottomRightRadius: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    color: "#5a3e2b",
                                    fontWeight: "600"
                                }}
                            >
                                @sawweq.com
                            </div>

                        </div>

                    </Form.Group>
                    <Row>

                        <Col md={6}>

                            <Form.Group className="mb-3">

                                <Form.Label>Location</Form.Label>

                                <Form.Select
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    style={inputStyle}
                                >
                                    <option value="">Select location</option>

                                    <option>Nablus</option>
                                    <option>Ramallah</option>
                                    <option>Hebron</option>
                                    <option>Jerusalem</option>
                                    <option>Jenin</option>
                                    <option>Tulkarm</option>
                                    <option>Qalqilya</option>
                                    <option>Bethlehem</option>
                                    <option>Jericho</option>

                                </Form.Select>

                            </Form.Group>

                        </Col>

                        <Col md={6}>

                            <Form.Group className="mb-3">

                                <Form.Label>Faculty</Form.Label>

                                <Form.Select
                                    name="faculty"
                                    value={form.faculty}
                                    onChange={handleChange}
                                    style={inputStyle}
                                >

                                    <option value="">Select faculty</option>

                                    <option>Medicine</option>
                                    <option>Engineering</option>
                                    <option>IT / Technology</option>
                                    <option>Law</option>
                                    <option>Business</option>
                                    <option>Arts</option>
                                    <option>Pharmacy</option>

                                </Form.Select>

                            </Form.Group>

                        </Col>

                    </Row>

                    <Form.Group className="mb-3">

                        <Form.Label>University</Form.Label>

                        <Form.Select
                            name="university"
                            value={form.university}
                            onChange={handleChange}
                            style={inputStyle}
                        >

                            <option value="">Select university</option>

                            <option>
                                Palestine University
                            </option>

                            <option>
                                An-Najah National University
                            </option>

                            <option>
                                Birzeit University
                            </option>

                            <option>
                                Palestine Technical University (Kadoorie)
                            </option>

                        </Form.Select>

                    </Form.Group>

                </Form>

            </Modal.Body>

            <Modal.Footer>

                <Button
                    variant="secondary"
                    onClick={handleClose}
                >
                    Cancel
                </Button>

                <Button
                    onClick={handleSave}
                    style={{
                        backgroundColor: "#d2b48c",
                        border: "none",
                        color: "#5a3e2b",
                        fontWeight: "600",
                    }}
                >
                    Save Changes
                </Button>

            </Modal.Footer>

        </Modal>

    );
}