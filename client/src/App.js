import React, { useState, useEffect } from 'react';
import './style.scss';
import { MeshGradientRenderer } from '@johnn-e/react-mesh-gradient';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/Header';
import SpotifyWebApi from 'spotify-web-api-js';
import Wail from './pages/Wail';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authenticateUser } from './auth/Auth';
import Register from './pages/Register';

const spotifyApi = new SpotifyWebApi();

const Layout = ({ loggedIn }) => {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {loggedIn ? <Navigate to="/wail" /> : <Home />}
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wail" element={<Wail />} />
      </Routes>
    </>
  );
};

function App() {
  const [spotifyToken, setSpotifyToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    authenticateUser(setSpotifyToken, setLoggedIn);
  }, []);

  return (
    <div className="app">
      <div className="container">
        <MeshGradientRenderer
          className="gradient"
          colors={['#000000', '#0000ff', '#000000', '#e62e00', '#000000']}
        />
        <Router>
          <Layout loggedIn={loggedIn} />
        </Router>
      </div>
    </div>
  );
}

export default App;
