import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import ProfileHeader from "../components/profile/ProfileHeader";
import ListingsSection from "../components/profile/ListingsSection";
import AboutCard from "../components/profile/AboutCard";
import StatsOverview from "../components/profile/StatsOverview";
import FeedbackCard from "../components/profile/FeedbackCard";

const getCurrentUser = () => {
  try {
    return JSON.parse(sessionStorage.getItem("user")) || {};
  } catch {
    return {};
  }
};

const feedback = [
  {
    name: "Lina M.",
    text: "Great seller, very friendly and easy to communicate with.",
    rating: "★★★★★",
  },
  {
    name: "Omar T.",
    text: "Item matched the description and delivery was quick.",
    rating: "★★★★★",
  },
];

const colors = {
  bg: "#f6efe7",
  panel: "#ffffff",
  soft: "#e2d1bf",
  soft2: "#f2e8dc",
  primary: "#7b5647",
  dark: "#5f4034",
  border: "#e7d9cb",
  text: "#4e352b",
  muted: "#8d6f61",
  success: "#7fa36b",
};

const shellCard = {
  background: colors.panel,
  border: `1px solid ${colors.border}`,
  borderRadius: "18px",
  boxShadow: "0 8px 24px rgba(95, 64, 52, 0.06)",
};

export default function ProfilePage() {
  const currentUser = getCurrentUser();
  const [listings, setListings] = useState([]);

  const profileData = {
    fullName: currentUser?.name || "User",
    username: currentUser?.email || "@user",
    joined: currentUser?.createdAt
      ? `Member since ${new Date(currentUser.createdAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}`
      : "Member",
    bio: "Sawweq marketplace user.",
    university: currentUser?.uni || "University",
    major: currentUser?.faculty || "Faculty",
    year: "Student",
    location: currentUser?.location || "Location",
    email: currentUser?.email || "email@sawweq.com",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
    cover:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  };

  const aboutItems = [
    { label: "Full Name", value: profileData.fullName },
    { label: "Email", value: profileData.email },
    { label: "University", value: profileData.university },
    { label: "Major", value: profileData.major },
    { label: "Year", value: profileData.year },
    { label: "Location", value: profileData.location },
  ];

  useEffect(() => {
    if (!currentUser?.email) return;

    fetch(`http://localhost:5000/api/ads/user/${currentUser.email}`)
      .then((res) => res.json())
      .then((data) => {
        const formattedAds = data.map((ad) => ({
          title: ad.title,
          category: ad.category,
          price: `$${ad.price}`,
          status: ad.status,
          image:
            ad.images && ad.images.length > 0
              ? `http://localhost:5000/${ad.images[0]}`
              : "https://via.placeholder.com/300",
        }));

        setListings(formattedAds);
      })
      .catch((err) => console.error(err));
  }, [currentUser?.email]);

  const stats = [
    { label: "Listings", value: listings.length },
    { label: "Sold", value: 112 },
    { label: "Rating", value: "4.8 ★" },
    { label: "Followers", value: 205 },
    { label: "Following", value: 180 },
  ];

  const overviewItems = [
    { label: "Total Listings", value: listings.length, icon: "bi-grid" },
    { label: "Items Sold", value: "112", icon: "bi-check-circle" },
    { label: "Total Earned", value: "$2,750", icon: "bi-cash-stack" },
    { label: "Member Since", value: profileData.joined, icon: "bi-calendar3" },
  ];

  return (
    <div style={{ background: colors.bg, minHeight: "100vh", color: colors.text }}>
      <div className="container-fluid py-4 px-3 px-lg-4">
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-4">
              <ProfileHeader
                profileData={profileData}
                stats={stats}
                colors={colors}
                shellCard={shellCard}
              />

              <ListingsSection
                listings={listings}
                colors={colors}
                shellCard={shellCard}
              />
            </div>
          </div>

          <div className="col-lg-4">
            <div className="d-flex flex-column gap-4">
              <AboutCard
                aboutItems={aboutItems}
                colors={colors}
                shellCard={shellCard}
              />

              <StatsOverview
                overviewItems={overviewItems}
                colors={colors}
                shellCard={shellCard}
              />

              <FeedbackCard
                feedback={feedback}
                colors={colors}
                shellCard={shellCard}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}