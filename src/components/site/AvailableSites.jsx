import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';

const AvailableSites = ({ onSiteSelect }) => {
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState(null);
const {id}=useParams()

  useEffect(() => {
    fetch('http://localhost:3001/site/'+id) // Si el endpoint es para obtener todos los sitios
      .then((response) => response.json())
      .then((data) => setSites(data))
      .catch((error) => console.error('Error fetching sites:', error));
  }, []);

  const handleSiteSelect = (site) => {
    setSelectedSite(site);
    onSiteSelect(site.id);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Sitios Disponibles</h2>
      <div className="d-flex flex-wrap justify-content-center mb-4">
        {sites.map((site) => (
          <button
            key={site.id}
            className="btn m-2"
            style={{ backgroundColor: site.status === 'available' ? '#8BC34A' : '#9E9E9E' }}
            onClick={() => handleSiteSelect(site)}
          >
            {site.name}
          </button>
        ))}
      </div>
      <div className="SiteMap d-flex justify-content-center">
        {selectedSite && (
          <img
            src={selectedSite.url_map_site}
            alt="Mapa de camping"
            className="img-fluid rounded"
            style={{ maxWidth: '100%', maxHeight: '600px' }}
          />
        )}
      </div>
    </div>
  );
};

export default AvailableSites;
