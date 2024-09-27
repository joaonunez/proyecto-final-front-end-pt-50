import React, { useState, useEffect } from "react";
import { FaFaucetDrip } from "react-icons/fa6";
import { TbCampfire } from "react-icons/tb";
import { PiPicnicTableBold } from "react-icons/pi";
import { FaCarAlt } from "react-icons/fa";
import { FaPlug } from "react-icons/fa";
import { MdWarehouse } from "react-icons/md";
import { FaHotTubPerson } from "react-icons/fa6";
import { MdOutdoorGrill } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";

const CardSite = ({ siteId }) => {
  const [siteData, setSiteData] = useState(null);
  const navigate = useNavigate(); // Añadimos el hook de navegación para manejar la redirección

  useEffect(() => {
    if (siteId) {
      fetch(`http://localhost:3001/site/site/${siteId}`)
        .then((response) => response.json())
        .then((data) => {
          setSiteData(data);
        })
        .catch((error) => {
          console.error("Error fetching site data:", error);
        });
    }
  }, [siteId]);

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

  const handleReservationClick = () => {
    // Lógica para redirigir al formulario de reserva
    if (siteData) {
      navigate('/reservation-request'); // Cambia la ruta según tu lógica de reserva
    }
  };

  if (!siteData) return <div>Selecciona un sitio para ver los detalles</div>;

  return (
    <div className="card border-success mb-2 mt-auto" style={{ width: "18rem" }}>
      <div className="card-header bg-transparent border-success" style={{ padding: "5px", height: "50px" }}>
        <h3 className="d-flex justify-content-center min-height" style={{ fontSize: "1.5rem" }}>
          SITIO {siteData.name}
        </h3>
      </div>
      <img
        src={siteData.url_photo_site || "https://catarsiscreativa.com/camping_app/img/sitio_defecto.png"}
        className="card-img-top"
        alt="Camping Site"
      />
      <div className="card-body p-2" style={{ padding: "2px", height: "50px" }}>
        <p><strong>Capacidad Máxima:</strong> {siteData.max_of_people} personas</p>
        <p><strong>Precio:</strong> ${siteData.price} por noche</p>
        <p><strong>Facilidades:</strong> {formatFacilities(siteData.facilities)}</p>
        <p><strong>Dimensiones:</strong> {formatDimensions(siteData.dimensions)}</p>
      </div>
      <div className="card-footer bg-transparent border-success">
        <p className="card-text">
          {siteData.review || "Reseña no disponible."}
        </p>
      </div>
      <div className="card-footer bg-transparent border-success">
        <div className="d-flex justify-content-around">
          <i className="material-icons" alt="fogata"><TbCampfire /></i>
          <i className="material-icons" alt="picnic"><PiPicnicTableBold /></i>
          <i className="material-icons" alt="agua"><FaFaucetDrip /></i>
          <i className="material-icons" alt="electricidad"><FaPlug /></i>
          <i className="material-icons" alt="estacionamiento"><FaCarAlt /></i>
          <i className="material-icons" alt="techado"><MdWarehouse /></i>
          <i className="material-icons" alt="bañera"><FaHotTubPerson /></i>
          <i className="material-icons" alt="parrilla"><MdOutdoorGrill /></i>
        </div>
      </div>
      <div className="card-footer text-body-secondary d-flex justify-content-end">
        <button className="btn btn-success" onClick={handleReservationClick}>
          Reservar este Sitio
        </button>
      </div>
    </div>
  );
};

export default CardSite;
