import React, { useState } from "react";
import { Banner } from "../components/home/Banner";
import SearchCamping from "../components/home/SearchCamping";
import SearchResults from "../components/home/SearchResults";
import "../assets/css/components/home/home.css";

export function Home() {

  const [searchResults, setSearchResults] = useState([]);

  // Función que maneja la búsqueda y actualiza los resultados
  const handleSearch = (data) => {
    setSearchResults(data);
  };

  return (
    <>
      <div className="home-container">
        <div className="content">
          {/* Componente de búsqueda */}
          <SearchCamping onSearch={handleSearch} />
          {/* Componente que muestra los resultados */}
          <SearchResults results={searchResults} />
        </div>
      </div>
    </>
  );
}

// hay que corregir la apertura de home para que SearchResults no quede sobre el footer
