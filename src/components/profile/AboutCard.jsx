import React from "react";
import RightCard from "./RightCard";

export default function AboutCard({
  aboutItems,
  colors,
  shellCard,
}) {
  return (
    <RightCard title="About Me" colors={colors} shellCard={shellCard}>
      <div className="d-flex flex-column gap-3">
        {aboutItems.map((item) => (
          <div
            key={item.label}
            className="d-flex justify-content-between gap-3"
            style={{
              borderBottom: `1px solid ${colors.border}`,
              paddingBottom: 10,
            }}
          >
            <span style={{ color: colors.muted, fontSize: ".92rem" }}>
              {item.label}
            </span>
            <span
              className="text-end"
              style={{
                color: colors.text,
                fontWeight: 500,
                fontSize: ".92rem",
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </RightCard>
  );
}