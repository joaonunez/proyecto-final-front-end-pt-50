import React, { useState } from 'react';
import SearchCamping from '../components/home/SearchCamping';
import SearchResults from '../components/home/SearchResults';
import '../assets/css/components/home/home.css';

export function Home() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (criteria) => {
    try {
      // Hacer la búsqueda en la base de datos según los criterios y actualizar los resultados.
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(criteria),
      });
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error realizando la búsqueda:', error);
    }
  };

  return (
    <>
      <div className="home-container">
        <div className="content">
          <SearchCamping onSearch={handleSearch} />
        </div>
      </div>
      <SearchResults results={searchResults} />
    </>
  );
}
