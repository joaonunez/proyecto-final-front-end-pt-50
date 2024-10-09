import React from "react";
import { Banner } from "../components/home/Banner";
import SearchCamping from "../components/search/SearchCamping";
import "../assets/css/components/home/home.css";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  // Función que maneja la búsqueda y redirige a SearchResultsView con los resultados
  const handleSearch = (data) => {
    navigate("/search-results", { state: { searchResults: data } });
  };

  return (
    <>
      <div className="home-container">
        <div className="content">
          {/* Componente de búsqueda */}
          <SearchCamping onSearch={handleSearch} />
        </div>
      </div>
      <Banner />
    </>
  );
}

export default Home;
