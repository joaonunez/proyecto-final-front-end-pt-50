import React, { useContext } from "react";
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
import { Context } from "../../store/context"; 
import Swal from 'sweetalert2'; 

const CardSite = ({ siteData }) => {
  const navigate = useNavigate();
  const { store } = useContext(Context); 

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
    if (!store.user) {
      Swal.fire({
        icon: 'info',
        title: '¡Debes iniciar sesión!',
        text: 'Para poder crear una reserva, necesitas iniciar sesión en tu cuenta.',
        showCancelButton: true, 
        confirmButtonText: 'Iniciar sesión',
        cancelButtonText: 'No, quiero quedarme', 
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login'); 
        }
      });
      return; 
    }
    if (siteData) {
      navigate('/reservation-request', { state: { siteId: siteData.id } }); 
    }
  };

  if (!siteData) return <div>Selecciona un sitio para ver los detalles</div>;

  return (
    <div className="card border-success mb-2 mt-auto" style={{ width: "20rem", height: "34rem",}}>
      <div className="card-header bg-transparent border-success" style={{ padding: "5px", height: "50px" }}>
        <h3 className="d-flex justify-content-center" style={{ fontSize: "1.5rem", margin: 0 }}>
          SITIO {siteData.name}
        </h3>
      </div>
      <img
        src={siteData.url_photo_site || "https://catarsiscreativa.com/camping_app/img/sitio_defecto.png"}
        className="card-img-top" 
        style={{ width: "100%", height: "auto" }}
        alt="Camping Site"
      />
      <div className="card-body p-2" style={{ padding: "2px", height: "80px", overflow: "hidden" }}>
        <p style={{ margin: "0" }}><strong>Capacidad Máxima:</strong> {siteData.max_of_people} personas</p>
        <p style={{ margin: "0" }}><strong>Precio:</strong> ${siteData.price} por noche</p>
        <p style={{ margin: "0" }}><strong>Facilidades:</strong> {formatFacilities(siteData.facilities)}</p>
        <p style={{ margin: "0" }}><strong>Dimensiones:</strong> {formatDimensions(siteData.dimensions)}</p>
      </div>
      <div className="card-footer bg-transparent border-success" style={{ height: "5rem", overflow: "hidden", }}>
        <p className="card-text" style={{ margin: 0 }}>
          {siteData.review || "Reseña no disponible."}
        </p>
      </div>
      <div className="card-footer text-body-secondary d-flex justify-content-end">
        <button className="btn btn-warning" onClick={handleReservationClick}>
          Reservar este Sitio
        </button>
      </div>
    </div>
    
  );
};

export default CardSite;