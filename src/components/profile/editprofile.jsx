import React, { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function EditProfileModal({
                                             show,
                                             handleClose,
                                             user,
                                             setUser,
                                         }) {

    const emailDomain =
        user.email?.includes("@gmail.com")
            ? "@gmail.com"
            : user.email?.includes("@sawweq.admin.com")
                ? "@sawweq.admin.com"
                : "@sawweq.com";

    const [form, setForm] = useState({

        name:
            user.fullName &&
            user.fullName !== "name"
                ? user.fullName
                : user.name || "",

        location:
            user.location &&
            user.location !== "location"
                ? user.location
                : "",

        faculty:
            user.major &&
            user.major !== "faculty"
                ? user.major
                : user.faculty || "",

        university:
            user.university &&
            user.university !== "university"
                ? user.university
                : user.uni || "",

        birthDate:
            user.birthDate || "",

        emailUsername:
            user.email?.split("@")[0] || "",
    });

    const [message, setMessage] = useState("");

    const profileIncomplete =

        !user.name &&
        !user.fullName ||

        !user.location ||

        !user.faculty &&
        !user.major ||

        !user.uni &&
        !user.university ||

        !user.birthDate;

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSave = async () => {

        const invalidValues = [
            "location",
            "faculty",
            "university",
        ];

        if (
            !form.name.trim() ||
            !form.emailUsername.trim() ||
            !form.location.trim() ||
            !form.faculty.trim() ||
            !form.university.trim() ||
            !form.birthDate.trim() ||

            invalidValues.includes(
                form.location.toLowerCase()
            ) ||

            invalidValues.includes(
                form.faculty.toLowerCase()
            ) ||

            invalidValues.includes(
                form.university.toLowerCase()
            )
        ) {

            setMessage(
                "Please enter valid information"
            );

            return;

        }

        try {

            await axios.put(
                `http://localhost:5000/api/users/${user.id}`,
                {
                    name: form.name,

                    location: form.location,

                    faculty: form.faculty,

                    uni: form.university,

                    birthDate: form.birthDate,

                    email:
                        `${form.emailUsername}${emailDomain}`,
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

                birthDate: form.birthDate,

                email:
                    `${form.emailUsername}${emailDomain}`,
            };

            setUser(updatedUser);

            sessionStorage.setItem(
                "user",
                JSON.stringify(updatedUser)
            );

            setMessage(
                "Profile updated successfully!"
            );

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
            onHide={
                profileIncomplete
                    ? undefined
                    : handleClose
            }
            backdrop={
                profileIncomplete
                    ? "static"
                    : true
            }
            keyboard={!profileIncomplete}
            centered
        >

            <Modal.Header closeButton={!profileIncomplete}>

                <Modal.Title>
                    Complete Your Profile
                </Modal.Title>

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
                        {message}
                    </div>

                )}

                <Form>

                    <Form.Group className="mb-3">

                        <Form.Label>
                            Name
                        </Form.Label>

                        <Form.Control
                            name="name"
                            autoComplete="off"
                            value={form.name}
                            onChange={handleChange}
                            style={inputStyle}
                        />

                    </Form.Group>

                    <Form.Group className="mb-3">

                        <Form.Label>
                            Email
                        </Form.Label>

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
                                {emailDomain}
                            </div>

                        </div>

                        <div
                            style={{
                                fontSize: "12px",
                                color: "#8b6b4f",
                                marginTop: "6px",
                                marginLeft: "4px",
                            }}
                        >
                            Enter only your username
                            without {emailDomain}
                        </div>

                    </Form.Group>

                    <Row>

                        <Col md={6}>

                            <Form.Group className="mb-3">

                                <Form.Label>
                                    Location
                                </Form.Label>

                                <Form.Select
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    style={inputStyle}
                                >

                                    <option value="">
                                        Select location
                                    </option>

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

                                <Form.Label>
                                    Faculty
                                </Form.Label>

                                <Form.Select
                                    name="faculty"
                                    value={form.faculty}
                                    onChange={handleChange}
                                    style={inputStyle}
                                >

                                    <option value="">
                                        Select faculty
                                    </option>

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

                        <Form.Label>
                            University
                        </Form.Label>

                        <Form.Select
                            name="university"
                            value={form.university}
                            onChange={handleChange}
                            style={inputStyle}
                        >

                            <option value="">
                                Select university
                            </option>

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

                    <Form.Group className="mb-3">

                        <Form.Label>
                            Birth Date
                        </Form.Label>

                        <Form.Control
                            type="date"
                            name="birthDate"
                            value={form.birthDate}
                            onChange={handleChange}
                            style={inputStyle}
                        />

                    </Form.Group>

                </Form>

            </Modal.Body>

            <Modal.Footer>

                {!profileIncomplete && (

                    <Button
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>

                )}

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