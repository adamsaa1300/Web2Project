import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import {
    useNavigate,
    useLocation
} from "react-router-dom";
import ProfileHeader from "../components/profile/ProfileHeader";
import AboutCard from "../components/profile/AboutCard";
import ProductCard from "../components/card.jsx";

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

export default function PublicProfilePage() {
    const navigate = useNavigate();

    const location = useLocation();

    const from =
        location.state?.from;
    const { id } = useParams();

    const [listings, setListings] = useState([]);

    const [profileData, setProfileData] = useState({

        fullName: "",

        email: "",

        location: "",

        university: "",

        major: "",

        birthDate: "",

        bio: "Sawweq marketplace user.",

    });

    const fetchUser = async () => {

        try {

            const res = await fetch(
                `http://localhost:5000/api/users/${id}`
            );

            const data = await res.json();

            setProfileData({

                fullName: data.name || "",

                email: data.email || "",

                location: data.location || "",

                university: data.uni || "",

                major: data.faculty || "",

                birthDate: data.birthDate
                    ? data.birthDate.split("T")[0]
                    : "",

                bio: "Sawweq marketplace user.",

            });

        } catch (err) {

            console.log(err);

        }

    };

    const fetchUserProducts = async () => {

        try {

            const res = await fetch(
                `http://localhost:5000/api/products/user/${id}`
            );

            const data = await res.json();

            const productsArray =
                Array.isArray(data)
                    ? data
                    : [];

            setListings(productsArray);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        fetchUser();

        fetchUserProducts();

    }, [id]);

    const aboutItems = [

        {
            label: "Full Name",
            value: profileData.fullName
        },

        {
            label: "Email",
            value: profileData.email
        },

        {
            label: "Birth Date",
            value:
                profileData.birthDate || "Not set"
        },

        {
            label: "University",
            value: profileData.university
        },

        {
            label: "Major",
            value: profileData.major
        },

        {
            label: "Location",
            value: profileData.location
        },

    ];

    return (

        <div
            style={{
                background: colors.bg,
                minHeight: "100vh",
                color: colors.text
            }}
        >

            <div className="container-fluid py-4 px-3 px-lg-4">
                {from && (

                    <button
                        onClick={() => navigate(from)}
                        className="btn mb-4"
                        style={{
                            background: "#f2e8dc",
                            color: "#7b5647",
                            border: "1px solid #e7d9cb",
                            borderRadius: "12px",
                            fontWeight: 600,
                            padding: "8px 16px",
                        }}
                    >

                        <i className="bi bi-arrow-left me-2" />

                        Back

                    </button>

                )}
                <div className="row g-4 align-items-stretch">

                    <div className="col-lg-8 d-flex">

                        <div className="d-flex flex-column w-100">

                            <ProfileHeader
                                profileData={profileData}
                                colors={colors}
                                shellCard={shellCard}
                                isPublic={true}
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

                    <div className="row g-4">

                        {listings.map((item) => (

                            <div
                                key={item._id}
                                className="col-md-6 col-xl-4"
                            >

                                <ProductCard
                                    item={item}
                                    setSelectedImages={() => {}}
                                    setSelectedIndex={() => {}}
                                />
                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>

    );

}