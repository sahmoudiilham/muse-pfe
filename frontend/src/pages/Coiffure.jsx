import { useState } from "react";

function Coiffure() {
  const [image, setImage] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const hairstyles = [
    { name: "Carré dégradé", image: "/coiffures/carre.png" },
    { name: "Long ondulé", image: "/coiffures/long-ondule.png" },
    { name: "Bob", image: "/coiffures/bob.png" },
    { name: "Pixie Cut", image: "/coiffures/pixie.png" },
  ];

  return (
    <div className="container morpho-container">
      <h2 className="mb-4">Choisissez votre coiffure idéale</h2>

      <div className="mb-3">
        <label className="form-label">Uploader votre photo de visage</label>
        <input type="file" accept="image/*" className="form-control" onChange={handleUpload} />
      </div>

      {image && (
        <div className="mb-4">
          <img src={image} alt="Uploaded" className="img-fluid rounded" width="200" />
        </div>
      )}

      <div className="row">
        {hairstyles.map((style) => (
          <div className="col-md-3 text-center mb-3" key={style.name}>
            <div className="body-shape border p-2 rounded">
              <img src={style.image} alt={style.name} className="img-fluid mb-2" />
              <h6>{style.name}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Coiffure;
