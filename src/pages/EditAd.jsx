import React, { useEffect, useState } from "react";
import {
    Modal,
    Form,
    Button,
    Row,
    Col
} from "react-bootstrap";
import axios from "axios";

export default function EditListingModal({
                                             show,
                                             handleClose,
                                             listing,
                                             refreshListings,
                                         }) {

    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        location: "",
        university: "",
        college: "",
        price: "",
        condition: "",
        description: "",
        isNegotiable: false,
    });

    useEffect(() => {

        if (listing) {

            setFormData({

                title: listing.title || "",

                category: listing.category || "",

                location: listing.location || "",

                university: listing.university || "",

                college: listing.college || "",

                price: listing.price?.replace("₪", "") || "",

                condition: listing.condition || "",

                description: listing.description || "",

                isNegotiable:
                    listing.isNegotiable || false,

            });

        }

    }, [listing]);

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked
        } = e.target;

        setFormData({

            ...formData,

            [name]:
                type === "checkbox"
                    ? checked
                    : value

        });

    };

    const handleSave = async () => {

        try {

            await axios.put(

                `http://localhost:5000/api/products/${listing.id}`,

                formData,

                {
                    headers: {
                        Authorization:
                            `Bearer ${sessionStorage.getItem("token")}`
                    }
                }

            );

            setMessage("Listing updated successfully!");

            refreshListings();

            setTimeout(() => {

                setMessage("");

                handleClose();

            }, 1200);

        } catch (err) {

            console.log(err);

            setMessage("Failed to update listing");

        }

    };

    const universities = [
        "Palestine University",
        "An-Najah National University",
        "Birzeit University",
        "Palestine Technical University (Kadoorie)"
    ];

    const colleges = [
        "Medicine",
        "Engineering",
        "IT / Technology",
        "Law",
        "Business",
        "Arts",
        "Pharmacy"
    ];

    return (

        <Modal
            show={show}
            onHide={handleClose}
            centered
            size="lg"
        >

            <Modal.Header closeButton>

                <Modal.Title>
                    Edit Listing
                </Modal.Title>

            </Modal.Header>

            <Modal.Body>

                {message && (

                    <div
                        style={{
                            backgroundColor:
                                message.includes("success")
                                    ? "#e8f5e4"
                                    : "#fdecea",

                            color:
                                message.includes("success")
                                    ? "#557c55"
                                    : "#b5451b",

                            padding: "10px 14px",

                            borderRadius: "10px",

                            marginBottom: "16px",

                            fontWeight: "500",
                        }}
                    >
                        {message}
                    </div>

                )}

                <Row className="g-3">

                    <Col md={12}>

                        <Form.Label>
                            Title
                        </Form.Label>

                        <Form.Control
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />

                    </Col>

                    <Col md={6}>

                        <Form.Label>
                            Category
                        </Form.Label>

                        <Form.Select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        >
                            <option>Slides</option>
                            <option>Books</option>
                            <option>Calculators</option>
                            <option>Laptops</option>
                            <option>Lab Coats</option>
                            <option>Colors</option>
                            <option>Bags</option>
                            <option>Others</option>
                        </Form.Select>

                    </Col>

                    <Col md={6}>

                        <Form.Label>
                            Location
                        </Form.Label>

                        <Form.Select
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        >
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

                    </Col>

                    <Col md={6}>

                        <Form.Label>
                            University
                        </Form.Label>

                        <Form.Select
                            name="university"
                            value={formData.university}
                            onChange={handleChange}
                        >
                            {universities.map((uni) => (
                                <option key={uni}>
                                    {uni}
                                </option>
                            ))}
                        </Form.Select>

                    </Col>

                    <Col md={6}>

                        <Form.Label>
                            Faculty
                        </Form.Label>

                        <Form.Select
                            name="college"
                            value={formData.college}
                            onChange={handleChange}
                        >
                            {colleges.map((col) => (
                                <option key={col}>
                                    {col}
                                </option>
                            ))}
                        </Form.Select>

                    </Col>

                    <Col md={6}>

                        <Form.Label>
                            Price
                        </Form.Label>

                        <Form.Control
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />

                    </Col>

                    <Col md={6}>

                        <Form.Label>
                            Condition
                        </Form.Label>

                        <Form.Select
                            name="condition"
                            value={formData.condition}
                            onChange={handleChange}
                        >
                            <option value="new">
                                Brand New
                            </option>

                            <option value="open_box">
                                Open Box
                            </option>

                            <option value="used_excellent">
                                Used Excellent
                            </option>

                            <option value="used_good">
                                Used Good
                            </option>

                            <option value="used_fair">
                                Used Fair
                            </option>

                        </Form.Select>

                    </Col>

                    <Col md={12}>

                        <Form.Label>
                            Description
                        </Form.Label>

                        <Form.Control
                            as="textarea"
                            rows={4}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />

                    </Col>

                </Row>

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
                        backgroundColor: "#5a3e2b",
                        border: "none"
                    }}
                >
                    Save Changes
                </Button>

            </Modal.Footer>

        </Modal>

    );
}