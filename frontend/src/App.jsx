import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Morphologie from "./pages/Morphologie";
import Coiffure from "./pages/Coiffure";
import Lunettes from "./pages/Lunettes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/morphologie" element={<Morphologie />} />
          <Route path="/coiffure" element={<Coiffure />} />
          <Route path="/lunettes" element={<Lunettes />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
