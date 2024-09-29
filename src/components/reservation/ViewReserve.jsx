import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/context";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { ReservationDetails } from "../modals/ReservationDetailsModal";

export function ViewReserve() {
  const { store, actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null); // Para controlar la fila expandida

  useEffect(() => {
    const fetchReservations = async () => {
      await actions.getReservationsByUserId(store.user.id);
      setIsLoading(false);
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
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar!',
      cancelButtonText: 'No, mantener'
    });

    if (result.isConfirmed) {
      const { value: password } = await Swal.fire({
        title: 'Confirma tu identidad',
        input: 'password',
        inputLabel: 'Ingresa tu contraseña para confirmar la cancelación',
        inputPlaceholder: 'Contraseña',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        preConfirm: (password) => {
          if (!password) {
            Swal.showValidationMessage('Debes ingresar tu contraseña');
          }
        }
      });

      if (password) {
        const success = await actions.deleteReservation(reservationId, password);
        if (success) {
          Swal.fire(
            'Cancelada!',
            'Tu reserva ha sido cancelada.',
            'success'
          );
          actions.getReservationsByUserId(store.user.id);
        } else {
          Swal.fire(
            'Error!',
            'Hubo un problema al cancelar tu reserva. Verifica tu contraseña.',
            'error'
          );
        }
      }
    }
  };

  const handleExpandRow = (reservationId) => {
    if (expandedRow === reservationId) {
      setExpandedRow(null); // Contrae la fila si se hace clic nuevamente
    } else {
      setExpandedRow(reservationId); // Expande la fila seleccionada
    }
  };

  if (isLoading) {
    return <p className="loading-text">Cargando reservas...</p>;
  }

  if (!reservationsByUser || reservationsByUser.length === 0) {
    return (
      <div className="no-reservations">
        <p>No tienes reservas aún.</p>
        <Link to="/campings" className="link-to-reserve">Ir a reservar</Link>
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
                <td>{reservation.camping_name}</td>
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
                    {expandedRow === reservation.id ? 'Ocultar Detalles' : 'Ver Detalles'}
                  </button>
                </td>
              </tr>
              {expandedRow === reservation.id && (
                <tr>
                  <td colSpan="7">
                    <ReservationDetails reservationId={reservation.id} actions={actions} />
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
