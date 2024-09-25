import React, { useEffect, useContext } from "react";
import { Context } from "../../store/context";
import { Link } from "react-router-dom";

export function ProviderCampings() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.user) {
      actions.getProviderCampings(); // llamamos a la accion para obtener los campings
    }
  }, [store.user, actions]); // dependencias: se ejecuta cuando el usuario o las acciones cambian

  // Evitar error si campings es undefined
  const campingsList = store.campings || [];

  return (
    <div className="provider-campings-container">
      <h2 className="campings-header">Panel de Control del Proveedor</h2>
      {store.error && <div className="error">{store.error}</div>}
      {campingsList.length === 0 && !store.error ? (
        <p className="loading-message">Cargando campings...</p>
      ) : (
        <div className="campings-list">
          {campingsList.map((camping) => (
            <div key={camping.id} className="camping-card">
              {camping.main_image && (
                <img
                  src={camping.main_image}
                  alt={camping.name}
                  className="camping-image"
                />
              )}
              <div className="camping-content">
                <h3 className="camping-title">{camping.name}</h3>
                <div className="camping-info">
                  <div className="camping-field">
                    <span className="camping-label">Descripción:</span>
                    <p className="camping-value">{camping.description}</p>
                  </div>
                  <div className="camping-field">
                    <span className="camping-label">Dirección:</span>
                    <p className="camping-value">{camping.address}</p>
                  </div>
                  <div className="camping-field">
                    <span className="camping-label">Teléfono:</span>
                    <p className="camping-value">{camping.phone}</p>
                  </div>
                  <div className="camping-field">
                    <span className="camping-label">Comuna:</span>
                    <p className="camping-value">{camping.comuna}</p>
                  </div>
                  <div className="camping-field">
                    <span className="camping-label">Región:</span>
                    <p className="camping-value">{camping.region}</p>
                  </div>
                </div>
                <div className="ver-camping">
                  <div class="gap-2 d-md-flex justify-content-md-end">
                    <a
                      href={camping.url_web}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="camping-link"
                    >
                      Ver Camping

                    </a>
                    <Link to="/formulario">
                    <button class="btn btn-warning md-2" type="button">Editar</button>
                    </Link>
                    <button class="btn btn-warning" type="button">Eliminar</button>
                  </div>

                </div>


              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
