import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import WailLogo from '../images/WAIL-icon.png';
import { logoutUser } from '../auth/Auth';

const Header = ({ loggedIn, setSpotifyToken, setLoggedIn }) => {
  const location = useLocation();

  const handleLogout = () => {
    logoutUser(setSpotifyToken, setLoggedIn);
  };

  const showButtons = !loggedIn && (location.pathname === '/login' || location.pathname === '/register');

  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={WailLogo} alt="" />
      </Link>
      <nav>
        <ul className="nav__links">
          {showButtons ? null : loggedIn ? (
            <Link className="link" onClick={handleLogout} to="/">
              Çıkış Yap
            </Link>
          ) : (
            <Link className="link" to="/login">
              Giriş Yap
            </Link>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
