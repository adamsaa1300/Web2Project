import React from "react";
import {
    FaMapMarkerAlt,
    FaUniversity,
    FaBuilding,
    FaBoxOpen
} from "react-icons/fa";
export default function ListingCard({
                                        item,
                                        colors,
                                        shellCard,
                                        onDelete,
                                        onEdit,
                                        onStatusChange,
                                    }){

    const status = item.status?.toLowerCase();

    const statusBg =
        status === "sold"
            ? "#d8c1af"
            : status === "unavailable"
                ? "#efe1d3"
                : "#e7efe1";

    const statusColor =
        status === "active"
            ? colors.success
            : colors.dark;

    return (

        <div className="col-md-6 col-xl-4">

            <div
                style={{
                    ...shellCard,
                    overflow: "hidden",
                    transition: "0.3s ease",
                    cursor: "pointer",
                    height: "100%",
                }}

                onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                        "translateY(-8px)";
                }}

                onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                        "translateY(0px)";
                }}
            >

                <div style={{ position: "relative" }}>

                    <img
                        src={item.image}
                        alt={item.title}
                        style={{
                            width: "100%",
                            height: 240,
                            objectFit: "cover",
                        }}
                    />

                    <span
                        style={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            background: "#f5e7d0",
                            color: "#5a3e2b",
                            padding: "6px 12px",
                            borderRadius: "999px",
                            fontSize: "12px",
                            fontWeight: 600,
                        }}
                    >
                        {item.category}
                    </span>

                    <select
                        value={item.status || "available"}

                        onChange={(e) =>
                            onStatusChange(item.id, e.target.value)
                        }

                        style={{
                            position: "absolute",
                            top: 12,
                            left: 12,

                            borderRadius: "999px",

                            padding: "8px 14px",

                            fontSize: ".82rem",

                            fontWeight: 700,

                            border: "none",

                            outline: "none",

                            cursor: "pointer",

                            appearance: "none",

                            backgroundColor:
                                item.status === "sold"
                                    ? "#f4d7d3"
                                    : "#e7efe1",

                            color:
                                item.status === "sold"
                                    ? "#8b2e2e"
                                    : "#557c55",

                            boxShadow:
                                "0 2px 8px rgba(0,0,0,0.08)",
                        }}
                    >

                        <option value="available">
                            Available
                        </option>

                        <option value="sold">
                            Sold
                        </option>

                    </select>

                </div>

                <div className="p-4 d-flex flex-column gap-3 h-100">

                    <h5
                        className="fw-bold text-center mb-1"
                        style={{
                            color: "#2f1e12",
                            fontSize: "22px",
                        }}
                    >
                        {item.title}
                    </h5>

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

                    <div className="d-flex justify-content-between align-items-center">

                        <h4
                            className="fw-bold mb-0"
                            style={{
                                color: "#2f1e12"
                            }}
                        >
                            {item.price}
                        </h4>

                    </div>

                    <div className="d-flex gap-2 mt-2">

                        <button
                            onClick={() => onEdit(item)}
                            className="btn flex-fill fw-semibold"
                            style={{
                                backgroundColor: "#e8d8c7",
                                color: "#5a3e2b",
                                borderRadius: "14px",
                                padding: "12px",
                                border: "none",
                            }}
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => onDelete(item.id)}
                            className="btn flex-fill fw-semibold"
                            style={{
                                backgroundColor: "#f4d7d3",
                                color: "#8b2e2e",
                                borderRadius: "14px",
                                padding: "12px",
                                border: "none",
                            }}
                        >
                            Delete
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
}