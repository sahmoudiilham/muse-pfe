import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import '../styles/navbar.scss';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isMenuOpen) {
        if (!event.target.closest('.hamburger-icon')) {
          setIsMenuOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);  // Fermer menu mobile si ouvert
    navigate('/login');
  };

  const handleNavLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsMenuOpen(false);
    }
  };

  

  // Liens accessibles uniquement si connecté
  const publicLinks = [];


  const protectedLinks = [
    { to: '/home', label: 'Accueil' },
    { to: '/morphologie', label: 'Morphologie' },
    { to: '/palette', label: 'Palette' },
    { to: '/vetements', label: 'Vêtements' },
    { to: '/favoris', label: 'Favoris' },
    { to: '/visage', label: 'Visage' },
    { to: '/coiffure', label: 'Coiffure' },
    { to: '/lunette', label: 'Lunettes' },
    { to: '/chat', label: 'IA Chat' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/home" onClick={handleNavLinkClick}>Muse</NavLink>
      </div>

      <div className="navbar-links-desktop">
        {publicLinks.map(link => (
          <NavLink key={link.to} to={link.to} onClick={handleNavLinkClick}>
            {link.label}
          </NavLink>
        ))}

        {isAuthenticated && protectedLinks.map(link => (
          <NavLink key={link.to} to={link.to} onClick={handleNavLinkClick}>
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="navbar-auth-desktop">
        {isAuthenticated ? (
          <>
            <NavLink to="/profile" className="profile-link" onClick={handleNavLinkClick}>
              <FaUserCircle className="profile-icon" /> {user?.name || 'Profil'}
            </NavLink>
            <button onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt /> Déconnexion
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={handleNavLinkClick}>Connexion</NavLink>
            <NavLink to="/register" onClick={handleNavLinkClick}>Inscription</NavLink>
          </>
        )}
      </div>

      {/* Hamburger menu icon for mobile */}
      <div className="hamburger-icon" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Mobile menu */}
      <div className={`navbar-mobile-menu ${isMenuOpen ? 'open' : ''}`} ref={menuRef}>
        {publicLinks.map(link => (
          <NavLink key={link.to} to={link.to} onClick={handleNavLinkClick}>
            {link.label}
          </NavLink>
        ))}

        {isAuthenticated && protectedLinks.map(link => (
          <NavLink key={link.to} to={link.to} onClick={handleNavLinkClick}>
            {link.label}
          </NavLink>
        ))}

        {isAuthenticated ? (
          <>
            <NavLink to="/profile" className="profile-link" onClick={handleNavLinkClick}>
              <FaUserCircle className="profile-icon" /> {user?.name || 'Profil'}
            </NavLink>
            <button onClick={handleLogout} className="logout-btn-mobile">
              <FaSignOutAlt /> Déconnexion
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={handleNavLinkClick}>Connexion</NavLink>
            <NavLink to="/register" onClick={handleNavLinkClick}>Inscription</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
