import React, { useState } from "react";
import "../../assets/css/components/search/search.css";

const SearchCamping = ({ onSearch }) => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convertir el número de personas a un entero
    const parsedNumberOfPeople = parseInt(numberOfPeople, 10);

    // Verificar si el número de personas es válido
    if (isNaN(parsedNumberOfPeople) || parsedNumberOfPeople <= 0) {
      console.error("El número de personas debe ser un número mayor que 0");
      return;
    }

    // Construir el objeto de búsqueda para enviar al backend
    const searchData = {
      destination,            // Campo de búsqueda por destino
      checkIn,                // Fecha de entrada
      checkOut,               // Fecha de salida
      numPeople: parsedNumberOfPeople,  // Número de personas
    };

    try {
      // Realizar la solicitud al backend
      const response = await fetch("http://localhost:3001/join/search", {  //  nueva ruta
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchData),
        credentials: "include",  // Mantener el uso de credenciales si es necesario
      });
      
      if (response.ok) {
        const data = await response.json();  // Parsear la respuesta del backend
        console.log("Resultado de la búsqueda:", data);
        onSearch(data);  // Pasar los resultados a la función onSearch
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
