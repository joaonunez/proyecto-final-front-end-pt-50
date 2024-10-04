import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/context";
import Swal from "sweetalert2";

export function ViewReservationsProvider() {
  const { store, actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      await actions.getReservationsByProviderInCampings(store.user.id);
      setIsLoading(false);
    };
    fetchReservations();
  }, [store.user.id]);

  const { reservationsByProvider } = store;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleExpandRow = (reservationId) => {
    if (expandedRow === reservationId) {
      setExpandedRow(null);
    } else {
      setExpandedRow(reservationId);
    }
  };

  if (isLoading) {
    return <p className="loading-text">Cargando reservas...</p>;
  }

  if (!reservationsByProvider || reservationsByProvider.length === 0) {
    return (
      <div className="no-reservations">
        <p>No se encontraron reservas para este proveedor.</p>
      </div>
    );
  }

  return (
    <div className="reservations-container">
      <h2 className="reservations-title">Reservas en mis Campings</h2>
      <table className="reservations-table">
        <thead>
          <tr>
            <th>ID Reserva</th>
            <th>Cliente</th>
            <th>Camping</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Número de Personas</th>
            <th>Monto Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservationsByProvider.map((reservation) => (
            <React.Fragment key={reservation.id}>
              <tr>
                <td>{reservation.id}</td>
                <td>
                  {reservation.user.first_name} {reservation.user.last_name}
                </td>
                <td>
                  {reservation.camping?.name || reservation.site?.camping_name}
                </td>
                <td>{formatDate(reservation.start_date)}</td>
                <td>{formatDate(reservation.end_date)}</td>
                <td>{reservation.number_of_people}</td>
                <td>${reservation.total_amount}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleExpandRow(reservation.id)}
                  >
                    {expandedRow === reservation.id
                      ? "Ocultar Detalles"
                      : "Ver Detalles"}
                  </button>
                </td>
              </tr>
              {expandedRow === reservation.id && (
                <tr>
                  <td colSpan="8">
                    <div className="reservation-details-container">
                      <h5 className="reservation-details-title">
                        <strong>Detalles de la Reserva</strong>
                      </h5>
                      <p>
                        <strong>Cliente:</strong> {reservation.user.first_name}{" "}
                        {reservation.user.last_name}
                      </p>
                      <p>
                        <strong>Camping:</strong>{" "}
                        {reservation.camping?.name ||
                          reservation.site?.camping_name}
                      </p>
                      <p>
                        <strong>Dirección:</strong>{" "}
                        {reservation.camping?.address ||
                          reservation.site?.camping?.address}
                      </p>
                      <p>
                        <strong>Fecha Inicio:</strong> {reservation.start_date}
                      </p>
                      <p>
                        <strong>Fecha Fin:</strong> {reservation.end_date}
                      </p>
                      <p>
                        <strong>Número de Personas:</strong>{" "}
                        {reservation.number_of_people}
                      </p>
                      <p>
                        <strong>Servicios Seleccionados:</strong>
                      </p>
                      {reservation.selected_services?.length > 0 ? (
                        <ul>
                          {reservation.selected_services.map(
                            (service, index) => (
                              <li key={index}>{service}</li> // Renderizar solo el nombre del servicio
                            )
                          )}
                        </ul>
                      ) : (
                        <p>No hay servicios seleccionados.</p>
                      )}
                      <p>
                        <strong>Monto Total:</strong> $
                        {reservation.total_amount}
                      </p>
                      <p>
                        <strong>Imágenes del Camping:</strong>
                      </p>
                      {Array.isArray(reservation.camping?.images) &&
                      reservation.camping.images.length > 0 ? (
                        <ul>
                          {reservation.camping.images.map((image, index) => (
                            <li key={index}>
                              <img
                                src={image}
                                alt={`Camping Image ${index}`}
                                className="reservation-image"
                              />
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>No hay imágenes disponibles.</p>
                      )}
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
