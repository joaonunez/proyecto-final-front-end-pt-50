import React from 'react'
import { Link } from 'react-router-dom'
import { PiTentBold } from "react-icons/pi";
import { FaPlug } from "react-icons/fa";
import { TbCampfire } from "react-icons/tb";
import { FaWifi } from "react-icons/fa";

export const Prereserva = () => {
  return (
    <>
      <h1>Pre-Reserva</h1>
      <div className="Prereserva mt-5">
        <div className='photo'>
          <img src="https://campinglospuentes.cl/wp-content/uploads/2023/01/PHOTO-2021-11-13-20-34-20.jpg" alt="" />

        </div>
        <div className="detalle">
          <h3>Detalles de Reserva</h3>
          <div class="card" style={{ width: "28rem" }}>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Camping: </li>
              <li class="list-group-item">Fecha de Entrada: </li>
              <li class="list-group-item">Fecha de Salida: </li>
              <li class="list-group-item">Sitio: </li>
              <li class="list-group-item">Personas: </li>
              <li class="list-group-item">Adicionales: </li>
            </ul>
          </div>
        </div>
        <div className='iconos'>
          <PiTentBold />
          <FaPlug />
          <TbCampfire />
          <FaWifi />
        </div>
        <div className='boton'>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <Link to="/booking">
            <button class="btn btn-success me-md-2" type="button">confirmar</button>
            </Link>
          </div>
        </div>
      </div>

    </>




  )
}
