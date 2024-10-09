import React, { useState } from "react";
import "../../assets/css/components/search/search.css";

const SearchCamping = ({ onSearch }) => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const searchData = {
      destination,
      checkIn,
      checkOut,
      numberOfPeople,
    };

    try {
      const response = await fetch("http://localhost:3001/camping/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchData),
        credentials: "include", // Credenciales
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Resultado de la búsqueda:", data);
        onSearch(data);
      } else {
        console.error("Error en la búsqueda de campings. Código de estado: " + response.status);
      }
    } catch (error) {
      console.error("Error realizando la búsqueda:", error);
    }
  };

  return (
    <div className="search-camping-container">
      <form onSubmit={handleSubmit} className="search-camping-form">
        <input
          type="text"
          placeholder="Destino"
          className="search-input"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="date"
          placeholder="Fecha llegada"
          className="search-input"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
        <input
          type="date"
          placeholder="Fecha salida"
          className="search-input"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
        <input
          type="number"
          placeholder="Personas"
          className="search-input"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>
    </div>
  );
};

export default SearchCamping;
