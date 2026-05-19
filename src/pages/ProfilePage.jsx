import React, { useEffect, useState } from "react";
import {useNavigate, useLocation} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import EditProfileModal from "../../src/components/profile/editprofile.jsx";
import ProfileHeader from "../components/profile/ProfileHeader";
import ListingsSection from "../components/profile/ListingsSection";
import AboutCard from "../components/profile/AboutCard";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import EditListingModal from "../pages/EditAd.jsx";
const getCurrentUser = () => {
  try {
    return JSON.parse(sessionStorage.getItem("user")) || {};
  } catch {
    return {};
  }
};


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

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {

    const token =
        sessionStorage.getItem("token");

    if (!token) {

      navigate("/login");

    }

  }, []);
  const currentUser = getCurrentUser();
  console.log("CURRENT USER:", currentUser);
  const [listings, setListings] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  useEffect(() => {

    if (
        location.state?.openCompleteProfile
    ) {

      setShowEdit(true);

    }

  }, [location]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);
  const [showListingEdit, setShowListingEdit] = useState(false);
  const fetchUserProducts = async () => {

    try {

      const res = await fetch(
          `http://localhost:5000/api/products/user/${currentUser.id}`
      );

      const data = await res.json();

      const productsArray = Array.isArray(data)
          ? data
          : [];

      const formattedAds = productsArray.map((ad) => ({
  id: ad._id,
  title: ad.title,
  description: ad.description,
  category: ad.category,
  location: ad.location || "Unknown Location",
  university: ad.university || "Unknown University",
  college: ad.college || "Unknown College",
  condition: ad.condition || "Unknown Condition",
  price: `₪${ad.price}`,
  status: ad.status?.toLowerCase() || "available",

  images: ad.images || [],

  image:
    ad.images && ad.images.length > 0
      ? ad.images[0]
      : "https://via.placeholder.com/300",
}));
      setListings(formattedAds);

    } catch (err) {

      console.error(err);

    }

  };
  const [selectedListing, setSelectedListing] = useState(null);
  const [profileData, setProfileData] = useState({
    id: currentUser?.id,
    fullName: currentUser?.name || "User",
    username: currentUser?.email || "@user",
    birthDate: currentUser?.birthDate
        ? currentUser.birthDate.split("T")[0]
        : "",
    joined: currentUser?.createdAt
      ? `Member since ${new Date(currentUser.createdAt).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}`
      : "Member",
    bio: currentUser?.bio || "Sawweq marketplace user.",
    university: currentUser?.uni || "University",
    major: currentUser?.faculty || "Faculty",
    year: "Student",
    location: currentUser?.location || "Location",
    email: currentUser?.email || "email@sawweq.com",
    avatar: currentUser?.profileImage || "",
    cover:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
  });

  const aboutItems = [
    { label: "Full Name", value: profileData.fullName },
    { label: "Email", value: profileData.email },
    {label: "Birth Date", value: profileData.birthDate || "Not set",},
    { label: "University", value: profileData.university },
    { label: "Major", value: profileData.major },
    { label: "Location", value: profileData.location },
  ];

  useEffect(() => {

    if (!currentUser?.email) return;

    fetchUserProducts();

  }, [currentUser?.email]);

  const handleDelete = (id) => {

    setListingToDelete(id);

    setShowDeleteModal(true);

  };
  
  const confirmDelete = async () => {

    try {

      await axios.delete(

          `http://localhost:5000/api/products/${listingToDelete}`,

          {
            headers: {
              Authorization:
                  `Bearer ${sessionStorage.getItem("token")}`
            }
          }

      );

      fetchUserProducts();

      setShowDeleteModal(false);

    } catch (err) {

      console.log(err);

    }

  };
  const handleStatusChange = async (id, newStatus) => {
  try {
    await axios.put(
      `http://localhost:5000/api/products/${id}`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    setListings((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: newStatus.toLowerCase() }
          : item
      )
    );

  } catch (err) {
    console.log(err);
  }
};
async function handleMarkSold(id) {
  try {
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        status: "sold",
      }),
    });

    setListings((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "sold" }
          : item
      )
    );
  } catch (err) {
    console.error(err);
  }
}
  const handleEdit = (item) => {

    setSelectedListing(item);

    setShowListingEdit(true);

  };

  return (
    <div style={{ background: colors.bg, minHeight: "100vh", color: colors.text }}>
      <div className="container-fluid py-4 px-3 px-lg-4">
        <div className="row g-4 align-items-stretch">
          <div className="col-lg-8 d-flex">
            <div className="d-flex flex-column w-100">
              <ProfileHeader
                profileData={profileData}
                colors={colors}
                shellCard={shellCard}
                onEdit={() => setShowEdit(true)}
              />

            </div>
          </div>

          <div className="col-lg-4 d-flex">
            <div className="d-flex flex-column w-100">
              <AboutCard
                aboutItems={aboutItems}
                colors={colors}
                shellCard={shellCard}
              />


            </div>
          </div>

          <ListingsSection
              listings={listings}
              colors={colors}
              shellCard={shellCard}
              onDelete={handleDelete}
              onMarkSold={handleMarkSold}
              onStatusChange={handleStatusChange}
              onEdit={handleEdit}
          />
        </div>
      </div>
      <EditProfileModal
          show={showEdit}
          handleClose={() => setShowEdit(false)}
          user={profileData}
          setUser={setProfileData}
      />
      <EditListingModal
          show={showListingEdit}
          handleClose={() => setShowListingEdit(false)}
          listing={selectedListing}
          refreshListings={fetchUserProducts}
      />
      <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          centered
      >

        <Modal.Header closeButton>

          <Modal.Title>
            Delete Listing
          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          Are you sure you want to delete this listing?

        </Modal.Body>

        <Modal.Footer>

          <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
          >
            Cancel
          </Button>

          <Button
              onClick={confirmDelete}
              style={{
                backgroundColor: "#b23b3b",
                border: "none"
              }}
          >
            Delete
          </Button>

        </Modal.Footer>

      </Modal>
    </div>
  );
}