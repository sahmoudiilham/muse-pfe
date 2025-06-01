import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Morphologie from "../pages/Morphologie";
import Palette from "../pages/Palette";
import Vetement from "../pages/Vetement";
import Favoris from "../pages/Favoris";
import Visage from "../pages/Visage";
import Coiffure from "../pages/Coiffure";
import Lunette from "../pages/Lunette";
import ChatIA from "../components/ChatIA";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/morphologie" element={<Morphologie />} />
      <Route path="/palette" element={<Palette />} />
      <Route path="/vetement" element={<Vetement />} />
      <Route path="/favoris" element={<Favoris />} />
      <Route path="/visage" element={<Visage />} />
      <Route path="/coiffure" element={<Coiffure />} />
      <Route path="/lunette" element={<Lunette />} />
      <Route path="/chat" element={<ChatIA />} />
    </Routes>
  );
};

export default AppRouter;
