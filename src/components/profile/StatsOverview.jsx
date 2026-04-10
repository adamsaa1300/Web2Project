import React from "react";
import RightCard from "./RightCard";

export default function StatsOverview({
  overviewItems,
  colors,
  shellCard,
}) {
  return (
    <RightCard title="Stats Overview" colors={colors} shellCard={shellCard}>
      <div className="d-flex flex-column gap-3">
        {overviewItems.map((item) => (
          <div
            key={item.label}
            className="d-flex align-items-center justify-content-between gap-3"
          >
            <div className="d-flex align-items-center gap-2">
              <span
                className="d-inline-flex align-items-center justify-content-center"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: colors.soft2,
                  color: colors.primary,
                }}
              >
                <i className={item.icon} />
              </span>

              <span style={{ color: colors.text, fontSize: ".95rem" }}>
                {item.label}
              </span>
            </div>

            <span style={{ color: colors.dark, fontWeight: 700 }}>
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </RightCard>
  );
}