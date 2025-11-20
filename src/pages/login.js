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
      const res = await fetch('https://qqi49zh942.execute-api.eu-north-1.amazonaws.com/dev/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ action: 'login', email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Login successful! Token: ${data.token}`);
        // You can save the token to localStorage/sessionStorage here:
        // localStorage.setItem('token', data.token);
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <img
        src="https://reload-interactive.s3.eu-north-1.amazonaws.com/SizedIcon.png"
        alt="Reload Interactive Logo"
        style={styles.logo}
      />
      <h1 style={styles.title}>Login</h1>

      <form style={styles.form} onSubmit={handleLogin}>
        <input
          style={styles.input}
          type="email"
          placeholder="Email"
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
        <button style={styles.button} type="submit">Login</button>
      </form>

      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#111',
    color: '#fff',
    textAlign: 'center',
  },
  logo: {
    width: '150px',
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  input: {
    padding: '10px 15px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #333',
    width: '250px',
    outline: 'none',
  },
  button: {
    padding: '12px 24px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    background: '#00bfff',
    color: '#000',
    fontWeight: 'bold',
  },
  message: {
    marginTop: '1rem',
    color: '#ff8080',
  },
};

export default Login;
