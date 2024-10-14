import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CloudinaryUploadWidget from "../formularios/CloudinaryUploadWidget";
import { Context } from "../../store/context";
import { FaTrash } from "react-icons/fa";

export function ImageUploadForm() {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const { camping_id } = useParams(); // Obtenemos el camping_id de la URL

  const [formData, setFormData] = useState({
    images: [],
  });

  const handleAdditionalImageUpload = (url) => {
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, url],
    }));
  };

  const handleDeleteImage = (index) => {
    const updatedImages = formData.images.filter((_, i) => i !== index);
    setFormData((prevState) => ({
      ...prevState,
      images: updatedImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = await actions.uploadImagesToCamping(camping_id, formData);
    if (updated) {
      navigate("/provider-dashboard");
    } else {
      alert("Error al subir imágenes.");
    }
  };

  return (
    <div className="edit-camping-form">
      <h3 className="create-camping-title text-center">Subir Imágenes para el Camping</h3>
      <form className="row g-4 mt-5" onSubmit={handleSubmit}>
        
        {/* Subir Imágenes Adicionales */}
        <div className="col-md-12">
          <label className="form-label">Subir Imágenes Adicionales</label>
          <CloudinaryUploadWidget onUpload={handleAdditionalImageUpload} />
          <ul className="list-group mt-3">
            {formData.images.map((image, index) => (
              <li key={index} className="list-group-item">
                <img src={image} alt={`Imagen ${index}`} style={{ maxWidth: "100px" }} />
                <button
                  type="button"
                  className="btn btn-danger float-end"
                  onClick={() => handleDeleteImage(index)}
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-12 d-grid gap-2 d-md-flex justify-content-md-end">
          <button className="btn btn-warning edit-camping-btn-save" type="submit">
            Guardar Imágenes
          </button>
          <button className="btn btn-warning edit-camping-btn-back" type="button">
            Volver
          </button>
        </div>
      </form>
    </div>
  );
}
