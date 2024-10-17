import React from "react";
import SearchCampingCard from "./SearchCampingCard";
import "../../assets/css/components/search/searchResults.css";

// Componente que muestra los resultados de la búsqueda
const SearchResults = ({ results }) => {
  return (
    <div className="search-results-container">
      {results.length > 0 ? (
        results.map((camping, index) => (
          <div key={index} className="camping-result">
            <SearchCampingCard camping={camping} /> {/* Pasar el objeto camping completo */}
          </div>
        ))
      ) : (
        <p>No se encontraron campings para tu criterio de búsqueda.</p>
      )}
    </div>
  );
};

export default SearchResults;
