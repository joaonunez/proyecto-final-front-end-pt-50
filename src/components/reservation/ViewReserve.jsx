import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/context";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export function ViewReserve() {
  const { store, actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      const success = await actions.getReservationsByUserId(store.user.id);
      setIsLoading(false);
      if (!success) {
        Swal.fire(
          "Error",
          store.error || "No se pudieron cargar las reservas.",
          "error"
        );
      }
    };
    fetchReservations();
  }, []);

  const { reservationsByUser } = store;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleCancel = async (reservationId) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cancelar!",
      cancelButtonText: "No, mantener",
    });

    if (result.isConfirmed) {
      const { value: password } = await Swal.fire({
        title: "Confirma tu identidad",
        input: "password",
        inputLabel: "Ingresa tu contraseña para confirmar la cancelación",
        inputPlaceholder: "Contraseña",
        showCancelButton: true,
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
        preConfirm: (password) => {
          if (!password) {
            Swal.showValidationMessage("Debes ingresar tu contraseña");
          }
        },
      });

      if (password) {
        const success = await actions.deleteReservation(
          reservationId,
          password
        );
        if (success) {
          Swal.fire("Cancelada!", "Tu reserva ha sido cancelada.", "success");
          actions.getReservationsByUserId(store.user.id);
        } else {
          Swal.fire(
            "Error!",
            "Hubo un problema al cancelar tu reserva. Verifica tu contraseña.",
            "error"
          );
        }
      }
    }
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

  if (!reservationsByUser || reservationsByUser.length === 0) {
    return (
      <div className="no-reservations">
        <p>No tienes reservas aún.</p>
        <Link to="/campings" className="link-to-reserve">
          Ir a reservar
        </Link>
      </div>
    );
  }

  return (
    <div className="reservations-container">
      <h2 className="reservations-title">Mis Reservas</h2>
      <table className="reservations-table">
        <thead>
          <tr>
            <th>ID Reserva</th>
            <th>Camping</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Número de Personas</th>
            <th>Monto Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservationsByUser.map((reservation) => (
            <React.Fragment key={reservation.id}>
              <tr>
                <td>{reservation.id}</td>
                <td>
                  {reservation.camping?.name || reservation.site?.camping_name}
                </td>
                <td>{formatDate(reservation.start_date)}</td>
                <td>{formatDate(reservation.end_date)}</td>
                <td>{reservation.number_of_people}</td>
                <td>${reservation.total_amount}</td>
                <td>
                  <button className="btn modify-btn">Modificar</button>
                  <button
                    className="btn cancel-btn"
                    onClick={() => handleCancel(reservation.id)}
                  >
                    Cancelar
                  </button>
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
                  <td colSpan="7">
                    <div className="reservation-details-container">
                      <h5 className="reservation-details-title">
                        <strong>Detalles de la Reserva</strong>
                      </h5>
                      <p>
                        <strong>Cliente:</strong> {reservation.user.first_name}{" "}
                        {reservation.user.last_name}
                      </p>
                      <p>
                        <strong>Camping:</strong> {reservation.camping?.name}
                      </p>
                      <p>
                        <strong>Dirección:</strong>{" "}
                        {reservation.camping?.address}
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

                      {/* Renderizar los servicios seleccionados */}
                      <p>
                        <strong>Servicios Seleccionados:</strong>
                      </p>
                      {reservation.selected_services?.length > 0 ? (
                        <ul>
                          {reservation.selected_services.map(
                            (service, index) => (
                              <li key={index}>{service}</li> // Renderiza el nombre de los servicios seleccionados
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
                        <strong>Descripción del Camping:</strong>{" "}
                        {reservation.camping?.description || "No disponible"}
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
