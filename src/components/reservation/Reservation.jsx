import React, { useContext, useEffect } from "react";
import { Context } from "../../store/context";

export function ReservationCard() {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getReservationByUser();
    }, []);

    return( 
        <>
        hola
        </>
    )
}