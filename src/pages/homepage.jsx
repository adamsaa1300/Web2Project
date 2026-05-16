import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Card, Spinner } from "react-bootstrap";
import homebg from "../assets/homebg.jpg";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/card.jsx";
import Filters from "../components/filters.jsx";
const Home = () => {
    const [products, setProducts] = useState([]);
    const [results, setResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        category: "",
        location: "",
        college: "",
        university: "",
        price:""
    });
    const navigate = useNavigate();
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");//redirect to log in if not logged
        }
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/products");
                const data = await res.json();
                setProducts(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedImages.length > 0) {
            document.body.style.overflow = "hidden";
        }
        else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };

    }, [selectedImages]);

    const handleSearch = async () => {
        setLoading(true);
        setHasSearched(true);
        try {
            const res = await fetch("http://localhost:5000/api/products");
            const data = await res.json();
            const filtered = data.filter((item) => {
                const categoryMatch =
                    !filters.category ||
                    filters.category === "All Categories" ||
                    item.category === filters.category;

                const locationMatch =
                    !filters.location ||
                    filters.location === "Any Location" ||
                    item.location === filters.location;

                const collegeMatch =
                    !filters.college ||
                    filters.college === "All Faculties" ||
                    item.college === filters.college;

                const universityMatch =
                    !filters.university ||
                    filters.university === "All Universities" ||
                    item.university === filters.university;
                let priceMatch = true;

                if (filters.price === "0-50") {
                    priceMatch = item.price >= 0 && item.price <= 50;
                }

                else if (filters.price === "50-200") {
                    priceMatch = item.price > 50 && item.price <= 200;
                }

                else if (filters.price === "200-1000") {
                    priceMatch = item.price > 200 && item.price <= 1000;
                }

                else if (filters.price === "1000+") {
                    priceMatch = item.price > 1000;
                }
                return (
                    categoryMatch &&
                    locationMatch &&
                    collegeMatch &&
                    universityMatch &&
                    priceMatch
                );
            });

            setResults(filtered);

        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    return (
        <div style={{ backgroundColor: "#f6f1eb", minHeight: "100vh" }}>

            <div
                style={{
                    position: "relative",
                    height: "60vh",
                    backgroundImage: `url(${homebg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.5)" }} />

                <div style={{ position: "relative", textAlign: "center", color: "white" }}>
                    <h1 style={{ fontWeight: "bold" }}>Welcome to Sawweq</h1>
                    <p>Your smart marketplace to buy and sell anything easily</p>
                </div>
            </div>

            <Filters
                filters={filters}
                setFilters={setFilters}
                handleSearch={handleSearch}
            />
            {hasSearched && (
                <Container className="mt-5">
                    <h2 style={{ fontWeight: "bold", color: "#5a3e2b" }}>
                        Search Results
                    </h2>

                    {loading && (
                        <div style={{ textAlign: "center" }}>
                            <Spinner />
                        </div>
                    )}

                    {!loading && results.length === 0 && (
                        <div style={{ textAlign: "center", color: "#8b6b4f" }}>
                            No items found
                        </div>
                    )}

                    {!loading && results.length > 0 && (
                        <Row className="g-4 mt-2">
                            {results.map((item) => (
                                <Col md={4} key={item._id}>
                                    <ProductCard
                                        item={item}
                                        setSelectedImages={setSelectedImages}
                                        setSelectedIndex={setSelectedIndex}
                                    />
                                </Col>
                            ))}
                        </Row>
                    )}
                </Container>
            )}

            <Container className="mt-5">

                <h2 style={{ fontWeight: "bold", color: "#5a3e2b" }}>
                    Featured for you
                </h2>

                <Row className="g-4 mt-2">

                    {products.map((item) => (

                        <Col md={4} key={item._id}>

                            <ProductCard
                                item={item}
                                setSelectedImages={setSelectedImages}
                                setSelectedIndex={setSelectedIndex}
                            />
                        </Col>

                    ))}

                </Row>
            </Container>
            <div style={{ height: "50px" }} />
            {selectedImages.length > 0 && (
                <div
                    onClick={() => {
                        setSelectedImages([]);
                        setSelectedIndex(0);
                    }}

                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,0.88)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 9999
                    }}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImages([]);
                            setSelectedIndex(0);

                        }}
                        style={{
                            position: "absolute",
                            top: "25px",
                            right: "30px",
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            border: "none",
                            background: "white",
                            fontSize: "28px",
                            fontWeight: "bold",
                            cursor: "pointer"
                        }}
                    >
                        ×
                    </button>
                    {selectedImages.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedIndex(
                                    selectedIndex === 0
                                        ? selectedImages.length - 1
                                        : selectedIndex - 1
                                );
                            }}
                            style={{
                                position: "absolute",
                                left: "30px",
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                border: "none",
                                background: "white",
                                fontSize: "32px",
                                cursor: "pointer"
                            }}
                        >
                            ‹
                        </button>
                    )}
                    <img
                        onClick={(e) => e.stopPropagation()}
                        src={selectedImages[selectedIndex]}
                        alt=""
                        style={{
                            maxWidth: "90vw",
                            maxHeight: "90vh",
                            borderRadius: "20px",
                            objectFit: "contain"
                        }}
                    />
                    {selectedImages.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedIndex(
                                    selectedIndex === selectedImages.length - 1
                                        ? 0
                                        : selectedIndex + 1
                                );
                            }}
                            style={{
                                position: "absolute",
                                right: "30px",
                                width: "60px",
                                height: "60px",
                                borderRadius: "50%",
                                border: "none",
                                background: "white",
                                fontSize: "32px",
                                cursor: "pointer"
                            }}
                        >
                            ›
                        </button>
                    )}

                </div>
            )}
        </div>
    );
};

export default Home;