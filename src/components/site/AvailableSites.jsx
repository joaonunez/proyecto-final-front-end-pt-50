import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AvailableSites = ({ onSiteSelect }) => {
  const [campings, setCampings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/') // Cambia esta URL según tu API real
      .then((response) => response.json())
      .then((data) => setCampings(data))
      .catch((error) => console.error('Error fetching campings:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center">Campings Disponibles</h2>
      <div className="d-flex flex-wrap justify-content-center mb-4">
        {campings.map((camping) => (
          <div key={camping.id} className="m-2">
            <h4>{camping.name}</h4>
            {camping.zones.map((site) => (
              <button
                key={site.id}
                className="btn m-2"
                style={{ backgroundColor: site.status === 'available' ? '#8BC34A' : '#9E9E9E' }}
                onClick={() => onSiteSelect(site.id)}
              >
                {site.name}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <img
          src="https://sendasconguillio.cl/wp-content/uploads/2023/11/Camping-Nirres-baja.jpg"
          alt="Mapa de camping"
          className="img-fluid rounded"
          style={{ maxWidth: '100%', maxHeight: '600px' }}
        />
      </div>
    </div>
  );
};

export default AvailableSites;
