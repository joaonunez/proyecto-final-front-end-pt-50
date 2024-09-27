import React, { useEffect, useContext } from 'react';
import { Context } from '../../store/context';
import { useParams } from 'react-router-dom';

const AvailableSites = ({ onSiteSelect }) => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    // Cargar los sitios del camping actual 
    actions.getSitesByCamping(id);
  }, [id, actions]);

  const handleSiteSelect = (site) => {
    actions.selectSite(site); // Guardar el sitio seleccionado en el store
    if (onSiteSelect) {
      onSiteSelect(site.id); // Llama a la función pasada como prop
    }
  };

  return (
    <div className="container mt-4 col-12">
      <h2 className="text-center">Sitios Disponibles</h2>
      <div className="d-flex flex-wrap justify-content-center mb-4">
        {store.sites.map((site) => (
          <button
            key={site.id}
            className="btn m-2"
            style={{
              backgroundColor: site.status === 'available' ? '#8BC34A' : '#9E9E9E',
              color: 'white',
            }}
            onClick={() => handleSiteSelect(site)}
          >
            {site.name}
          </button>
        ))}
      </div>
      {store.selectedSite && (
        <div className="SiteDetails d-flex flex-column align-items-center">
          <img
            src={store.selectedSite.url_map_site || "https://sendasconguillio.cl/wp-content/uploads/2023/11/Sector-Cabanas-baja.jpg"}
            alt="Mapa del sitio"
            className="img-fluid rounded mb-4"
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        </div>
      )}
    </div>
  );
};

export default AvailableSites;
