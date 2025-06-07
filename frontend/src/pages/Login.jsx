import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.scss";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, fetchUser, user } = useAuth(); // Utiliser la fonction login du contexte

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:8000/api/auth/login", { // Utiliser l'URL complète pour plus de clarté
        email,
        password,
      });

      const { token, user } = res.data; // Laravel retourne 'token' et 'user'
      login(token, user);
      await fetchUser();
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }

    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); const Login = () => {
          const [email, setEmail] = useState("");
          const [password, setPassword] = useState("");
          const [error, setError] = useState("");
          const navigate = useNavigate();
          const { login, fetchUser } = useAuth(); // زدت fetchUser هنا

          const handleSubmit = async (e) => {
            e.preventDefault();
            setError("");
            try {
              const res = await axios.post("http://localhost:8000/api/auth/login", {
                email,
                password,
              });

              const { token, user } = res.data;
              login(token, user);
              await fetchUser(); // من بعد login كنعيد نجيب المستخدم
              navigate("/home");
            } catch (err) {
              console.error(err);
              if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
              } else {
                setError("Erreur de connexion. Veuillez réessayer.");
              }
            }
          };

          return (
            <div className="login-page">
              <form className="login-form" onSubmit={handleSubmit}>
                <h2>Connexion</h2>
                <input
                  type="email"
                  placeholder="Adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Se connecter</button>
              </form>
            </div>
          );
        };

      } else {
        setError("Erreur de connexion. Veuillez réessayer.");
      }
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
/*import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.scss";
import { useAuth } from "../context/AuthContext";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      login(token);
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Email ou mot de passe incorrect");
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Connexion</h2>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
*/