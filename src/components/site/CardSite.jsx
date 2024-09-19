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

const CardSite = ({ siteId }) => {
  const [siteData, setSiteData] = useState(null);

  useEffect(() => {
    if (siteId) {
      fetch(`http://localhost:3001/${siteId}`)
        .then((response) => response.json())
        .then((data) => {
          setSiteData(data);
        })
        .catch((error) => {
          console.error("Error fetching site data:", error);
        });
    }
  }, [siteId]);

  const handleClick = () => {
    console.log("Botón de reservar presionado");
    // Lógica adicional para reservar el sitio
  };

  if (!siteData) return <div>Selecciona un sitio para ver los detalles</div>;

  const { name, price, max_of_people, url_photo_site, dimensions } = siteData;
  const surfaceArea = dimensions ? dimensions.width * dimensions.length : 0;

  return (
    <div className="card border-success mb-2 mt-auto" style={{ width: "18rem" }}>
      <div className="card-header bg-transparent border-success" style={{ padding: "5px", height: "50px" }}>
        <h3 className="d-flex justify-content-center min-height" style={{ fontSize: "1.5rem" }}>
          {name}
        </h3>
      </div>
      <img
        src={url_photo_site || "https://sendasconguillio.cl/wp-content/uploads/2023/10/camping.jpg"}
        className="card-img-top"
        alt="Camping Site"
      />
      <div className="card-body p-2" style={{ padding: "2px", height: "50px" }}>
        <p className="fs-5 d-flex justify-content-center">
          Superficie: {surfaceArea} m², Precio: ${price}, Capacidad: {max_of_people} personas
        </p>
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
        <button onClick={handleClick} className="btn btn-success">Reservar</button>
      </div>
    </div>
  );
};

export default CardSite;
