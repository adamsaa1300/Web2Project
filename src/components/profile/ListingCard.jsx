import React from "react";

export default function ListingCard({ item, colors, shellCard }) {
  const statusBg =
    item.status === "Sold"
      ? "#d8c1af"
      : item.status === "Unavailable"
      ? "#efe1d3"
      : "#e7efe1";

  const statusColor = item.status === "Active" ? colors.success : colors.dark;

  return (
    <div className="col-md-6 col-xl-4">
      <div style={{ ...shellCard, overflow: "hidden" }}>
        <div style={{ position: "relative" }}>
          <img
            src={item.image}
            alt={item.title}
            style={{ width: "100%", height: 170, objectFit: "cover" }}
          />

          <span
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: statusBg,
              color: statusColor,
              borderRadius: 999,
              padding: "4px 10px",
              fontSize: ".78rem",
              fontWeight: 700,
            }}
          >
            {item.status}
          </span>
        </div>

        <div className="p-3">
          <div className="d-flex justify-content-between gap-2 mb-1">
            <h6 className="mb-0 fw-bold" style={{ color: colors.text }}>
              {item.title}
            </h6>
            <span className="fw-bold" style={{ color: colors.dark }}>
              {item.price}
            </span>
          </div>

          <div style={{ color: colors.muted, fontSize: ".9rem" }}>
            {item.category}
          </div>
        </div>
      </div>
    </div>
  );
}