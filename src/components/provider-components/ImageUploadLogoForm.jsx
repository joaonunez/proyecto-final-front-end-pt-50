import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../store/context";
import CloudinaryUploadWidget from "../formularios/CloudinaryUploadWidget";
import { FaTrash } from "react-icons/fa";

export function ImageUploadLogoForm() {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const { campingId } = useParams(); // Obtener el ID del camping desde la URL

  const [formData, setFormData] = useState({
    images: [],
    main_image: "", // Guardará la URL de la imagen principal
    publicId: "", // Guardará el public_id de la imagen en Cloudinary
  });

  const handleMainImageUpload = (url, publicId) => {
    setFormData((prevState) => ({
      ...prevState,
      main_image: url,
      publicId: publicId, // Guardamos el public_id retornado por Cloudinary
    }));
  };

  const handleDeleteImage = async () => {
    const success = await actions.deleteImageFromCloudinary(formData.publicId);
    if (success) {
      setFormData((prevState) => ({
        ...prevState,
        main_image: "",
        publicId: "", // Limpiar publicId
      }));
    } else {
      alert("Error al borrar la imagen en Cloudinary.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = await actions.updateCampingImage(campingId, formData.main_image);
    if (updated) {
      navigate("/provider-dashboard");
    } else {
      alert("Error al subir la imagen.");
    }
  };

  return (
    <div className="create-camping-form">
      <h3 className="create-camping-title">Subir Imagen Principal</h3>
      <form className="row g-4 mt-5" onSubmit={handleSubmit}>
        
        {/* Widget de Cloudinary para subir la imagen principal */}
        <div className="col-md-12">
          <label className="form-label">Subir Imagen Principal</label>
          <CloudinaryUploadWidget onUpload={handleMainImageUpload} />
          {formData.main_image && (
            <div className="mt-3">
              <img
                src={formData.main_image}
                alt="Imagen Principal"
                style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "cover" }}
              />
              {/* Botón para borrar la imagen desde Cloudinary y del preview */}
              <button
                type="button"
                className="btn btn-danger float-end"
                onClick={handleDeleteImage}
              >
                <FaTrash /> Borrar Imagen
              </button>
            </div>
          )}
        </div>

        <div className="col-12 d-grid gap-2 d-md-flex justify-content-md-end">
          <button className="btn btn-primary" type="submit">
            Subir Imagen
          </button>
        </div>
      </form>
    </div>
  );
}
