import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaWifi, FaShower } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi";
import { Context } from "../../store/context"; 
import { LoadingCampingList } from "../../components/loadings/CampingListLoading";

export function CampingsList() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getCampings(); // Llamamos a la acción para obtener los campings
  }, []); 

  // Si está cargando, mostramos el componente de loading
  if (store.loading) {
    return <LoadingCampingList />;
  }

  // Si los datos ya están cargados, renderizamos los campings
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
            <button className="btn btn-warning rating-button-link" style={{ fontSize: "2rem" }}>
              {camping.average_rating}
            </button>
            <div className="icon-comment-container">
              <span>Comments: {camping.total_reviews}</span>
            </div>
          </div>

          <div className="container-footer-card">
            <Link to={`/camping/${camping.id}`}>
              <button className="camping btn btn-warning">
                Visita nuestro Camping
              </button>
            </Link>
            <div className="container-card-icons">
              <FaWifi className="icon" />
              <FaShower className="icon" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
