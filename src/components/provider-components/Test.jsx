// SearchResultsView.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import SearchCamping from "../../components/search/SearchCamping";
import SearchResults from "../../components/search/SearchResults";
import "../../assets/css/components/search/searchResultsView.css";

const SearchResultsView = () => {
  const location = useLocation();
  
  // Estado local para almacenar los resultados de búsqueda
  const [searchResults, setSearchResults] = useState(location.state?.searchResults || []);

  // Función para manejar una nueva búsqueda
  const handleSearch = (data) => {
    console.log("Nueva búsqueda:", data);
    setSearchResults(data); // Actualizamos el estado local con los nuevos resultados
  };

  return (
    <>
      <div className="search-results-view">
        <SearchCamping onSearch={handleSearch} /> {/* Pasamos la función handleSearch */}
        <SearchResults results={searchResults} /> {/* Renderizamos los resultados actualizados */}
      </div>
    </>
  );
};

export default SearchResultsView;
