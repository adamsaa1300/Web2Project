import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import ProfileHeader from "../components/profile/ProfileHeader";
import ListingsSection from "../components/profile/ListingsSection";
import AboutCard from "../components/profile/AboutCard";
import StatsOverview from "../components/profile/StatsOverview";
import FeedbackCard from "../components/profile/FeedbackCard";

const profileData = {
  fullName: "Sara Ahmad",
  username: "@sara_ah",
  joined: "Joined January 2024",
  bio: "Engineering student. Selling useful items and keeping track of marketplace activity.",
  university: "State University",
  major: "Mechanical Engineering",
  year: "4th Year",
  location: "Amman, Jordan",
  email: "sara@example.com",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
  cover:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
};

const listings = [
  {
    title: "Noise-Cancelling Headphones",
    category: "Electronics",
    price: "$95",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Dorm Mini Fridge",
    category: "Home & Living",
    price: "$100",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Thermodynamics Textbook",
    category: "Books",
    price: "$40",
    status: "Sold",
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Mechanical Keyboard",
    category: "Electronics",
    price: "$60",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Desk Lamp",
    category: "Electronics",
    price: "$25",
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Printer",
    category: "Electronics",
    price: "$80",
    status: "Unavailable",
    image:
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=800&q=80",
  },
];

const stats = [
  { label: "Listings", value: 16 },
  { label: "Sold", value: 112 },
  { label: "Rating", value: "4.8 ★" },
  { label: "Followers", value: 205 },
  { label: "Following", value: 180 },
];

const aboutItems = [
  { label: "Full Name", value: profileData.fullName },
  { label: "Email", value: profileData.email },
  { label: "University", value: profileData.university },
  { label: "Major", value: profileData.major },
  { label: "Year", value: profileData.year },
  { label: "Location", value: profileData.location },
];

const overviewItems = [
  { label: "Total Listings", value: "16", icon: "bi-grid" },
  { label: "Items Sold", value: "112", icon: "bi-check-circle" },
  { label: "Total Earned", value: "$2,750", icon: "bi-cash-stack" },
  { label: "Member Since", value: "Jan 2024", icon: "bi-calendar3" },
];

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