import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DefaultLayout from '../layouts/DefaultLayout'
import MainContent from '../components/MainContent'
import "./Profile.css"; // optional styling

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔹 Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null; // prevent render until redirect happens

  return (
    <DefaultLayout>
      <div className="profile-wrapper">
        <h1 className="text-3xl font-bold p-4">{user.username}'s Profile</h1>
        <img
          src={user.photo}
          alt="Profile"
          className="profile-photo"
        />
      </div>
    </DefaultLayout>
  );
}

export default Profile
