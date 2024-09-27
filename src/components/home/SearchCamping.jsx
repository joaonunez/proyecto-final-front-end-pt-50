import React, { useState } from 'react';

const SearchCamping = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    lugar: '',
    checkin: '',
    checkout: '',
    numPersonas: '',
    tipo: 'Camping'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <form className="search-fields" onSubmit={handleSubmit}>
      <div className="search-form-group">
        <label htmlFor="lugar">Destino:</label>
        <input
          type="text"
          id="lugar"
          name="lugar"
          className="search-form-control"
          placeholder="Ingresa tu destino"
          value={formData.lugar}
          onChange={handleChange}
        />
      </div>
      <div className="search-form-group">
        <label htmlFor="checkin">Fecha de ida:</label>
        <input
          type="date"
          id="checkin"
          name="checkin"
          className="search-form-control"
          value={formData.checkin}
          onChange={handleChange}
        />
      </div>
      <div className="search-form-group">
        <label htmlFor="checkout">Fecha de salida:</label>
        <input
          type="date"
          id="checkout"
          name="checkout"
          className="search-form-control"
          value={formData.checkout}
          onChange={handleChange}
        />
      </div>
      <div className="search-form-group">
        <label htmlFor="numPersonas">Número de Personas:</label>
        <input
          type="number"
          id="numPersonas"
          name="numPersonas"
          className="search-form-control"
          value={formData.numPersonas}
          onChange={handleChange}
        />
      </div>
      <div className="search-form-group">
        <label htmlFor="tipo">Tipo:</label>
        <select
          id="tipo"
          name="tipo"
          className="search-form-control"
          value={formData.tipo}
          onChange={handleChange}
        >
          <option value="Camping">Camping</option>
          <option value="Glamping">Glamping</option>
          <option value="Campers">Campers</option>
        </select>
      </div>
      <button type="submit" className="btn-search">
        Buscar
      </button>
    </form>
  );
};

export default SearchCamping;
