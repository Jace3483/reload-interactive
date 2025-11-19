import React, { useEffect } from 'react';


const Landing = () => {
  
    useEffect(() => {
        document.title = "Reload Interactive";
    }, []);
  
    return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Reload Interactive</h1>
      <p style={styles.subtitle}>Your digital experience starts here.</p>

      <button style={styles.button} onClick={() => alert("Get Started!")}>
        Get Started
      </button>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#111",
    color: "#fff",
    textAlign: "center",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  subtitle: {
    fontSize: "1.25rem",
    marginBottom: "2rem",
    opacity: 0.8,
  },
  button: {
    padding: "12px 24px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#00bfff",
    color: "#000",
    fontWeight: "bold",
  },
};

export default Landing;
