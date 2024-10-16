import React, { useEffect, useContext } from "react";
import { Context } from "../../store/context";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

export function ProviderCampings() {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.user) {
      actions.getProviderCampings(); // Obtener campings
    }
  }, [store.user]);

  const campingsList = store.campings || [];

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar camping!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const success = await actions.deleteCamping(id);
          if (success) {
            Swal.fire(
              '¡Eliminado!',
              'El camping ha sido eliminado.',
              'success'
            );
            actions.getProviderCampings(); // Actualizar lista
          } else {
            Swal.fire(
              'Error',
              'No se pudo eliminar el camping.',
              'error'
            );
          }
        } catch (error) {
          console.error("Error al eliminar el camping:", error);
          Swal.fire(
            'Error',
            'Ocurrió un problema. Inténtalo nuevamente.',
            'error'
          );
        }
      }
    });
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
                  <div className="gap-2 d-md-flex justify-content-md-end">
                    <Link to={"/edit-forms/" + camping.id}>
                      <button className="btn btn-warning" type="button">Editar</button>
                    </Link>
                    <button 
                      className="btn btn-danger" 
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
