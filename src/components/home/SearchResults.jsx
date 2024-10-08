import React from "react";
import { CampingCard } from "../camping/camping-card";

// Componente que muestra los resultados de la búsqueda
const SearchResults = ({ results }) => {
  return (
    <div className="search-results-container">
      {results.length > 0 ? (
        results.map((camping, index) => (
          <div key={index} className="camping-result">
            <CampingCard
              id={camping.camping_id} // Asegúrate de que el id del camping sea correcto
              name={camping.camping_name}
              region={camping.region}
              comuna={camping.comuna}
              availableSites={camping.available_sites_count} // Sitios disponibles
            />
          </div>
        ))
      ) : (
        <p>No campings found for your search criteria.</p>
      )}
    </div>
  );
};

export default SearchResults;
