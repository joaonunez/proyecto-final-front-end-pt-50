import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/context";
import { Link } from "react-router-dom";

export function ViewReserve() {
  const { store, actions } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);

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
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.camping_name}</td> 
              <td>{formatDate(reservation.start_date)}</td>
              <td>{formatDate(reservation.end_date)}</td>
              <td>{reservation.number_of_people}</td>
              <td>${reservation.total_amount}</td>
              <td>
                <button className="btn modify-btn">Modificar</button>
                <button className="btn cancel-btn">Cancelar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
