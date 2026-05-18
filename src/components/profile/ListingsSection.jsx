import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingCard from "./ListingCard";

export default function ListingsSection({
                                            listings,
                                            colors,
                                            shellCard,
                                            onDelete,
                                            onEdit,
                                            onStatusChange,
                                        }){
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("All");


  const tabs = [
    { label: `All (${listings.length})`, value: "All" },
  ];

  const filteredListings =
    selectedTab === "All"
      ? listings
      : listings.filter(
          (item) =>
            item.status?.toLowerCase() === selectedTab.toLowerCase()
        );

  return (
    <div style={shellCard} className="p-3 p-lg-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
        <h4 className="mb-0 fw-bold" style={{ color: colors.text }}>
          My Listings
        </h4>

        <button
          onClick={() => navigate("/add-ad")}
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
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setSelectedTab(tab.value)}
            className="btn btn-sm"
            style={{
              background:
                selectedTab === tab.value ? colors.soft2 : "#fff",
              color:
                selectedTab === tab.value
                  ? colors.primary
                  : colors.muted,
              border: `1px solid ${colors.border}`,
              borderRadius: 999,
              fontWeight: 600,
              padding: "6px 12px",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filteredListings.length === 0 ? (
        <div className="text-center py-5" style={{ color: colors.muted }}>
          <h5 className="fw-bold mb-2">No listings yet</h5>
          <p className="mb-0">
            Start selling by adding your first listing.
          </p>
        </div>
      ) : (
        <div className="row g-3">
          {filteredListings.map((item) => (
              <ListingCard
                  key={item.id}
                  item={item}
                  colors={colors}
                  shellCard={shellCard}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onStatusChange={onStatusChange}
              />
          ))}
        </div>
      )}
    </div>
  );
}