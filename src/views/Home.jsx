import React from "react";
import { Banner } from "../components/home/Banner";
import '../assets/css/components/home/home.css';
import { Footter } from "../components/footter/Footter";


export function Home() {
    return (
        <div className="home-container">
            {/* Video de fondo */}
            <video autoPlay loop muted playsInline className="background-video">
                <source src="https://catarsiscreativa.com/camping_app/img/back_video_camping_4.mp4" type="video/mp4" />
                Tu navegador no soporta la etiqueta de video.
            </video>

            <div className="content">
                <div className="search-form">
                    <h2>Encuentra tu próxima aventura</h2>
                    <form className="search-fields">
                        <div className="form-group">
                            <label htmlFor="destino">Destino:</label>
                            <input type="text" id="destino" className="form-control" placeholder="Ingresa tu destino" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="fecha">Fecha de ida:</label>
                            <input type="date" id="fecha" className="form-control" />
                        </div>
                        <button type="submit" className="btn-search">
                            Buscar
                        </button>
                    </form>
                </div>
                <Banner /> 
            </div>
        </div>
    );
}
