import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/context";

export function CreateCampingForm() {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    campingName: "",
    razonSocial: "",
    rut: "",
    region: "",
    comuna: "",
    email: "",
    telefono: "",
    direccion: "",
    paginaWeb: "",
    descripcion: "",
    googleMaps: "",
    logo: null,
    galeriaFotos: null,
  });

  const comunasData = {
    "Arica y Parinacota": ["Arica", "Putre"],
    "Tarapacá": ["Iquique", "Alto Hospicio", "Pica", "Huara"],
    "Antofagasta": ["Antofagasta", "Calama", "Tocopilla", "Mejillones"],
    "Atacama": ["Copiapó", "Chañaral", "Vallenar", "Tierra Amarilla"],
    "Coquimbo": ["La Serena", "Coquimbo", "Vicuña", "Illapel"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "San Antonio"],
    "Metropolitana": ["Santiago", "Maipú", "La Florida", "Puente Alto", "Providencia"],
    "Libertador General Bernardo O'Higgins": ["Rancagua", "Machalí", "Pichidegua"],
    "Maule": ["Talca", "Curicó", "Linares", "Maule"],
    "Ñuble": ["Chillán", "San Carlos", "Pemuco"],
    "Biobío": ["Concepción", "Talcahuano", "Los Ángeles"],
    "La Araucanía": ["Temuco", "Pucón", "Villarrica"],
    "Los Ríos": ["Valdivia", "La Unión", "Lago Ranco"],
    "Los Lagos": ["Puerto Montt", "Puerto Varas", "Osorno"],
    "Aysén": ["Coyhaique", "Puerto Aysén"],
    "Magallanes y de la Antártica Chilena": ["Punta Arenas", "Puerto Natales"],
  };

  const [region, setRegion] = useState('');
  const [comuna, setComuna] = useState('');

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
    setComuna('');  // Reinicia la comuna seleccionada al cambiar la región
  };

  const handleChange = (e) => {
    const { id: inputId, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [inputId]: value }));
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: files[0] }));
  };

  const handleMultiFileChange = (e) => {
    const { id, files } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aquí se realizaría la lógica de enviar los datos para crear el camping
    const created = await actions.createCamping(formData);
    if (created) {
      navigate("/provider-management");
    } else {
      alert("Error al crear el camping.");
    }
  };

  return (
    <div className='Fcamping'>
      <div className="titulo">
        <h3>Registrar nuevo Camping</h3>
      </div>
      <form className="row g-4 mt-5" onSubmit={handleSubmit}>
        <div className="col-md-5">
          <label htmlFor="campingName" className="form-label">Nombre del Camping</label>
          <input type="text" className="form-control" id="campingName" required value={formData.campingName} onChange={handleChange} />
        </div>
        <div className="col-md-5">
          <label htmlFor="razonSocial" className="form-label">Razón Social</label>
          <input type="text" className="form-control" id="razonSocial" required value={formData.razonSocial} onChange={handleChange} />
        </div>
        <div className="col-md-5">
          <label htmlFor="rut" className="form-label">Rut</label>
          <input type="text" className="form-control" id="rut" required value={formData.rut} onChange={handleChange} />
        </div>
        <div className="col-md-5">
          <label htmlFor="region" className="form-label">Región</label>
          <select className="form-control" id="region" required value={region} onChange={handleRegionChange}>
            <option value="" disabled>Seleccione una región</option>
            {Object.keys(comunasData).map((reg) => (
              <option key={reg} value={reg}>{reg}</option>
            ))}
          </select>
        </div>
        <div className="col-md-5">
          <label htmlFor="comuna" className="form-label">Comuna</label>
          <select 
            className="form-control" 
            id="comuna" 
            required 
            value={comuna} 
            onChange={(e) => setComuna(e.target.value)}
            disabled={!region}  // Deshabilita si no se ha seleccionado una región
          >
            <option value="" disabled>Seleccione una comuna</option>
            {region && comunasData[region].map((com) => (
              <option key={com} value={com}>{com}</option>
            ))}
          </select>
        </div>
        <div className="col-md-5">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" required value={formData.email} onChange={handleChange} />
        </div>
        <div className="col-md-5">
          <label htmlFor="telefono" className="form-label">Teléfono</label>
          <input type="tel" className="form-control" id="telefono" required value={formData.telefono} onChange={handleChange} />
        </div>
        <div className="col-md-5">
          <label htmlFor="direccion" className="form-label">Dirección</label>
          <input type="text" className="form-control" id="direccion" required value={formData.direccion} onChange={handleChange} />
        </div>
        <div className="col-md-5">
          <label htmlFor="paginaWeb" className="form-label">Página Web</label>
          <input type="url" className="form-control" id="paginaWeb" required value={formData.paginaWeb} onChange={handleChange} />
        </div>
        <div className="col-md-5">
          <label htmlFor="logo" className="form-label">Logo</label>
          <input type="file" className="form-control" id="logo" required onChange={handleFileChange} />
        </div>
        <div className="col-md-5">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <textarea className="form-control" id="descripcion" required value={formData.descripcion} onChange={handleChange}></textarea>
        </div>
        <div className="col-md-5">
          <label htmlFor="galeriaFotos" className="form-label">Galería de Fotos</label>
          <input type="file" className="form-control" id="galeriaFotos" multiple required onChange={handleMultiFileChange} />
        </div>
        <div className="col-md-5">
          <label htmlFor="googleMaps" className="form-label">Google Maps</label>
          <input type="url" className="form-control" id="googleMaps" required value={formData.googleMaps} onChange={handleChange} />
        </div>
        <div className="col-12">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button className="btn btn-warning me-md-2" type="submit">Registrar Camping</button>
          </div>
        </div>
      </form>
    </div>
  );
}
