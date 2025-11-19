import logo from './logo.svg';
import './App.css';
import About from './pages/about';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<About />}/>
      </Routes>
    </Router>
  );
}

export default App;
