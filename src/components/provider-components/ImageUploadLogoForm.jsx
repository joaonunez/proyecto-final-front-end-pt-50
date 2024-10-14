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
    publicId: "", // Guardar el publicId de la imagen principal
  });

  const [newImage, setNewImage] = useState("");

  const handleMainImageUpload = (url, publicId) => {
    setFormData((prevState) => ({
      ...prevState,
      main_image: url,
      publicId: publicId, // Guardar el publicId de la imagen subida
    }));
  };

  const handleDeleteImage = async () => {
    try {
      // Solicitud a Cloudinary para borrar la imagen
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dnrb5m9es/resources/image/upload`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Basic ${btoa('231452648138341:iTeTmDU0gkHFpHkYp6zGnjf6JUA')}`, // Autenticación básica
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            public_ids: [formData.publicId], // Eliminar por publicId
          }),
        }
      );

      if (response.ok) {
        // Eliminar el preview de la imagen
        setFormData((prevState) => ({
          ...prevState,
          main_image: "",
          publicId: "", // Limpiar también el publicId
        }));
        console.log("Imagen eliminada de Cloudinary y del estado local.");
      } else {
        console.error("Error al eliminar la imagen en Cloudinary.");
      }
    } catch (err) {
      console.error("Error en la solicitud de eliminación:", err);
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
        {/* Reemplazo del input para la imagen principal por el CloudinaryUploadWidget */}
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

