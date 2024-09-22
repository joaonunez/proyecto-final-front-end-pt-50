import React from "react";
import { Banner } from "../components/home/Banner";

export function Home() {
    return (
        <div className="home-container">
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
