import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  // ⛔ FIX: Hooks must come before ANY conditional return
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");

  // Now the redirect is safe
  if (!token) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const ri_id = localStorage.getItem("ri_id");

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <p>{ri_id}</p>
      <aside className="sidebar">
        <div className="sidebar-logo">🎮</div>
        <nav className="sidebar-nav">
          <button className="nav-btn active">🏠</button>
          <button className="nav-btn">🎲</button>
          <button className="nav-btn">⭐</button>
          <button className="nav-btn">⚙️</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main">
        {/* Top Bar */}
        <header className="topbar">
          <input type="text" className="search" placeholder="Search..." />

          <div className="top-icons">
            <button>🔔</button>
            <button>💬</button>

            {/* Profile Dropdown */}
            <div className="profile-menu" style={{ position: "relative" }}>
              <img
                src="https://i.pravatar.cc/40"
                alt="User"
                className="avatar"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{ cursor: "pointer" }}
              />

              {menuOpen && (
                <div
                  className="dropdown"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50px",
                    background: "#1b1b1b",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
                    zIndex: 20,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() => (window.location.href = "/account")}
                    style={{
                      background: "none",
                      border: "none",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "0.95rem",
                    }}
                  >
                    My Account
                  </button>

                  <button
                    onClick={handleLogout}
                    style={{
                      background: "none",
                      border: "none",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "0.95rem",
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Hero Game Banner */}
        <section className="hero-card">
          <img
            className="hero-img"
            src="https://wallpaperaccess.com/full/5055637.jpg"
            alt="Spider-Man"
          />
          <div className="hero-info">
            <span className="tag">NEW</span>
            <h1>Marvel’s Spider-Man: Miles Morales</h1>
            <p>£69.99</p>
            <button className="purchase-btn">Purchase</button>
          </div>
        </section>

        {/* Most Played Games */}
        <section>
          <h2 className="section-title">Most Played Games</h2>
          <div className="game-row">
            <div className="game-card">
              <img src="https://i.imgur.com/3ZQ3ZzM.jpeg" alt="Ghost of Tsushima" />
              <p>Ghost of Tsushima</p>
              <span>112 hrs</span>
            </div>

            <div className="game-card">
              <img src="https://i.imgur.com/5TNLp0k.jpeg" alt="Horizon Zero Dawn" />
              <p>Horizon Zero Dawn</p>
              <span>68 hrs</span>
            </div>

            <div className="game-card">
              <img src="https://i.imgur.com/RTM4FfC.jpeg" alt="Ratchet & Clank" />
              <p>Ratchet & Clank</p>
              <span>35 hrs</span>
            </div>
          </div>
        </section>

        {/* Bottom Row */}
        <div className="bottom-row">
          {/* Accessories */}
          <div className="accessories-card">
            <h2>Accessories</h2>
            <img
              src="https://i.imgur.com/5WsxnT8.png"
              alt="Headset"
              className="accessory-img"
            />
          </div>

          {/* Library */}
          <div className="library-card">
            <h2>Library</h2>
            <div className="library-item">
              <div>
                <strong>Cyberpunk 2077</strong>
                <p>PS5 • 12 Dec 2020</p>
              </div>
              <button className="download-btn">Download</button>
            </div>

            <div className="library-item">
              <div>
                <strong>Demon’s Souls</strong>
                <p>PS5 • 14 Nov 2020</p>
              </div>
              <button className="install-btn">Installed</button>
            </div>

            <div className="library-item">
              <div>
                <strong>Overwatch</strong>
                <p>PS4 • 20 Oct 2020</p>
              </div>
              <button className="download-btn">Download</button>
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="rightbar">
        <h2>Online</h2>

        <div className="friend">
          <img src="https://i.pravatar.cc/38?img=1" alt="" />
          <div>
            <p className="friend-name">Bagtofter</p>
            <span>Playing Rocket League</span>
          </div>
        </div>

        <div className="friend">
          <img src="https://i.pravatar.cc/38?img=2" alt="" />
          <div>
            <p className="friend-name">MrJam</p>
            <span>Near Automata</span>
          </div>
        </div>

        <div className="friend">
          <img src="https://i.pravatar.cc/38?img=3" alt="" />
          <div>
            <p className="friend-name">GhostToast</p>
            <span>Watching Netflix</span>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
