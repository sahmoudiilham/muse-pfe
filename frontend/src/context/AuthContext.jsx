import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
        console.log("USER ROLE:", response.data.role);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'utilisateur:", error);
        setUser(null);
        setAuthToken(null);
      }
    } else {
      setUser(null);
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
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        await axios.post("http://localhost:8000/api/logout", {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log("Déconnexion côté serveur réussie.");
      } catch (error) {
        console.error("Erreur lors de la déconnexion côté serveur:", error);
      }
    }
    setAuthToken(null);
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        fetchUser,  // هنا صدرنا fetchUser
        loadingAuth, 
        isAuthenticated 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
