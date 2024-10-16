import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaWifi, FaShower } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi";
import { Context } from "../../store/context"; 
import { LoadingCampingList } from "../../components/loadings/CampingListLoading";

export function CampingsList() {
  const { store, actions } = useContext(Context);
  const [limit] = useState(10); // Número de campings a cargar en cada solicitud
  const [loadingMore, setLoadingMore] = useState(false); // Estado para el botón de "Cargar más"

  useEffect(() => {
    actions.getCampings(limit, 0); // Cargar los primeros 10 campings al montar el componente
  }, []);

  const loadMoreCampings = async () => {
    setLoadingMore(true); // Mostrar el estado de carga mientras se cargan más campings
    await actions.getCampings(limit, store.offset); // Cargar más campings
    setLoadingMore(false); // Ocultar el estado de carga cuando termine
  };

  if (store.loading && store.campings.length === 0) {
    return <LoadingCampingList />;
  }

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

      {/* Mostrar el componente LoadingCampingList si se están cargando más campings */}
      {loadingMore && <LoadingCampingList />}

      {/* Botón para cargar más campings */}
      {store.offset < store.totalCampings && !loadingMore && (
        <div className="text-center">
          <button className="btn btn-warning mt-4" onClick={loadMoreCampings}>
          <button
            className="btn btn-primary mt-4"
            onClick={loadMoreCampings}
            disabled={loadingMore} // Deshabilitar el botón mientras está cargando>
            Cargar más campings
          </button>
        </div>
      )}
    </>
  );
}
