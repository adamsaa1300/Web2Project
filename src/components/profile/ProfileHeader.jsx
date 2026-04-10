import React from "react";

function StatItem({ value, label, colors }) {
  return (
    <div className="text-center text-md-start">
      <div
        style={{
          color: colors.dark,
          fontWeight: 800,
          fontSize: "1.75rem",
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      <div style={{ color: colors.muted, fontSize: ".95rem" }}>{label}</div>
    </div>
  );
}

export default function ProfileHeader({
  profileData,
  stats,
  colors,
  shellCard,
}) {
  return (
    <div style={{ ...shellCard, overflow: "hidden" }}>
      <div style={{ position: "relative", height: 120 }}>
        <img
          src={profileData.cover}
          alt="cover"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div className="p-4 pt-0">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
          <div
            className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3"
            style={{ marginTop: -38 }}
          >
            <img
              src={profileData.avatar}
              alt={profileData.fullName}
              style={{
                width: 95,
                height: 95,
                objectFit: "cover",
                borderRadius: "50%",
                border: "4px solid #fff",
                boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
              }}
            />

            <div style={{ marginTop: 38 }}>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <h3 className="mb-0 fw-bold" style={{ color: colors.text }}>
                  {profileData.fullName}
                </h3>
                <i
                  className="bi bi-patch-check-fill"
                  style={{ color: colors.primary }}
                />
              </div>

              <div
                className="d-flex align-items-center gap-2 flex-wrap mt-1"
                style={{ color: colors.muted, fontSize: ".92rem" }}
              >
                <span>{profileData.username}</span>
                <span>•</span>
                <span>{profileData.joined}</span>
              </div>

              <p
                className="mb-0 mt-2"
                style={{ color: colors.text, maxWidth: 520 }}
              >
                {profileData.bio}
              </p>

              <div className="d-flex gap-2 flex-wrap mt-2">
                <span
                  className="badge rounded-pill"
                  style={{ background: colors.soft2, color: colors.dark }}
                >
                  Mechanical Eng.
                </span>
                <span
                  className="badge rounded-pill"
                  style={{ background: colors.soft2, color: colors.dark }}
                >
                  4th Year
                </span>
              </div>
            </div>
          </div>

          <button
            className="btn mt-md-4"
            style={{
              background: colors.soft2,
              color: colors.primary,
              border: `1px solid ${colors.border}`,
              borderRadius: 14,
              fontWeight: 500,
              padding: "9px 10px",
            }}
          >
            <i className="bi bi-pencil-square me-2" />
            Edit Profile
          </button>
        </div>

        <div className="row row-cols-2 row-cols-md-5 g-3 mt-2">
          {stats.map((item) => (
            <div key={item.label} className="col">
              <StatItem
                value={item.value}
                label={item.label}
                colors={colors}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}