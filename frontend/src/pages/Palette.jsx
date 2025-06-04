import React, { useEffect, useState } from 'react'; // Make sure useState is imported
import '../styles/palette.scss';

export default function Palette() {
  const [palettes, setPalettes] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // MODIFICATION ICI: Utilisez 'authToken' pour récupérer le token
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      console.log("No auth token found, redirecting to login.");
      window.location.href = "/login";
      return;
    }

    fetch('http://localhost:8000/api/palettes', {
      headers: {
        'Authorization': `Bearer ${authToken}`, // MODIFICATION ICI: Utilisez authToken
        'Accept': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          // Si le token est invalide ou expiré, cela renverra un 401
          // Nous devrions gérer cela explicitement
          if (res.status === 401) {
            console.error("Unauthorized: Please log in again.");
            localStorage.removeItem('authToken'); // Nettoyer le token invalide
            window.location.href = "/login"; // Rediriger
          }
          throw new Error('Error fetching palettes: ' + res.statusText);
        }
        return res.json();
      })
      .then(data => {
        setPalettes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching palettes:', err);
        setLoading(false);
      });
  }, []); // Le tableau de dépendances vide est correct pour un effet qui ne s'exécute qu'au montage


  const handleSelect = (palette) => {
    setSelected(palette);
  };

  const downloadPalette = () => {
    if (!selected) return;
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');

    // Assurez-vous que selected.colors est un tableau et qu'il contient des chaînes de couleur valides
    if (selected.colors && Array.isArray(selected.colors)) {
      selected.colors.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.fillRect(i * 50, 0, 50, 100);
      });
    } else {
        console.warn("Palette colors are not in expected format:", selected.colors);
        // Gérer l'erreur, par exemple, ne pas tenter le téléchargement ou afficher un message
        return;
    }


    const link = document.createElement('a');
    link.download = `${selected.skin_tone}_palette.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  if (loading) return <div className="palette-page">Chargement des palettes...</div>;

  // Si palettes est vide après chargement, affichez un message approprié
  if (palettes.length === 0 && !loading) {
      return (
          <div className="palette-page">
              <p>Aucune palette de couleurs disponible pour le moment.</p>
          </div>
      );
  }

  return (
    <div className="palette-page">
      <h2>Choisissez votre couleur de peau</h2>

      <div className="skin-options">
        {palettes.map(palette => (
          // Assurez-vous que palette.skin_color est bien défini et une chaîne de couleur valide (ex: #RRGGBB)
          <div
            key={palette.id}
            className={`skin-option ${selected?.id === palette.id ? 'selected' : ''}`}
            style={{ backgroundColor: palette.skin_color }}
            onClick={() => handleSelect(palette)}
            title={palette.skin_tone}
          >
            {palette.skin_tone}
          </div>
        ))}
      </div>

      {selected && (
        <div className="palette-result">
          <h3>{selected.skin_tone}</h3>
          <p className="description">{selected.description}</p>

          <div className="palette-preview">
            <div className="color-palette">
              {/* Assurez-vous que selected.colors est un tableau de chaînes de couleur */}
              {selected.colors.map((color, i) => (
                <div
                  key={i}
                  className="palette-color"
                  style={{ backgroundColor: color }}
                  title={color}
                ></div>
              ))}
            </div>
            <button className="save-btn" onClick={downloadPalette}>Télécharger la palette</button>
          </div>
        </div>
      )}
    </div>
  );
}