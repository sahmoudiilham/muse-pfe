import React, { useState } from "react";
import "../styles/register.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import du contexte

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Accès à la fonction login
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // Pour gérer les erreurs

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    try {
      const res = await axios.post("http://localhost:8000/api/register", formData);
      const { token, user } = res.data; // Laravel retourne 'token' et 'user'

      login(token, user); // Connecte l'utilisateur via le contexte
      alert("Compte créé avec succès !");
      navigate("/home"); // Redirige vers l'accueil ou un tableau de bord
    } catch (error) {
      console.error("Erreur serveur:", error.response);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else if (error.response && error.response.data.errors) {
        const messages = Object.values(error.response.data.errors).flat();
        setError("Erreur: " + messages.join(" - "));
      } else {
        setError("Erreur inconnue lors de l'inscription.");
      }
    }
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Créer un compte</h2>

        <label>Nom</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Mot de passe</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;

/*import React, { useState } from "react";
import "../styles/register.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate(); // 🔥 هذا هو المكان الصحيح
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/api/register", formData);
      localStorage.setItem("token", res.data.token);
      alert("Compte créé avec succès !");
      navigate("/login");
    } catch (error) {
  console.error("Erreur serveur:", error.response);
  if (error.response && error.response.data && error.response.data.message) {
    alert("Erreur: " + error.response.data.message);
  } else if (error.response && error.response.data.errors) {
    // Laravel kayrja3 validation errors f object "errors"
    const messages = Object.values(error.response.data.errors).flat();
    alert("Erreur: " + messages.join(" - "));
  } else {
    alert("Erreur inconnue lors de l'inscription.");
  }
}

  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Créer un compte</h2>

        <label>Nom</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Mot de passe</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;
*/