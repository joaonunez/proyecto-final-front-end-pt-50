import React, { useContext, useEffect } from "react";
import { Context } from "../../store/context";

export function ReservationCard() {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getReservationByUser();
    }, []);

    return( 
        <>
        {/* <div className="container-card-reservations">
            {store.reservations.lenght > 0 ? (
                store.reservations.map((reservation, reservation.id) => (
                    <div key={reservation.id} className="reservation-info">
                        <h3>{reservation.name}</h3>
                        <span>{reservation.date}</span>
                    </div>
                ))
            )}
        </div> */}
        </>
    )
}