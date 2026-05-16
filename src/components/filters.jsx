import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Filters = ({
                        filters,
                        setFilters,
                        handleSearch
                    }) => {
    return (
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
    );
};

export default Filters;