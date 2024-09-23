import React from 'react'
import { Link } from 'react-router-dom'
import { PiTentBold } from "react-icons/pi";
import { FaPlug } from "react-icons/fa";
import { TbCampfire } from "react-icons/tb";
import { FaWifi } from "react-icons/fa";

export const Booking = () => {
    return (

        <>
            <h1>Reserva</h1>
            <div className='componente'>
                <div className='reserv'>
                    <div className='text-card'>
                        <div className='photo'>
                            <img src="https://campinglospuentes.cl/wp-content/uploads/2023/01/PHOTO-2021-11-13-20-34-20.jpg" alt="" />
                        </div>
                        <div class="card mt-4" style={{ width: "26rem", height: "18rem" }}>
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
                    <div className='card-icons'>
                        <PiTentBold />
                        <FaPlug />
                        <TbCampfire />
                        <FaWifi />
                    </div>
                    <div className='card-boton'>
                        <Link to="/prereserva">
                            <button class="btn btn-success me-md-2" type="button">volver</button>
                        </Link>
                    </div>
                </div>
                <div className='pasarela-pago'>
                    <a href='https://publico.transbank.cl/'>
                        <img src="https://risi.cl/wp-content/uploads/2022/08/9386b0c2-9abb-4893-ba44-2710767a6c6c.jpg" alt="" />
                    </a>
                </div>
            </div>
        </>
    )
}
