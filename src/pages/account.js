import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./account.css";

const Account = () => {
  // ⛔ FIX: Hooks MUST come before any conditional returns
  const [message, setMessage] = useState("");
  const [passwordData, setPasswordData] = useState({ current: "", new: "" });
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    document.title = "My Account - Reload Interactive";
  }, []);
  // Safe: this comes AFTER all hooks
  if (!token) return <Navigate to="/" replace />;

  

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("https://api.reloadinteractive.com/account/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });

      const data = await res.json();
      setMessage(data.message || "Password updated");
    } catch (err) {
      console.error(err);
      setMessage("Error updating password.");
    }
  };

  const handleAvatarUpload = async (e) => {
    e.preventDefault();
    setMessage("");

    const formData = new FormData();
    formData.append("avatar", avatar);

    try {
      const res = await fetch("https://api.reloadinteractive.com/account/avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      setMessage(data.message || "Profile photo updated");
    } catch (err) {
      console.error(err);
      setMessage("Error uploading photo.");
    }
  };

  return (
    <div className="account-page">
      <h1>My Account</h1>

      {/* Upload Profile Photo */}
      <section className="account-section">
        <h2>Profile Photo</h2>

        <div className="avatar-preview">
          <img
            src={preview || "https://i.pravatar.cc/120"}
            alt="Avatar Preview"
          />
        </div>

        <form onSubmit={handleAvatarUpload}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setAvatar(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
            required
          />
          <button type="submit">Upload Photo</button>
        </form>
      </section>

      {/* Change Password */}
      <section className="account-section">
        <h2>Change Password</h2>

        <form onSubmit={handlePasswordChange}>
          <input
            type="password"
            placeholder="Current Password"
            value={passwordData.current}
            onChange={(e) =>
              setPasswordData({ ...passwordData, current: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="New Password"
            value={passwordData.new}
            onChange={(e) =>
              setPasswordData({ ...passwordData, new: e.target.value })
            }
            required
          />

          <button type="submit">Update Password</button>
        </form>
      </section>

      {message && <p className="account-message">{message}</p>}
    </div>
  );
};

export default Account;
