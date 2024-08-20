import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';

function App() {

  const [isLogin, setIsLogin] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={ isLogin? <Home isLogin={isLogin} /> : <Login/>} />
        <Route path="/pages/Login" element={<Login />} />
        <Route path="/pages/Home" element={<Home isLogin={isLogin}/>} />
        <Route path="/pages/Profile" element={<Profile/>} />
      </Routes>
    </Router>
  );
}

export default App;

