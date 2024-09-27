import React from 'react';

const SearchResults = ({ results }) => {
  return (
    <div>
      {results.length > 0 ? (
        results.map((result) => (
          <div key={result.id}>
            {/* Renderiza los detalles del camping segun el comp. SearchCamping*/}
            <h3>{result.name}</h3>
            <p>{result.region}, {result.comuna}</p>
            <p>Tipo: {result.type}</p>
          </div>
        ))
      ) : (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default SearchResults;
