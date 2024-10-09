import React from "react";
import { useLocation } from "react-router-dom";
import Nav from "../components/common/Nav";
import SearchCamping from "../components/search/SearchCamping";
import SearchResults from "../components/search/SearchResults";
import "../../assets/css/components/search/searchResultsView.css";

const SearchResultsView = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];

  // Función para manejar la búsqueda desde esta vista (puede ser la misma o diferente de la que está en Home)
  const handleSearch = (data) => {
    console.log("Nueva búsqueda:", data);
    // Actualiza los resultados en SearchResults
  };

  return (
    <>
      <Nav />
      <div className="search-results-view">
        <SearchCamping onSearch={handleSearch} />
        <SearchResults results={searchResults} />
      </div>
    </>
  );
};

export default SearchResultsView;
