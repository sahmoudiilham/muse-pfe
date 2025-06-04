// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stocke l'objet utilisateur complet ou null
  const [loadingAuth, setLoadingAuth] = useState(true);

  const setAuthToken = useCallback((token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem("authToken", token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem("authToken");
    }
  }, []);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
      try {
        const response = await axios.get("http://localhost:8000/api/user");
        setUser(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
        setUser(null);
        setAuthToken(null);
      }
    }
    setLoadingAuth(false);
  }, [setAuthToken]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = (token, userData) => {
    setAuthToken(token);
    setUser(userData);
  };

  const logout = async () => {
    const token = localStorage.getItem("authToken"); // Récupère le token pour l'envoi explicite
    if (token) {
      try {
        // L'en-tête Authorization sera automatiquement ajouté par Axios si setAuthToken a été appelé
        // Mais l'envoyer explicitement comme vous le faites est aussi sûr.
        await axios.post("http://localhost:8000/api/logout", {}, {
           headers: { Authorization: `Bearer ${token}` } // Facultatif si déjà dans les defaults d'Axios
        });
        console.log("Déconnexion côté serveur réussie.");
      } catch (error) {
        console.error("Erreur lors de la déconnexion côté serveur:", error);
      }
    }
    setAuthToken(null); // Supprime le token de localStorage et des defaults Axios
    setUser(null);      // Efface l'utilisateur de l'état
  };

  // Calculez isAuthenticated en fonction de l'état de user et loadingAuth
  // L'utilisateur est authentifié si 'user' n'est pas null ET que le chargement initial est terminé.
  const isAuthenticated = !!user; // Simplement !!user est généralement suffisant une fois loadingAuth géré.

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        loadingAuth, 
        isAuthenticated // <- Fournir isAuthenticated ici
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);