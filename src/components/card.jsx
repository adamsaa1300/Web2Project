import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
                         item,
                         setSelectedImages,
                         setSelectedIndex
                     }) => {

    const navigate = useNavigate();

    return (

        <Card

            className="border-0 shadow-sm h-100"
            style={{
                borderRadius: "22px",
                overflow: "hidden",
                transition: "0.3s ease",
                cursor: "pointer"
            }}

            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
            }}

            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
            }}
        >
            <div
                className="px-4 pt-3 pb-2"
                style={{
                    color: "#5a3e2b",
                    fontWeight: "600",
                    fontSize: "14px",
                    borderBottom: "1px solid #f1ece6"
                }}
            >
                {item.userName || "Unknown Seller"}
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

                    <div>📍 {item.location}</div>

                    <div>🎓 {item.university}</div>

                    <div>🏛️ {item.college}</div>
                    <div>📦 {item.condition}</div>
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
                        {item.description?.length > 70
                            ? item.description.slice(0, 70) + "..."
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
                    onClick={() => navigate(`/chat/${item.user}`)}
                    className="mt-2 border-0 fw-semibold"
                    style={{
                        backgroundColor: "#5a3e2b",
                        borderRadius: "14px",
                        padding: "12px"
                    }}
                >
                    Start Chat
                </Button>

            </Card.Body>

        </Card>


    );
};

export default ProductCard;