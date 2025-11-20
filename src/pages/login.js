// Copyright © 2025 Reload Interactive.
// All Rights Reserved.

import React, { useState, useEffect } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    document.title = "Reload Interactive - Login";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('https://api.reloadinteractive.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Login successful! Token: ${data.token}`);
        localStorage.setItem('token', data.token);
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'https://api.reloadinteractive.com/auth/google';
  };

  return (
    <div style={styles.background}>
      <div style={styles.card}>
        <img
          src="https://reload-interactive.s3.eu-north-1.amazonaws.com/SizedIcon.png"
          alt="Reload Interactive Logo"
          style={styles.logo}
        />
        <h1 style={styles.title}>Sign In</h1>
        <p style={styles.subtitle}>Sign In to your Reload Interactive Account</p>

        <form style={styles.form} onSubmit={handleLogin}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button style={styles.button} type="submit">Sign In</button>
        </form>

        <div style={styles.separator}>OR</div>

        <button style={styles.googleButton} onClick={handleGoogleLogin}>
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google Logo"
            style={styles.googleLogo}
          />
          Sign in with Google
        </button>

        {message && <p style={styles.message}>{message}</p>}

        <p style={styles.footer}>
          Don't have an account? <a href="/signup" style={styles.link}>Sign up</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  background: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
    fontFamily: '"Segoe UI", Roboto, sans-serif',
  },
  card: {
    background: '#1b1b1b',
    padding: '50px 40px',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    textAlign: 'center',
    width: '380px',
    color: '#fff',
  },
  logo: {
    width: '80px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#ccc',
    marginBottom: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px 15px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #444',
    background: '#2b2b2b',
    color: '#fff',
    outline: 'none',
  },
  button: {
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    background: '#00bfff',
    color: '#000',
    fontWeight: 'bold',
    transition: '0.3s',
  },
  separator: {
    margin: '20px 0',
    color: '#888',
    fontWeight: 'bold',
  },
  googleButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '12px',
    width: '100%',
    borderRadius: '6px',
    border: '1px solid #ccc',
    background: '#fff',
    color: '#000',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: '0.3s',
  },
  googleLogo: {
    width: '20px',
    height: '20px',
  },
  message: {
    marginTop: '15px',
    color: '#ff8080',
  },
  footer: {
    marginTop: '25px',
    fontSize: '0.85rem',
    color: '#ccc',
  },
  link: {
    color: '#00bfff',
    textDecoration: 'none',
  },
};

export default Login;
