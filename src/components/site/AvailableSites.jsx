import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AvailableSites = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center">Sitios Disponibles</h2>

      {/* Botones de los sitios */}
      <div className="d-flex flex-wrap justify-content-center mb-4">
        <button className="btn m-2" style={{ backgroundColor: '#9E9E9E' }}>Sitio 1</button>
        <button className="btn m-2" style={{ backgroundColor: '#9E9E9E' }}>Sitio 2</button>
        <button className="btn m-2" style={{ backgroundColor: '#9E9E9E' }}>Sitio 3</button>
        <button className="btn m-2" style={{ backgroundColor: '#8BC34A' }}>Sitio 5</button>
        <button className="btn m-2" style={{ backgroundColor: '#9E9E9E' }}>Sitio 20</button>
      </div>

      {/* Imagen del mapa del camping */}
      <div className="d-flex justify-content-center">
        <img 
          src="https://sendasconguillio.cl/wp-content/uploads/2023/11/Camping-Nirres-baja.jpg"
          alt="Mapa de camping" 
          className="img-fluid rounded" 
          style={{ maxWidth: '100%', maxHeight: '600px' }} 
        />
      </div>
    </div>
  );
};

export default AvailableSites;
