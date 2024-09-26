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

  if (isLoading) {
    return <p>Cargando reservas...</p>;
  }

  if (!reservationsByUser || reservationsByUser.length === 0) {
    return (
      <div>
        <p>No tienes reservas aún.</p>
        <Link to="/campings">Ir a reservar</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Mis Reservas</h2>
      {reservationsByUser.map((reservation) => (
        <div key={reservation.id}>
          <p>Reserva ID: {reservation.id}</p>
          <p>Fecha inicio: {reservation.start_date}</p>
          <p>Fecha fin: {reservation.end_date}</p>
          <p>Número de personas: {reservation.number_of_people}</p>
        </div>
      ))}
    </div>
  );
}
