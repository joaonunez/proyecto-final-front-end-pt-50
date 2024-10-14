import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/context";
import { FaTrash } from "react-icons/fa";

export function ImageUploadLogoForm() {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  
  // Estado inicial para los datos del formulario
  const [formData, setFormData] = useState({
    images: [],
    main_image: "",
  });

  const [newImage, setNewImage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const created = await actions.createCamping(formData);
    if (created) {
      navigate("/provider-dashboard");
    } else {
      alert("Error al crear el camping.");
    }
  };

  return (
    <div className="create-camping-form">
      <h3 className="create-camping-title">Registrar nuevo Camping</h3>
      <form className="row g-4 mt-5" onSubmit={handleSubmit}>

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
            <button
              type="button"
              className="btn btn-success"
              onClick={addImage}
            >
              Agregar
            </button>
          </div>
          <ul className="list-group mt-3">
            {formData.images.map((image, index) => (
              <li key={index} className="list-group-item">
                {image}
                <button
                  type="button"
                  className="btn btn-danger float-end"
                  onClick={() => deleteImage(index)}
                >
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
            className="form-control"
            id="main_image"
            value={formData.main_image}
            onChange={handleChange}
            placeholder="Ingresa la URL de la imagen principal"
          />
        </div>

        <div className="col-12 d-grid gap-2 d-md-flex justify-content-md-end">
          <button className="btn btn-primary" type="submit">
            Registrar Camping
          </button>
        </div>
      </form>
    </div>
  );
}
