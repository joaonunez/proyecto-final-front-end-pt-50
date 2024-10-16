import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/context";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

export function CreateCampingForm() {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  // Estado inicial para los datos del formulario
  const [formData, setFormData] = useState({
    campingName: "",
    razonSocial: "",
    rut: "",
    telefono: "",
    direccion: "",
    paginaWeb: "",
    descripcion: "",
    googleMaps: "",
    landscape: "",
    type: "",
    comuna: "",
    region: "",
    rules: [],
    images: [],
    services: [],
    main_image: "",
  });

  const [newRule, setNewRule] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newService, setNewService] = useState({ name: "", price: "" });

  // Comunas de Chile
  const comunasData = {
    "Arica y Parinacota": [
        "Arica",
        "Putre"
    ],
    "Tarapacá": [
        "Iquique",
        "Alto Hospicio",
        "Pica",
        "Huara"
    ],
    "Antofagasta": [
        "Antofagasta",
        "Calama",
        "Tocopilla",
        "Mejillones"
    ],
    "Atacama": [
        "Copiapó",
        "Chañaral",
        "Vallenar",
        "Tierra Amarilla"
    ],
    "Coquimbo": [
        "La Serena",
        "Coquimbo",
        "Vicuña",
        "Illapel"
    ],
    "Valparaíso": [
        "Valparaíso",
        "Viña del Mar",
        "Quilpué",
        "San Antonio"
    ],
    "Metropolitana": [
        "Santiago",
        "Maipú",
        "Las Condes",
        "La Florida"
    ],
    "Libertador General Bernardo O'Higgins": [
        "Rancagua",
        "Machalí",
        "Pichidegua"
    ],
    "Maule": [
        "Talca",
        "Curicó",
        "Linares",
        "Maule"
    ],
    "Ñuble": [
        "Chillán",
        "San Carlos",
        "Pemuco"
    ],
    "Biobío": [
        "Concepción",
        "Talcahuano",
        "Los Ángeles"
    ],
    "La Araucanía": [
        "Temuco",
        "Pucón",
        "Villarrica"
    ],
    "Los Ríos": [
        "Valdivia",
        "La Unión",
        "Lago Ranco"
    ],
    "Los Lagos": [
        "Puerto Montt",
        "Puerto Varas",
        "Osorno"
    ],
    "Aysén": [
        "Coyhaique",
        "Puerto Aysén"
    ],
    "Magallanes y de la Antártica Chilena": [
        "Punta Arenas",
        "Puerto Natales"
    ]
}
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setValidationErrors((prevErrors) => ({ ...prevErrors, [id]: "" })); // Limpiar error al escribir
  };

  const handleRegionChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      region: e.target.value,
      comuna: "",
    }));
  };

  const addRule = () => {
    if (newRule.trim()) {
      setFormData((prevState) => ({
        ...prevState,
        rules: [...prevState.rules, newRule],
      }));
      setNewRule("");
    }
  };

  const deleteRule = (index) => {
    const updatedRules = formData.rules.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      rules: updatedRules,
    }));
  };

  const addImage = () => {
    if (newImage.trim()) {
      setFormData((prevState) => ({
        ...prevState,
        images: [...prevState.images, newImage],
      }));
      setNewImage("");
    }
  };

  const deleteImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  const addService = () => {
    if (newService.name.trim() && newService.price.trim()) {
      setFormData((prevState) => ({
        ...prevState,
        services: [...prevState.services, newService],
      }));
      setNewService({ name: "", price: "" });
    }
  };

  const deleteService = (index) => {
    const updatedServices = formData.services.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      services: updatedServices,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    for (const key in formData) {
      if (formData.hasOwnProperty(key) && (typeof formData[key] === 'string' && formData[key].trim() === '') || 
          (Array.isArray(formData[key]) && formData[key].length === 0)) {
        errors[key] = "Este campo es obligatorio";
      }
    }
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    Swal.fire({ // Mostrar SweetAlert de carga
      title: 'Creando camping...',
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
    });

    try {
      const created = await actions.createCamping(formData);
      if (created) {
        Swal.fire({ // Mostrar SweetAlert de éxito
          icon: 'success',
          title: '¡Camping creado!',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          navigate("/provider-dashboard"); // Redirigir después de que se cierre la alerta
        });
      } else {
        Swal.fire({ // Mostrar SweetAlert de error
          icon: 'error',
          title: 'Error al crear el camping',
          text: 'Por favor, inténtalo de nuevo.'
        });
      }
    } catch (error) {
      console.error("Error al crear el camping:", error);
      Swal.fire({ // Mostrar SweetAlert de error en caso de excepción
        icon: 'error',
        title: 'Error al crear el camping',
        text: 'Por favor, inténtalo de nuevo.'
      });
    }
  };

  return (
    <>
    <div className="edit-camping-form">
    <h3 className="create-camping-title text-center">Registrar nuevo Camping</h3>
    <form className="row g-4 mt-5" onSubmit={handleSubmit}>
      {/* Nombre del Camping */}
      <div className="col-md-5">
        <label htmlFor="campingName" className="form-label">Nombre del Camping</label>
        <input
          type="text"
          className={`form-control ${validationErrors.campingName ? "is-invalid" : ""}`}
          id="campingName"
          value={formData.campingName}
          onChange={handleChange}
          required
        />
        {validationErrors.campingName && (
          <div className="invalid-feedback">{validationErrors.campingName}</div>
        )}
      </div>

      {/* Razón Social */}
      <div className="col-md-5">
        <label htmlFor="razonSocial" className="form-label">Razón Social</label>
        <input
          type="text"
          className={`form-control ${validationErrors.razonSocial ? "is-invalid" : ""}`}
          id="razonSocial"
          value={formData.razonSocial}
          onChange={handleChange}
          required
        />
        {validationErrors.razonSocial && (
          <div className="invalid-feedback">{validationErrors.razonSocial}</div>
        )}
      </div>

      {/* Rut */}
      <div className="col-md-5">
        <label htmlFor="rut" className="form-label">Rut</label>
        <input
          type="text"
          className={`form-control ${validationErrors.rut ? "is-invalid" : ""}`}
          id="rut"
          value={formData.rut}
          onChange={handleChange}
          required
        />
        {validationErrors.rut && (
          <div className="invalid-feedback">{validationErrors.rut}</div>
        )}
      </div>

      {/* Teléfono */}
      <div className="col-md-5">
        <label htmlFor="telefono" className="form-label">Teléfono</label>
        <input
          type="tel"
          className={`form-control ${validationErrors.telefono ? "is-invalid" : ""}`}
          id="telefono"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
        {validationErrors.telefono && (
          <div className="invalid-feedback">{validationErrors.telefono}</div>
        )}
      </div>

      {/* Dirección */}
      <div className="col-md-5">
        <label htmlFor="direccion" className="form-label">Dirección</label>
        <input
          type="text"
          className={`form-control ${validationErrors.direccion ? "is-invalid" : ""}`}
          id="direccion"
          value={formData.direccion}
          onChange={handleChange}
          required
        />
        {validationErrors.direccion && (
          <div className="invalid-feedback">{validationErrors.direccion}</div>
        )}
      </div>

      {/* Página Web */}
      <div className="col-md-5">
        <label htmlFor="paginaWeb" className="form-label">Página Web</label>
        <input
          type="url"
          className={`form-control ${validationErrors.paginaWeb ? "is-invalid" : ""}`}
          id="paginaWeb"
          value={formData.paginaWeb}
          onChange={handleChange}
          required
        />
        {validationErrors.paginaWeb && (
          <div className="invalid-feedback">{validationErrors.paginaWeb}</div>
        )}
      </div>

      {/* Descripción */}
      <div className="col-md-5">
        <label htmlFor="descripcion" className="form-label">Descripción</label>
        <textarea
          className={`form-control ${validationErrors.descripcion ? "is-invalid" : ""}`}
          id="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
        {validationErrors.descripcion && (
          <div className="invalid-feedback">{validationErrors.descripcion}</div>
        )}
      </div>

      {/* Google Maps */}
      <div className="col-md-5">
        <label htmlFor="googleMaps" className="form-label">Google Maps</label>
        <input
          type="url"
          className={`form-control ${validationErrors.googleMaps ? "is-invalid" : ""}`}
          id="googleMaps"
          value={formData.googleMaps}
          onChange={handleChange}
          required
        />
        {validationErrors.googleMaps && (
          <div className="invalid-feedback">{validationErrors.googleMaps}</div>
        )}
      </div>

      {/* Paisaje */}
      <div className="col-md-5">
        <label htmlFor="landscape" className="form-label">Paisaje</label>
        <input
          type="text"
          className={`form-control ${validationErrors.landscape ? "is-invalid" : ""}`}
          id="landscape"
          value={formData.landscape}
          onChange={handleChange}
          required
        />
        {validationErrors.landscape && (
          <div className="invalid-feedback">{validationErrors.landscape}</div>
        )}
      </div>

      {/* Tipo */}
      <div className="col-md-5">
        <label htmlFor="type" className="form-label">Tipo</label>
        <input
          type="text"
          className={`form-control ${validationErrors.type ? "is-invalid" : ""}`}
          id="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
        {validationErrors.type && (
          <div className="invalid-feedback">{validationErrors.type}</div>
        )}
      </div>

      {/* Región */}
      <div className="col-md-5">
        <label htmlFor="region" className="form-label">Región</label>
        <select
          className={`form-control ${validationErrors.region ? "is-invalid" : ""}`}
          id="region"
          value={formData.region}
          onChange={handleRegionChange}
          required
        >
          <option value="" disabled>Seleccione una región</option>
          {Object.keys(comunasData).map((region) => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
        {validationErrors.region && (
          <div className="invalid-feedback">{validationErrors.region}</div>
        )}
      </div>

      {/* Comuna */}
      <div className="col-md-5">
        <label htmlFor="comuna" className="form-label">Comuna</label>
        <select
          className={`form-control ${validationErrors.comuna ? "is-invalid" : ""}`}
          id="comuna"
          value={formData.comuna}
          onChange={(e) => setFormData({ ...formData, comuna: e.target.value })}
          required
        >
          <option value="" disabled>Seleccione una comuna</option>
          {formData.region && comunasData[formData.region].map((comuna) => (
            <option key={comuna} value={comuna}>{comuna}</option>
          ))}
        </select>
        {validationErrors.comuna && (
          <div className="invalid-feedback">{validationErrors.comuna}</div>
        )}
      </div>

      {/* Sección de Reglas */}
      <div className="col-md-12">
        <label className="form-label">Agregar Reglas</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
            placeholder="Ingresa una nueva regla"
          />
          <button type="button" className="btn btn-success" onClick={addRule}>Agregar</button>
        </div>
        {validationErrors.rules && (
          <div className="invalid-feedback d-block">{validationErrors.rules}</div>
        )}
        <ul className="list-group mt-3">
          {formData.rules.map((rule, index) => (
            <li key={index} className="list-group-item">
              {rule}
              <button type="button" className="btn btn-danger float-end" onClick={() => deleteRule(index)}>
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>

        {/* Sección de Imágenes */}
<div className="col-md-12">
  <label className="form-label">Agregar URLs de Imágenes</label>
  <div className="input-group">
    <input
      type="url"
      className="form-control"
      value={newImage}
      onChange={(e) => setNewImage(e.target.value)}
      placeholder="Ingresa la URL de la imagen"
    />
    <button type="button" className="btn btn-success" onClick={addImage}>
      Agregar
    </button>
  </div>
  {validationErrors.images && (
    <div className="invalid-feedback d-block">{validationErrors.images}</div>
  )}
  <ul className="list-group mt-3">
    {formData.images.map((image, index) => (
      <li key={index} className="list-group-item">
        {image}
        <button type="button" className="btn btn-danger float-end" onClick={() => deleteImage(index)}>
          <FaTrash />
        </button>
      </li>
    ))}
  </ul>
</div>

        {/* Imagen Principal */}
        <div className="col-md-5">
          <label htmlFor="main_image" className="form-label">
            URL de la Imagen Principal
          </label>
          <input
            type="url"
            className={`form-control ${validationErrors.main_image ? "is-invalid" : ""}`}
            id="main_image"
            value={formData.main_image}
            onChange={handleChange}
            placeholder="Ingresa la URL de la imagen principal"
            required
          />
          {validationErrors.main_image && (
            <div className="invalid-feedback">{validationErrors.main_image}</div>
          )}
        </div>


        {/* Sección de Servicios */}
        <div className="col-md-12">
          <label className="form-label">Agregar Servicios</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre del servicio"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Precio del servicio"
              value={newService.price}
              onChange={(e) => setNewService({ ...newService, price: e.target.value })}
            />
            <button type="button" className="btn btn-success" onClick={addService}>
              Agregar
            </button>
          </div>
          {validationErrors.services && (
    <div className="invalid-feedback d-block">{validationErrors.services}</div>
  )}
  <ul className="list-group mt-3">
    {formData.services.map((service, index) => (
      <li key={index} className="list-group-item">
        {service.name}: ${service.price}
        <button type="button" className="btn btn-danger float-end" onClick={() => deleteService(index)}>
          <FaTrash />
        </button>
      </li>
    ))}
  </ul>
</div>


        <div className="col-12 d-grid gap-2 d-md-flex justify-content-md-end">
          <button
            className="btn btn-warning edit-camping-btn-save"
            type="submit" >Registrar Camping</button>
            <Link to="/">
            <button
            className="btn btn-warning edit-camping-btn-back"
            type="button" >Volver</button>
            </Link>
          
        </div>
      </form>
    </div>
    </>
  );
}
