import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/context";
import { FaTrash } from "react-icons/fa";
import Swal from 'sweetalert2';
export function FormEditCamping({ campingId, providerId }) {
  const {
    store: {
      campingVisitForEdit,
      rulesRequesteds,
      imagesRequesteds,
      servicesRequesteds,
      mainImageRequested,
    },
    actions,
  } = useContext(Context);

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

  // Estado del formulario
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

  useEffect(() => {
    if (campingVisitForEdit && campingVisitForEdit.id === parseInt(campingId)) {
      const imagesData = Array.isArray(imagesRequesteds)
        ? imagesRequesteds
        : imagesRequesteds.split(",");

      const servicesData = Array.isArray(servicesRequesteds)
        ? servicesRequesteds
        : [];

      console.log("Services loaded into formData:", servicesData);
      setFormData({
        campingName: campingVisitForEdit.name || "",
        razonSocial: campingVisitForEdit.razon_social || "",
        rut: campingVisitForEdit.camping_rut || "",
        telefono: campingVisitForEdit.phone || "",
        direccion: campingVisitForEdit.address || "",
        paginaWeb: campingVisitForEdit.url_web || "",
        descripcion: campingVisitForEdit.description || "",
        googleMaps: campingVisitForEdit.url_google_maps || "",
        landscape: campingVisitForEdit.landscape || "",
        type: campingVisitForEdit.type || "",
        comuna: campingVisitForEdit.comuna || "",
        region: campingVisitForEdit.region || "",
        rules: rulesRequesteds || [],
        images: imagesData,
        services: servicesData,
        main_image: mainImageRequested || "",
      });
    } else {
      actions.setCampingFoundToEdit(campingId, providerId);
    }
  }, [
    campingVisitForEdit,
    campingId,
    providerId,
    rulesRequesteds,
    imagesRequesteds,
    servicesRequesteds,
    mainImageRequested,
  ]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleRegionChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      region: e.target.value,
      comuna: "",
    }));
  };

  // Add and remove rules
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

  // Add and remove images
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      rules: formData.rules,
      images: formData.images,
      services: formData.services,
      main_image: formData.main_image,
    };
    actions.editCamping(data, campingId, providerId)
            .then(result => {
                if (result) {
                    Swal.fire({
                        icon: 'success',
                        title: '¡Camping actualizado!',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(() => {
                        // Recargar el camping editado en el store
                        actions.getCampingById(campingId); 

                        // Redirigir a /provider-dashboard
                        window.location.href = "/provider-dashboard"; 
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al actualizar el camping',
                        text: 'Por favor, inténtalo de nuevo.'
                    });
                }
            })
            .catch(error => {
                console.error("Error al actualizar el camping:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al actualizar el camping',
                    text: 'Por favor, inténtalo de nuevo.'
                });
            });
  };

  return (
    <div className="edit-camping-form">
      <h3 className="edit-camping-title">Datos del Camping</h3>
      <form
        className="row g-4 mt-5 edit-camping-form-container"
        onSubmit={handleSubmit}
      >
        <div className="col-md-5">
          <label
            htmlFor="campingName"
            className="form-label edit-camping-label"
          >
            Nombre del Camping
          </label>
          <input
            type="text"
            className="form-control edit-camping-input"
            id="campingName"
            value={formData.campingName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-5">
          <label
            htmlFor="razonSocial"
            className="form-label edit-camping-label"
          >
            Razón Social
          </label>
          <input
            type="text"
            className="form-control edit-camping-input"
            id="razonSocial"
            value={formData.razonSocial}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="rut" className="form-label edit-camping-label">
            Rut
          </label>
          <input
            type="text"
            className="form-control edit-camping-input"
            id="rut"
            value={formData.rut}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="telefono" className="form-label edit-camping-label">
            Teléfono
          </label>
          <input
            type="tel"
            className="form-control edit-camping-input"
            id="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="direccion" className="form-label edit-camping-label">
            Dirección
          </label>
          <input
            type="text"
            className="form-control edit-camping-input"
            id="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="paginaWeb" className="form-label edit-camping-label">
            Página Web
          </label>
          <input
            type="url"
            className="form-control edit-camping-input"
            id="paginaWeb"
            value={formData.paginaWeb}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-5">
          <label
            htmlFor="descripcion"
            className="form-label edit-camping-label"
          >
            Descripción
          </label>
          <textarea
            className="form-control edit-camping-input"
            id="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="googleMaps" className="form-label edit-camping-label">
            Google Maps
          </label>
          <input
            type="url"
            className="form-control edit-camping-input"
            id="googleMaps"
            value={formData.googleMaps}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="landscape" className="form-label edit-camping-label">
            Paisaje
          </label>
          <input
            type="text"
            className="form-control edit-camping-input"
            id="landscape"
            value={formData.landscape}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="type" className="form-label edit-camping-label">
            Tipo
          </label>
          <input
            type="text"
            className="form-control edit-camping-input"
            id="type"
            value={formData.type}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="region" className="form-label edit-camping-label">
            Región
          </label>
          <select
            className="form-control edit-camping-input"
            id="region"
            value={formData.region}
            onChange={handleRegionChange}
            required
          >
            <option value="" disabled>
              Seleccione una región
            </option>
            {Object.keys(comunasData).map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-5">
          <label htmlFor="comuna" className="form-label edit-camping-label">
            Comuna
          </label>
          <select
            className="form-control edit-camping-input"
            id="comuna"
            value={formData.comuna}
            onChange={(e) =>
              setFormData({ ...formData, comuna: e.target.value })
            }
            required
          >
            <option value="" disabled>
              Seleccione una comuna
            </option>
            {formData.region &&
              comunasData[formData.region].map((comuna) => (
                <option key={comuna} value={comuna}>
                  {comuna}
                </option>
              ))}
          </select>
        </div>

        {/* Sección de Reglas */}
        <div className="col-md-12">
          <label className="form-label edit-camping-label">
            Agregar Reglas
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control edit-camping-input"
              value={newRule}
              onChange={(e) => setNewRule(e.target.value)}
              placeholder="Ingresa una nueva regla"
            />
            <button
              type="button"
              className="btn btn-success edit-camping-btn"
              onClick={addRule}
            >
              Agregar
            </button>
          </div>
          <ul className="list-group mt-3">
            {formData.rules.map((rule, index) => (
              <li key={index} className="list-group-item edit-camping-item">
                {rule}
                <button
                  type="button"
                  className="btn btn-danger float-end edit-camping-btn-trash"
                  onClick={() => deleteRule(index)}
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Sección de Imágenes */}
        <div className="col-md-12">
          <label className="form-label edit-camping-label">
            Agregar URLs de Imágenes
          </label>
          <div className="input-group">
            <input
              type="url"
              className="form-control edit-camping-input"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              placeholder="Ingresa la URL de la imagen"
            />
            <button
              type="button"
              className="btn btn-success edit-camping-btn"
              onClick={addImage}
            >
              Agregar
            </button>
          </div>
          <ul className="list-group mt-3">
            {formData.images.map((image, index) => (
              <li key={index} className="list-group-item edit-camping-item">
                {image}
                <button
                  type="button"
                  className="btn btn-danger float-end edit-camping-btn-trash"
                  onClick={() => deleteImage(index)}
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Sección de Main Image */}
        <div className="col-md-5">
          <label htmlFor="main_image" className="form-label edit-camping-label">
            URL de la Imagen Principal
          </label>
          <input
            type="url"
            className="form-control edit-camping-input"
            id="main_image"
            value={formData.main_image}
            onChange={handleChange}
            placeholder="Ingresa la URL de la imagen principal"
          />
        </div>

        {/* Sección de Servicios */}
        <div className="col-md-12">
          <label className="form-label edit-camping-label">
            Agregar Servicios
          </label>
          <div className="input-group">
            <input
              type="text"
              className="form-control edit-camping-input"
              placeholder="Nombre del servicio"
              value={newService.name}
              onChange={(e) =>
                setNewService({ ...newService, name: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control edit-camping-input"
              placeholder="Precio del servicio"
              value={newService.price}
              onChange={(e) =>
                setNewService({ ...newService, price: e.target.value })
              }
            />
            <button
              type="button"
              className="btn btn-success edit-camping-btn"
              onClick={addService}
            >
              Agregar
            </button>
          </div>
          <ul className="list-group mt-3">
            {formData.services.map((service, index) => (
              <li key={index} className="list-group-item edit-camping-item">
                {service.name}: ${service.price}
                <button
                  type="button"
                  className="btn btn-danger float-end edit-camping-btn-trash"
                  onClick={() => deleteService(index)}
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Botones */}
        <div className="col-12 d-grid gap-2 d-md-flex justify-content-md-end">
          <button
            className="btn btn-warning edit-camping-btn-save"
            type="submit"
          >
            Guardar Camping
          </button>
          <Link to="/provider-dashboard">
            <button
              className="btn btn-warning edit-camping-btn-back"
              type="button"
            >
              Volver
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default FormEditCamping;
