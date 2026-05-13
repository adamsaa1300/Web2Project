import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Search = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        category: "",
        location: "",
        college: "",
        university: "",
        price: ""
    });
    const [hasSearched, setHasSearched] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {//redirect to log in if not logged

        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/login");
        }

    }, []);
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
        <div style={{ backgroundColor: "#f6f1eb", minHeight: "100vh", padding: "20px" }}>

            <Container
                className="shadow p-4"
                style={{
                    background: "white",
                    marginTop: "20px",
                    borderRadius: "15px",
                    paddingBottom: "40px"
                }}
            >
                <Row className="g-2">

                    <Col md={2}>
                        <Form.Select
                            value={filters.category}
                            onChange={(e) =>
                                setFilters({ ...filters, category: e.target.value })
                            }
                        >
                            <option>All Categories</option>
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

                    <Col md={2}>
                        <Form.Select
                            value={filters.location}
                            onChange={(e) =>
                                setFilters({ ...filters, location: e.target.value })
                            }
                        >
                            <option>Any Location</option>
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

                    <Col md={2}>
                        <Form.Select
                            value={filters.price}
                            onChange={(e) =>
                                setFilters({ ...filters, price: e.target.value })
                            }
                        >
                            <option value="">Price Range</option>
                            <option value="0-50">0 - 50</option>
                            <option value="50-200">50 - 200</option>
                            <option value="200-1000">200 - 1000</option>
                            <option value="1000+">1000+</option>
                        </Form.Select>
                    </Col>

                    <Col md={2}>
                        <Form.Select
                            value={filters.college}
                            onChange={(e) =>
                                setFilters({ ...filters, college: e.target.value })
                            }
                        >
                            <option>All Faculties</option>
                            <option>Medicine</option>
                            <option>Engineering</option>
                            <option>IT / Technology</option>
                            <option>Law</option>
                            <option>Business</option>
                            <option>Arts</option>
                            <option>Pharmacy</option>
                        </Form.Select>
                    </Col>

                    <Col md={3}>
                        <Form.Select
                            value={filters.university}
                            onChange={(e) =>
                                setFilters({ ...filters, university: e.target.value })
                            }
                        >
                            <option>All Universities</option>
                            <option>Palestine University</option>
                            <option>An-Najah National University</option>
                            <option>Birzeit University</option>
                            <option>Palestine Technical University (Kadoorie)</option>
                        </Form.Select>
                    </Col>

                    <Col md={1}>
                        <Button
                            onClick={handleSearch}
                            style={{
                                width: "100%",
                                backgroundColor: "#8b6b4f",
                                border: "none",
                            }}
                        >
                            Search
                        </Button>
                    </Col>

                </Row>
            </Container>

            <Container className="mt-4">

                {loading && (
                    <div style={{ textAlign: "center", marginTop: "40px" }}>
                        <Spinner />
                    </div>
                )}

                {!loading && hasSearched && results.length === 0 && (
                    <div style={{ textAlign: "center", color: "#8b6b4f", marginTop: "40px" }}>
                        No items found
                    </div>
                )}

                {!loading && results.length > 0 && (
                    <Row className="g-4 mt-2">
                        {results.map((item) => (
                            <Col md={4} key={item._id}>
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
                                        id={`carousel-featured-${item._id}`}
                                        className="carousel slide"
                                    >

                                        <div className="carousel-inner">

                                            {Array.isArray(item.images) && item.images.map((img, index) => (

                                                <div
                                                    key={index}
                                                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                                                >

                                                    <img
                                                        src={img}
                                                        alt="product"

                                                        onClick={() =>
                                                            window.open(img, "_blank")
                                                        }

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

                                    <Card.Body className="d-flex flex-column gap-2 p-4">

                                        <div className="d-flex justify-content-between align-items-center">

                                            <Card.Title
                                                className="fw-bold mb-0"
                                                style={{
                                                    color: "#5a3e2b",
                                                    fontSize: "20px"
                                                }}
                                            >
                                                {item.title}
                                            </Card.Title>

                                            <span
                                                className="px-3 py-1 fw-semibold"
                                                style={{
                                                    backgroundColor: "#f5e7d0",
                                                    borderRadius: "999px",
                                                    fontSize: "12px",
                                                    color: "#5a3e2b"
                                                }}
                                            >
                {item.category}
            </span>

                                        </div>

                                        <Card.Text
                                            className="text-muted"
                                            style={{
                                                fontSize: "14px",
                                                minHeight: "55px"
                                            }}
                                        >
                                            {item.description}
                                        </Card.Text>

                                        <div
                                            className="d-flex flex-column gap-1"
                                            style={{
                                                fontSize: "14px",
                                                color: "#777"
                                            }}
                                        >

                                            <div>📍 {item.location}</div>

                                            <div>🎓 {item.university}</div>

                                            <div>🏛️ {item.college}</div>

                                            <div>📦 {item.condition}</div>

                                        </div>

                                        <div className="d-flex justify-content-between align-items-center mt-2">

                                            <h4
                                                className="fw-bold mb-0"
                                                style={{
                                                    color: "#5a3e2b"
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

                                            className="mt-3 border-0 fw-semibold"

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
                            </Col>
                        ))}
                    </Row>
                )}

            </Container>

        </div>
    );
};

export default Search;