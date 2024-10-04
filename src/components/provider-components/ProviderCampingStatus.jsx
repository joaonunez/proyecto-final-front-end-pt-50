import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/context";
import Swal from "sweetalert2";

export function ProviderCampingStatus() {
  const { store, actions } = useContext(Context);
  const [expandedCamping, setExpandedCamping] = useState(null);

  // Cargar campings del proveedor
  useEffect(() => {
    actions.getProviderCampings();
  }, []);

  const handleExpandCamping = async (campingId) => {
    if (expandedCamping === campingId) {
      setExpandedCamping(null);
    } else {
      await actions.getSitesByCamping(campingId);
      setExpandedCamping(campingId);
    }
  };

  const handleStatusChange = (site) => {
    const newStatus = site.status === "available" ? "unavailable" : "available";
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas cambiar el estado del sitio ${site.name} a ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cambiarlo",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Llamar a la acción para actualizar el estado del sitio
        const success = await actions.updateSiteStatus(site.id, newStatus);
        if (success) {
          Swal.fire("Cambiado!", `El sitio ha sido marcado como ${newStatus}.`, "success");
        } else {
          Swal.fire("Error", "Hubo un problema al cambiar el estado.", "error");
        }
      }
    });
  };

  if (!store.campings || store.campings.length === 0) {
    return <p>No se encontraron campings para este proveedor.</p>;
  }

  return (
    <div className="camping-status-container">
      <h2 className="camping-status-title">Campings del Proveedor</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Comuna</th>
            <th>Región</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {store.campings.map((camping) => (
            <React.Fragment key={camping.id}>
              <tr>
                <td>{camping.id}</td>
                <td>{camping.name}</td>
                <td>{camping.comuna}</td>
                <td>{camping.region}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleExpandCamping(camping.id)}
                  >
                    {expandedCamping === camping.id ? "Ocultar Sitios" : "Ver Sitios"}
                  </button>
                </td>
              </tr>
              {expandedCamping === camping.id && store.sites.length > 0 && (
                <tr>
                  <td colSpan="5">
                    <div className="site-list">
                      <h5>Lista de Sitios</h5>
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Nombre del Sitio</th>
                            <th>Capacidad Máxima</th>
                            <th>Precio</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {store.sites.map((site) => (
                            <tr key={site.id}>
                              <td>{site.name}</td>
                              <td>{site.max_of_people}</td>
                              <td>${site.price}</td>
                              <td>{site.status === "available" ? "Disponible" : "Ocupado"}</td>
                              <td>
                                <button
                                  className="btn btn-warning"
                                  onClick={() => handleStatusChange(site)}
                                >
                                  {site.status === "available"
                                    ? "Marcar como Ocupado"
                                    : "Marcar como Disponible"}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
