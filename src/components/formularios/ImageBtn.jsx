import React, { useState } from "react";
import PropTypes from "prop-types";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

const ImageBtn = ({ backendUrl, siteId, onUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const cloudName = "dnrb5m9es";
    const uploadPreset = "imgCamping";

    const cld = new Cloudinary({
        cloud: {
            cloudName: cloudName,
        },
    });

    const allowedTypes = ["image/jpeg", "image/png"];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && !allowedTypes.includes(file.type)) {
            setUploadError("Solo se permiten archivos PNG y JPG.");
            setSelectedFile(null);
            return;
        }
        setUploadError(null);
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setUploading(true);
        setUploadError(null);

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", uploadPreset);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error al subir la imagen a Cloudinary: ${response.statusText}`);
            }

            const data = await response.json();
            const imageUrl = data.secure_url;
            const publicId = data.public_id;

            // Crear la URL optimizada usando Cloudinary
            const optimizedThumbnail = cld
                .image(publicId)
                .resize(thumbnail().width(100).height(100));

            setUploadedUrl(imageUrl);
            setPreviewUrl(optimizedThumbnail.toURL()); // Convertir correctamente la imagen a URL

            // Guardar la URL de la imagen en la base de datos
            await saveImageUrlToDatabase(imageUrl);

            // Llamar la función onUpload para actualizar en el formulario padre
            if (onUpload) {
                onUpload(imageUrl);
            }

        } catch (error) {
            setUploadError(error.message);
        } finally {
            setUploading(false);
        }
    };

    const saveImageUrlToDatabase = async (imageUrl) => {
        try {
            const response = await fetch(`${backendUrl}/site/${siteId}/upload-image`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url_map_site: imageUrl }),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error(`Error al guardar la URL en la base de datos: ${response.statusText}`);
            }

            console.log("URL de imagen guardada correctamente en la base de datos.");
        } catch (error) {
            setUploadError(`Error al guardar la URL en la base de datos: ${error.message}`);
        }
    };

    return (
        <div className="upload-container">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className="btn btn-success upload-btn"
            >
                {uploading ? "Subiendo..." : "Subir Imagen"}
            </button>
            {uploadError && <p className="error-message">{uploadError}</p>}
            {previewUrl && (
                <div>
                    <img src={previewUrl} alt="Preview" style={{ width: "100px", height: "100px", objectFit: "cover", marginTop: "10px" }} />
                </div>
            )}
            {uploadedUrl && (
                <div>
                    <p className="success-message">Imagen subida: {uploadedUrl}</p>
                </div>
            )}
        </div>
    );
};

// Definir PropTypes para asegurar que los props requeridos sean pasados correctamente
ImageBtn.propTypes = {
    backendUrl: PropTypes.string.isRequired,
    siteId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onUpload: PropTypes.func,
};

export default ImageBtn;
