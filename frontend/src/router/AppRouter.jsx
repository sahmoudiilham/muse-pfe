import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Morphologie from "../pages/Morphologie.jsx";
import Palette from "../pages/Palette.jsx";
import Vetements from "../pages/Vetement";
import Favoris from "../pages/Favoris.jsx";
import Visage from "../pages/Visage";
import Coiffure from "../pages/Coiffure";
import Lunette from "../pages/Lunette";
import ChatIA from "../components/ChatIA";
import PrivateRoute from "../components/PrivateRoute";
import Profile from "../pages/Profile";
import PublicVetementDetail from "../pages/PublicVetementDetail";

// Admin Imports
import AdminRoute from "../components/AdminRoute";
import AdminLayout from "../admin/AdminLayout";
import Users from "../admin/Users";
import AdminFavoris from "../admin/AdminFavoris";
import AdminPalettes from "../admin/AdminPalettes";
import AdminMorphologies from "../admin/AdminMorphologies";
import AdminStats from "../admin/AdminStats";


const AppRouter = () => {
  return (
    <Routes>
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/vetements/public/:id" element={<PublicVetementDetail />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
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

      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route path="users" element={<Users />} />
        <Route path="favoris" element={<AdminFavoris />} />
        <Route path="palettes" element={<AdminPalettes />} />
        <Route path="morphologies" element={<AdminMorphologies />} />
        <Route path="stats" element={<AdminStats />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
