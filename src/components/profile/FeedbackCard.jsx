import React from "react";
import RightCard from "./RightCard";

export default function FeedbackCard({
  feedback,
  colors,
  shellCard,
}) {
  return (
    <RightCard title="Feedback Received" colors={colors} shellCard={shellCard}>
      <div className="d-flex flex-column gap-3">
        {feedback.map((item) => (
          <div key={item.name} className="d-flex gap-3">
            <div
              className="d-flex align-items-center justify-content-center flex-shrink-0"
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background: colors.soft,
                color: colors.primary,
                fontWeight: 700,
              }}
            >
              {item.name.charAt(0)}
            </div>

            <div>
              <div
                className="fw-bold"
                style={{ color: colors.text, fontSize: ".95rem" }}
              >
                {item.name}
              </div>
              <div style={{ color: "#d2a84d", fontSize: ".9rem" }}>
                {item.rating}
              </div>
              <div style={{ color: colors.muted, fontSize: ".9rem" }}>
                {item.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </RightCard>
  );
}