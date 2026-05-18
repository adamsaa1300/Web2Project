import React, { useState } from "react";
import { Card, Button ,Modal,Form} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {FaMapMarkerAlt, FaUniversity, FaBuilding, FaBoxOpen} from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
const ProductCard = ({item, setSelectedImages, setSelectedIndex}) => {
    const navigate = useNavigate();
    //aws-work
    const handleStartChat = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!user) {
        navigate("/login");
        return;
    }

    const buyerId = user._id || user.id;

    const data = await startProductChat(buyerId, item._id);

    if (data.error) {
        alert(data.error);
        return;
    }

    navigate(`/chat/${data._id}`);
};
    const [showReport, setShowReport] = useState(false);
    const [reason, setReason] = useState("");
    const [reportType, setReportType] = useState("");
    const [reportMessage, setReportMessage] = useState("");
    const location = useLocation();
    return (
        <Card
            className="border-0 shadow-sm h-100"
            style={{
                borderRadius: "22px",
                overflow: "hidden",
                transition: "0.3s ease",
                cursor: "pointer"
            }}

            onMouseEnter={(e) => {//When the user places the mouse over the product card:the card moves slightly upward
                e.currentTarget.style.transform = "translateY(-8px)";
            }}

            onMouseLeave={(e) => {//returns to its normal position
                e.currentTarget.style.transform = "translateY(0px)";
            }}
        >
            <div
                className="px-4 pt-3 pb-2 d-flex align-items-center justify-content-center gap-2"

                onClick={() => navigate(
                    `/profile/${item.user._id || item.user}`,
                    {
                        state: {
                            from:
                                location.state?.from ||
                                location.pathname
                        }
                    }
                )}

                onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#8b6b4f";
                }}

                onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#5a3e2b";
                }}

                style={{
                    color: "#5a3e2b",
                    fontWeight: "600",
                    fontSize: "14px",
                    borderBottom: "1px solid #f1ece6",
                    cursor: "pointer",
                    transition: "0.2s ease"
                }}
            >
                <FaUserCircle size={18} />

                <span>
        {item.userName || "Unknown Seller"}
    </span>
            </div>
            <div
                id={`carousel-featured-${item._id}`}
                className="carousel slide"
            >

                <div className="carousel-inner">

                    {Array.isArray(item.images) && item.images.map((img, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    top: "12px",
                                    right: "12px",
                                    backgroundColor: "#f5e7d0",
                                    color: "#5a3e2b",
                                    padding: "6px 12px",
                                    borderRadius: "999px",
                                    fontSize: "12px",
                                    fontWeight: "600",
                                    zIndex: 10
                                }}
                            >
                                {item.category}
                            </div>
                            <img
                                src={img}
                                alt="product"
                                onClick={() => {
                                    setSelectedImages(item.images);
                                    setSelectedIndex(index);
                                }}
                                className="d-block w-100"
                                style={{
                                    height: "260px",
                                    objectFit: "cover",
                                    cursor: "pointer"
                                }}
                            />
                        </div>
                    ))}
                </div>
                {item.images?.length > 1 && (
                    <>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target={`#carousel-featured-${item._id}`}
                            data-bs-slide="prev"
                        >
                            <span className="carousel-control-prev-icon"></span>
                        </button>

                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target={`#carousel-featured-${item._id}`}
                            data-bs-slide="next"
                        >
                            <span className="carousel-control-next-icon"></span>
                        </button>
                    </>
                )}
            </div>

            <Card.Body className="d-flex flex-column gap-3 p-4">
                <Card.Title
                    className="fw-bold text-center mb-1"
                    style={{
                        color: "#2f1e12",
                        fontSize: "22px"
                    }}
                >
                    {item.title}
                </Card.Title>

                <div
                    className="d-flex flex-column gap-2 text-center"
                    style={{
                        fontSize: "15px",
                        color: "#2f1e12",
                        fontWeight: "500"
                    }}
                >

                    <div className="d-flex align-items-center justify-content-center gap-2">
                        <FaMapMarkerAlt />
                        <span>{item.location}</span>
                    </div>

                    <div className="d-flex align-items-center justify-content-center gap-2">
                        <FaUniversity />
                        <span>{item.university}</span>
                    </div>

                    <div className="d-flex align-items-center justify-content-center gap-2">
                        <FaBuilding />
                        <span>{item.college}</span>
                    </div>

                    <div className="d-flex align-items-center justify-content-center gap-2">
                        <FaBoxOpen />
                        <span>{item.condition}</span>
                    </div>
                </div>


                <div className="mt-2">

                    <div
                        className="fw-bold text-center mb-2"
                        style={{
                            color: "#2f1e12"
                        }}
                    >
                        Description
                    </div>

                    <div
                        className="text-center"
                        style={{
                            color: "#2f1e12",
                            fontSize: "14px",
                            minHeight: "55px"
                        }}
                    >
                        {item.description?.length > 100
                            ? item.description.slice(0, 100) + "..."
                            : item.description}
                    </div>

                </div>


                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <h4
                        className="fw-bold mb-0"
                        style={{
                            color: "#2f1e12"
                        }}
                    >
                        ₪{item.price}
                    </h4>
                    {item.isNegotiable && (
                        <span
                            className="fw-semibold text-success"
                            style={{
                                fontSize: "13px"
                            }}
                        >
                Negotiable
            </span>
                    )}
                </div>

                <Button
                    onClick={handleStartChat}
                    className="mt-2 border-0 fw-semibold"
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#7b5647";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#5a3e2b";
                    }}
                    style={{
                        backgroundColor: "#5a3e2b",
                        borderRadius: "14px",
                        padding: "12px",
                        transition: "0.2s ease",
                    }}
                >
                    Start Chat
                </Button>
                
                <div
                    onClick={() => setShowReport(true)}

                    className="text-end mt-2"

                    style={{
                        color: "#5a3e2b",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer",
                        textDecoration: "underline"
                    }}
                >
                    Report
                </div>
            </Card.Body>
            <Modal
                show={showReport}
                centered
                onHide={() => setShowReport(false)}
            >

                <Modal.Header closeButton>
                    <Modal.Title>
                        Report Product
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {reportMessage && (

                        <div
                            style={{
                                backgroundColor:
                                    reportMessage.includes("success")
                                        ? "#e6f4ec"
                                        : "#fdecea",

                                color:
                                    reportMessage.includes("success")
                                        ? "#2d7a4f"
                                        : "#b5451b",

                                padding: "10px",
                                borderRadius: "10px",
                                marginBottom: "15px",
                                fontSize: "14px",
                                fontWeight: "500"
                            }}
                        >
                            {reportMessage}
                        </div>

                    )}
                    <Form.Group className="mb-3">

                        <Form.Label>
                            Report Type
                        </Form.Label>

                        <Form.Select

                            value={reportType}

                            onChange={(e) =>
                                setReportType(e.target.value)
                            }
                        >

                            <option value="">
                                Select reason
                            </option>

                            <option>
                                Scam
                            </option>

                            <option>
                                Fake Product
                            </option>
                            <option>
                               Dangerous product
                            </option>
                            <option>
                               Bad Conditions
                            </option>
                            <option>
                                Fake Informations
                            </option>

                            <option>
                                Inappropriate Content
                            </option>

                            <option>
                                Spam
                            </option>

                            <option>
                                Wrong Category
                            </option>

                            <option>
                                Other
                            </option>

                        </Form.Select>

                    </Form.Group>

                    <Form.Group>

                        <Form.Label>
                            Additional Details
                        </Form.Label>

                        <Form.Control
                            as="textarea"
                            rows={3}

                            value={reason}

                            onChange={(e) =>
                                setReason(e.target.value)
                            }

                            placeholder="Write report reason..."
                        />

                    </Form.Group>

                </Modal.Body>

                <Modal.Footer>

                    <Button
                        variant="secondary"
                        onClick={() => setShowReport(false)}
                    >
                        Cancel
                    </Button>

                    <Button

                        style={{
                            backgroundColor: "#5a3e2b",
                            border: "none"
                        }}

                        onClick={async () => {

                            if (!reportType) {

                                setReportMessage("Please select a report type");

                                return;
                            }

                            try {
                                const token =
                                    sessionStorage.getItem("token");

                                await fetch(
                                    "http://localhost:5000/api/reports",
                                    {
                                        method: "POST",

                                        headers: {
                                            "Content-Type": "application/json",
                                            Authorization: `Bearer ${token}`
                                        },

                                        body: JSON.stringify({
                                            title: item.title,
                                            desc: reason || "No additional description",
                                            tag: "ad",
                                            type: reportType,
                                            productId: item._id
                                        })
                                    }
                                );
                                setReportMessage("Report submitted successfully");

                                setReason("");

                                setTimeout(() => {

                                    setShowReport(false);

                                    setReportMessage("");

                                }, 1500);
                            } catch (err) {
                                console.log(err);
                                setReportMessage("Failed to submit report");
                            }
                        }}
                    >
                        Submit Report
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
};

export default ProductCard;