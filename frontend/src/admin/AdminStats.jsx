import { useEffect, useState } from "react";
import axios from "axios";

const AdminStats = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/admin/stats");
        setStats(response.data);
      } catch (err) {
        console.error("Erreur lors du chargement des statistiques :", err);
        setError("Impossible de charger les statistiques.");
      }
    };

    fetchStats();
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!stats) return <p>Chargement des statistiques...</p>;

  return (
    <div>
      <h2>Statistiques générales</h2>
      <ul>
        <li><strong>Nombre total d’utilisateurs :</strong> {stats.total_users}</li>
        <li><strong>Utilisateurs avec Morphologie :</strong> {stats.morphology_count}</li>
        <li><strong>Utilisateurs avec Palette :</strong> {stats.palette_count}</li>
        <li><strong>Total des favoris :</strong> {stats.favoris_count}</li>
      </ul>
    </div>
  );
};

export default AdminStats;
