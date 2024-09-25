import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import { PiTentBold } from "react-icons/pi";
import { FaWifi, FaShower } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi";
import { Context } from "../../store/context"; 

export function CampingsList() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getCampings(); // ñlamamos a la accion para obtener los campings
  }, []); //actions eliminada ya que generaba bucle infinito 

  return (
    <>
      <h1 className="title-page">Busqueda de Campings <GiCampingTent /></h1>

      {store.campings.map((camping) => (
        <div key={camping.id} className="container-camping-card row border-success">
          <div className="image-camping-card col-3">
            <img
              className="image-camping-size"
              src={camping.main_image}
              alt={camping.name}
            />
          </div>
          <div className="container-card-camping-info col-6">
            <div className="camping-name-info">
              <h1>{camping.name}</h1>
            </div>
            <p className="camping-description-info ">{camping.description} </p>
          </div>
          <div className="rating-camping-info col-2">
            <button className="btn btn-warning rating-button-link">8</button>
            <div className="icon-comment-container">
              <FaComments className="facomments" />
              <span>Comments</span>
            </div>
          </div>

          <div className="container-footer-card">
            <Link to={`/camping/${camping.id}`}>
              <button className="camping btn btn-warning">
                Visita nuestro Camping
              </button>
            </Link>
            <div className="container-card-icons">
              <PiTentBold className="icon" />
              <FaWifi className="icon" />
              <FaShower className="icon" />
              
            </div>
          </div>
        </div>
      ))}
    </>
  );
}