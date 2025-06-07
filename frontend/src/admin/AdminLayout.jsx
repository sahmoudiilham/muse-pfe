import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar"; // تأكد من المسار صحيح

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
     
      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}
