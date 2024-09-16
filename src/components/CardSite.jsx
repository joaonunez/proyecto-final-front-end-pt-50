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

const CardSite = () => {
  const [headerData, setHeaderData] = useState("");
  const [bodyData, setBodyData] = useState("");
  const [footerText, setFooterText] = useState("");

  useEffect(() => {
    // Simulación de una llamada a la API
    fetch("https://api-tu-base-de-datos.com/site-data")
      .then((response) => response.json())
      .then((data) => {
        setHeaderData(data.header);
        setBodyData(data.body);
        setFooterText(data.footer);
      })
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  // Definir la función handleClick
  const handleClick = () => {
    console.log("Botón de reservar presionado");
    // Lógica adicional para reservar el sitio
  };

  return (
    <div className="card border-success mb-2 mt-auto" style={{ width: "18rem" }}>
      <div className="card-header bg-transparent border-success" style={{ padding: "5px", height: "50px" }}>
        <h3 className="d-flex justify-content-center min-height" style={{ fontSize: "1.5rem" }}>
          {headerData || "Sitio 1"}
        </h3>
      </div>
      <img
        src="https://sendasconguillio.cl/wp-content/uploads/2023/10/camping.jpg"
        className="card-img-top"
        alt="Camping Site"
      />
      <div className="card-body p-2" style={{ padding: "2px", height: "50px" }}>
        <p className="fs-5 d-flex justify-content-center">{bodyData || "largo, Ancho"}</p>
      </div>
      <div className="card-footer bg-transparent border-success">
        <p className="card-text">
          {footerText || "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
        </p>
      </div>
      
      {/* Actualización de la sección de iconos */}
      <div className="card-footer bg-transparent border-success">
        <div className="d-flex justify-content-around">
          <i className="material-icons" alt="fogata"  ><TbCampfire /></i>        {/* Fogata */}
          <i className="material-icons" alt="picnic" ><PiPicnicTableBold /></i>    {/* Picnic */}
          <i className="material-icons" alt="Mapa de camping" ><FaFaucetDrip /></i>          {/* Agua */}
          <i className="material-icons" alt="Mapa de camping" ><FaPlug /></i>               {/* Electricidad */}
          <i className="material-icons" alt="Mapa de camping" ><FaCarAlt /></i>         {/* Estacionamiento */}
          <i className="material-icons" alt="Mapa de camping" ><MdWarehouse /></i>       {/* techo */}
          <i className="material-icons" alt="Mapa de camping" ><FaHotTubPerson /></i>       {/* techo */}
           <i className="material-icons" alt="Mapa de camping" ><MdOutdoorGrill /></i>       {/* techo */}
          
          
        </div>
      </div>

      <div className="card-footer text-body-secondary d-flex justify-content-end">
        <button onClick={handleClick} className="btn btn-success">Reservar</button>
      </div>
    </div>
  );
};

export default CardSite;
