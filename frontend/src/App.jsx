import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from "axios";

function App() {
  const token = localStorage.getItem("token");
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <AppRouter />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
