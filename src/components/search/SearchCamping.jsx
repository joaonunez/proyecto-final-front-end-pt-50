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

    // Validaciones básicas
    if (!destination) {
      console.error("Destino es obligatorio");
      return;
    }

    if (isNaN(parsedNumberOfPeople) || parsedNumberOfPeople <= 0) {
      console.error("El número de personas debe ser un número mayor que 0");
      return;
    }

    // Crear el objeto de datos con los nombres de campos esperados por el backend
    const searchData = {
      destination,
      check_in: checkIn || null, // Enviar null si está vacío
      check_out: checkOut || null, // Enviar null si está vacío
      num_people: parsedNumberOfPeople, // Cambiado a num_people para coincidir con el backend
    };

    try {
      const response = await fetch("http://localhost:3001/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchData),
        credentials: "include", // Para enviar cookies
        mode: "cors", // Activar modo CORS explícitamente
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Resultado de la búsqueda:", data);
        onSearch(data); // Pasar los datos al componente padre o manejador de resultados
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
          required
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
          required
        />
        <button type="submit" className="search-button">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default SearchCamping;
