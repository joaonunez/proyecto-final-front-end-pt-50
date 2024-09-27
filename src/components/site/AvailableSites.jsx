import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../store/context';
import { useParams } from 'react-router-dom';

const AvailableSites = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar los sitios del camping actual
    actions.getSitesByCamping(id);
  },);

  const handleSiteSelect = (site) => {
    actions.selectSite(site); // Guardar el sitio seleccionado en el store
  };

  const handleReservationClick = () => {
    if (store.user) {
      navigate('/reservation-request'); // Redirigir al formulario de reserva
    } else {
      navigate('/login'); // Redirigir al login si no hay usuario
    }
  };

  const formatFacilities = (facilities) => {
    if (typeof facilities === 'object' && facilities !== null) {
      const availableFacilities = Object.entries(facilities)
        .filter(([key, value]) => value === true)
        .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1));
      return availableFacilities.length > 0 ? availableFacilities.join(', ') : 'Ninguna facilidad disponible';
    }
    return 'Información no disponible';
  };

  const formatDimensions = (dimensions) => {
    if (typeof dimensions === 'object' && dimensions !== null) {
      return `Largo: ${dimensions.length} m, Ancho: ${dimensions.width} m`;
    }
    return 'Información no disponible';
  };

  return (
    <div className="container mt-4">
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
          <h4>SITIO {store.selectedSite.name}</h4>
          <p><strong>Capacidad Máxima:</strong> {store.selectedSite.max_of_people} personas</p>
          <p><strong>Precio:</strong> ${store.selectedSite.price} por noche</p>
          <p><strong>Facilidades:</strong> {formatFacilities(store.selectedSite.facilities)}</p>
          <p><strong>Dimensiones:</strong> {formatDimensions(store.selectedSite.dimensions)}</p>
          {store.selectedSite.url_map_site && (
            <img
              src={store.selectedSite.url_map_site}
              alt="Mapa del sitio"
              className="img-fluid rounded mb-4"
              style={{ maxWidth: '100%', maxHeight: '400px' }}
            />
          )}
          <button className="btn btn-primary" onClick={handleReservationClick}>
            Reservar este Sitio
          </button>
        </div>
      )}
    </div>
  );
};

export default AvailableSites;
