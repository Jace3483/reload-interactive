// Copyright © 2025 Reload Interactive.
// All Rights Reserved.

import './App.css';
import Landing from './pages/landing';
import About from './pages/about';
import NoPage from './pages/nopage';
import Login from './pages/login'; // <-- import your login page
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />  {/* <-- add route for login */}

        {/* Show NoPage for any invalid url */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
