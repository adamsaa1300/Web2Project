import React from "react";
export default function ProfileHeader({
                                          profileData,
                                          colors,
                                          shellCard,
                                          onEdit,
                                          isPublic,
                                      }){

    return (
        <div
            style={{
                ...shellCard,
                overflow: "hidden",
                height: "100%",
            }}
        >

            <div
                style={{
                    position: "relative",
                    height: 110,
                    background:
                        "linear-gradient(135deg, #d8c1af 0%, #f2e8dc 100%)",
                }}
            />

            <div className="p-4 pt-0">

                <div className="d-flex flex-column flex-md-row align-items-start gap-5">

                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            width: 95,
                            height: 95,
                            borderRadius: "50%",
                            background: colors.soft2,
                            border: "4px solid #fff",
                            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                            marginTop: 0,
                            flexShrink: 0,
                        }}
                    >
                        <i
                            className="bi bi-person-fill"
                            style={{
                                fontSize: "2.7rem",
                                color: colors.primary,
                            }}
                        />
                    </div>

                    <div className="flex-grow-1 pt-md-3">

                        <div className="d-flex justify-content-between align-items-start flex-wrap gap-3">

                            <div>

                                <h2
                                    className="fw-bold mb-2"
                                    style={{
                                        color: colors.text,
                                    }}
                                >
                                    {profileData.fullName}
                                </h2>

                                <div
                                    className="d-flex flex-column gap-3"
                                    style={{
                                        color: colors.muted,
                                        fontSize: ".97rem",
                                    }}
                                >

                                    <div className="d-flex align-items-center gap-2 flex-wrap">
                                        <i className="bi bi-envelope-fill" />
                                        <span>{profileData.email}</span>
                                    </div>

                                    <div className="d-flex align-items-center gap-2 flex-wrap">
                                        <i className="bi bi-geo-alt-fill" />
                                        <span>{profileData.location}</span>
                                    </div>

                                    <div className="d-flex align-items-center gap-2 flex-wrap">
                                        <i className="bi bi-building" />
                                        <span>{profileData.university}</span>
                                    </div>

                                    <div className="d-flex align-items-center gap-2 flex-wrap">
                                        <i className="bi bi-mortarboard-fill" />
                                        <span>{profileData.major}</span>
                                    </div>

                                </div>

                            </div>
                            {!isPublic && (
                            <button
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "#e6d3b3"
                                }}

                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = "#d2b48c"
                                }}
                                onClick={onEdit}
                                className="btn"
                                style={{
                                    background: colors.soft2,
                                    color: colors.primary,
                                    border: `1px solid ${colors.border}`,
                                    borderRadius: 12,
                                    fontWeight: 600,
                                    padding: "9px 16px",
                                }}
                            >
                                <i className="bi bi-pencil-square me-2" />
                                Edit Profile
                            </button>
                            )}
                        </div>



                    </div>

                </div>

            </div>

        </div>
    );
}