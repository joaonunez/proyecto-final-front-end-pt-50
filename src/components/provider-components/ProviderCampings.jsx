import React, { useEffect, useContext } from "react";
import { Context } from "../../store/context";
import { Link } from "react-router-dom";

export function ProviderCampings() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.user) {
      actions.getProviderCampings(); // Llamamos a la acción para obtener los campings
    }
  }, [store.user]); // Dependencias: se ejecuta cuando el usuario o las acciones cambian

  // Evitar error si campings es undefined
  const campingsList = store.campings || [];

  const handleDelete = async (id) => {
    const confirmed = window.confirm("¿Estás seguro de que quieres eliminar este camping?");
    if (confirmed) {
      try {
        await actions.deleteCamping(id); // Suponiendo que tienes una acción para eliminar
        actions.getProviderCampings(); // Actualizar la lista después de eliminar
      } catch (error) {
        console.error("Error al eliminar el camping:", error);
      }
    }
  };

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
                  <div className="d-grid gap-2">
                    <Link to={camping.url_web} target="_blank" rel="noopener noreferrer">
                      <button className="btn btn-warning" type="button">Ver Camping</button>
                    </Link>
                  </div>
                  <div className="gap-2 d-md-flex justify-content-md-end">
                    <Link to={"/edit-forms/" + camping.id}>
                      <button className="btn btn-warning" type="button">Editar</button>
                    </Link>
                    <button 
                      className="btn btn-warning" 
                      type="button" 
                      onClick={() => handleDelete(camping.id)}
                    >
                      Eliminar
                    </button>
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
