import React from "react";

export function loadingCampingList() {

    return (
        <div className="d-flex align-items-center">
            <strong role="status">Cargando...</strong>
            <div className="spinner-border ms-auto" aria-hidden="true"></div>
        </div>
    )
}