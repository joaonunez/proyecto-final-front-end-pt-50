import React, { useState } from "react";

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
        credentials: "include", // Agregado para enviar credenciales si es necesario
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Resultado de la búsqueda:", data);
        onSearch(data); // Llama a la función onSearch con los resultados
      } else {
        console.error("Error en la búsqueda de campings. Código de estado: " + response.status);
      }
    } catch (error) {
      console.error("Error realizando la búsqueda:", error);
    }
  };

  return (
    <div className="search-camping-container"> {/* Contenedor para encapsular el formulario */}
      <form onSubmit={handleSubmit} className="search-camping-form"> {/* Añadido una clase CSS */}
        <input
          type="text"
          placeholder="Destino"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <input
          type="date"
          placeholder="Check-in"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
        <input
          type="date"
          placeholder="Check-out"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
        <input
          type="number"
          placeholder="Número de personas"
          value={numberOfPeople}
          onChange={(e) => setNumberOfPeople(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default SearchCamping;
