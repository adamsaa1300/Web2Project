import React from "react";
import ListingCard from "./ListingCard";

export default function ListingsSection({ listings, colors, shellCard }) {
  return (
    <div style={shellCard} className="p-3 p-lg-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
        <h4 className="mb-0 fw-bold" style={{ color: colors.text }}>
          My Listings
        </h4>

        <button
          className="btn"
          style={{
            background: colors.primary,
            color: "#fff",
            borderRadius: 10,
            fontWeight: 700,
            padding: "8px 14px",
          }}
        >
          + New Listing
        </button>
      </div>

      <div className="d-flex gap-2 flex-wrap mb-4">
        {["All (16)", "Active (7)", "Sold (8)", "Unavailable (1)"].map(
          (tab, index) => (
            <button
              key={tab}
              className="btn btn-sm"
              style={{
                background: index === 0 ? colors.soft2 : "#fff",
                color: index === 0 ? colors.primary : colors.muted,
                border: `1px solid ${colors.border}`,
                borderRadius: 999,
                fontWeight: 600,
                padding: "6px 12px",
              }}
            >
              {tab}
            </button>
          )
        )}
      </div>

    {listings.length === 0 ? (
  <div
    className="text-center py-5"
    style={{ color: colors.muted }}
  >
    <h5 className="fw-bold mb-2">No listings yet</h5>

    <p className="mb-0">
      Start selling by adding your first listing.
    </p>
  </div>
) : (
  <div className="row g-3">
    {listings.map((item) => (
      <ListingCard
        key={item.title}
        item={item}
        colors={colors}
        shellCard={shellCard}
      />
    ))}
  </div>
)}
    </div>
  );
}

