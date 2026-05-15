import React from "react";

export default function ListingCard({
  item,
  colors,
  shellCard,
  onDelete,
  onMarkSold,
  onEdit,
}) {
  const status = item.status?.toLowerCase();

  const statusBg =
    status === "sold"
      ? "#d8c1af"
      : status === "unavailable"
      ? "#efe1d3"
      : "#e7efe1";

  const statusColor = status === "active" ? colors.success : colors.dark;

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
              textTransform: "capitalize",
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

          <div
            className="mb-3"
            style={{ color: colors.muted, fontSize: ".9rem" }}
          >
            {item.category}
          </div>

          <div className="d-flex gap-2 flex-wrap">
            {status !== "sold" && (
              <button
                className="btn btn-sm flex-fill"
                onClick={() => onMarkSold(item.id)}
                style={{
                  background: "#e7efe1",
                  color: "#557c55",
                  border: "1px solid #cfe2cf",
                  borderRadius: 10,
                  fontWeight: 700,
                }}
              >
                Mark Sold
              </button>
            )}

            <button
              className="btn btn-sm flex-fill"
              onClick={() => onEdit(item)}
              style={{
                background: "#efe7db",
                color: "#8a6240",
                border: "1px solid #e4d4c2",
                borderRadius: 10,
                fontWeight: 700,
              }}
            >
              Edit
            </button>

            <button
              className="btn btn-sm flex-fill"
              onClick={() => onDelete(item.id)}
              style={{
                background: "#fff",
                color: "#b23b3b",
                border: "1px solid #e8c5c5",
                borderRadius: 10,
                fontWeight: 700,
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