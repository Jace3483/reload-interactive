import './App.css';
import Landing from './pages/landing';
import About from './pages/about';
import NoPage from './pages/nopage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />

        {/* Show NoPage for any invalid url */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}

export default App;
