import React from "react";
import "../styles/Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Muse. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
