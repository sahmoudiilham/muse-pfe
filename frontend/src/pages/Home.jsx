import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="home-welcome">
        <h1>Bienvenue sur Muse 💄</h1>
        <p>
          Découvrez les vêtements, couleurs et accessoires qui vous mettent en valeur.
        </p>
        <div className="home-links">
          <Link to="/morphologie">Commencer mon analyse</Link>
          <Link to="/chat">Parler avec l'assistante IA</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
