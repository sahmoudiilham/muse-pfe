import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext"; // ✅ مهم
import AdminNavbar from "./admin/AdminNavbar"; // ✅ مهم

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="app">
      {user?.role === "admin" ? <AdminNavbar /> : <Navbar />}
      <AppRouter />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
