import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Morphologie from "../pages/Morphologie";
import Palette from "../pages/Palette";
import Vetements from "../pages/Vetement";
import Favoris from "../pages/Favoris";
import Visage from "../pages/Visage";
import Coiffure from "../pages/Coiffure";
import Lunette from "../pages/Lunette";
import ChatIA from "../components/ChatIA";
import PrivateRoute from "../components/PrivateRoute";

const AppRouter = () => {
  return (
    <Routes>
      {/* Rediriger la page racine vers login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      import PrivateRoute from "../components/PrivateRoute";

//...
<Route
  path="/home"
  element={
    <PrivateRoute>
      <Home />
    </PrivateRoute>
  }
/>

      <Route
        path="/morphologie"
        element={
          <PrivateRoute>
            <Morphologie />
          </PrivateRoute>
        }
      />
      <Route
        path="/palette"
        element={
          <PrivateRoute>
            <Palette />
          </PrivateRoute>
        }
      />
      <Route
        path="/vetements"
        element={
          <PrivateRoute>
            <Vetements />
          </PrivateRoute>
        }
      />
      <Route
        path="/favoris"
        element={
          <PrivateRoute>
            <Favoris />
          </PrivateRoute>
        }
      />
      <Route
        path="/visage"
        element={
          <PrivateRoute>
            <Visage />
          </PrivateRoute>
        }
      />
      <Route
        path="/coiffure"
        element={
          <PrivateRoute>
            <Coiffure />
          </PrivateRoute>
        }
      />
      <Route
        path="/lunette"
        element={
          <PrivateRoute>
            <Lunette />
          </PrivateRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <ChatIA />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
