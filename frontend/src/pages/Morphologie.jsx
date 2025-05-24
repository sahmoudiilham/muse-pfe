import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import './Morphologie.scss';

const morphologies = [
  { id: 'rectangle', name: 'Rectangle', img: '/images/rectangle.png' },
  { id: 'sablier', name: 'Sablier', img: '/images/sablier.png' },
  { id: 'triangle', name: 'Triangle', img: '/images/triangle.png' },
  { id: 'rond', name: 'Rond', img: '/images/rond.png' },
];

export default function Morphologie() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (selected) {
      localStorage.setItem('morphologie', selected);
      navigate("/style");
    } else {
      alert("Choisissez une morphologie !");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container morphologie-page">
        <h2 className="text-center my-4">Quelle est votre morphologie ?</h2>
        <div className="row justify-content-center">
          {morphologies.map(m => (
            <div
              key={m.id}
              className={`col-md-3 morpho-card ${selected === m.id ? "selected" : ""}`}
              onClick={() => setSelected(m.id)}
            >
              <img src={m.img} alt={m.name} className="img-fluid" />
              <p className="text-center mt-2">{m.name}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-success" onClick={handleNext}>Suivant</button>
        </div>
      </div>
    </>
  );
}
