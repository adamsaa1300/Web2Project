import React from "react";

export default function RightCard({ title, children, colors, shellCard }) {
  return (
    <div className="p-3 p-lg-4" style={shellCard}>
      <div
        className="fw-bold mb-3"
        style={{ color: colors.text, fontSize: "1.2rem" }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}