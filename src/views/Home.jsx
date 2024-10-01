import React from "react";
import { Banner } from "../components/home/Banner";
import "../assets/css/components/home/home.css";

export function Home() {
  return (
    <>
      <div className="home-container">
        <div className="content">
          <div className="search-form">
            <h2>Encuentra tu próxima aventura</h2>
            <form className="search-fields">
              <div className="search-form-group">
                <label htmlFor="destino">Destino:</label>
                <input
                  type="text"
                  id="destino"
                  className="search-form-control"
                  placeholder="Ingresa tu destino"
                />
              </div>
              <div className="search-form-group">
                <label htmlFor="fecha">Fecha de ida:</label>
                <input type="date" id="fecha" className="search-form-control" />
              </div>
              <button type="submit" className="btn-search">
                Buscar
              </button>
            </form>
          </div>
        </div>
      </div>
      <Banner />
    </>
  );
}
