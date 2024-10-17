import React from "react";
import { Link } from "react-router-dom";
import { PiTentBold } from "react-icons/pi";
import { FaWifi, FaShower, FaComments } from "react-icons/fa";
import "../../assets/css/components/search/searchCampingCard.css";
import defaultImage from "../../assets/images/fotos/defectoCamping.jpg"; // Importar la imagen por defecto

const SearchCampingCard = ({ camping }) => {
    // Validar que las propiedades necesarias existan antes de usarlas
    const mainImage = camping?.main_image || defaultImage; // Usar la imagen por defecto si no hay main_image
    const campingName = camping?.camping_name || "Nombre no disponible";
    const description = camping?.description || "Descripción no disponible";
    const region = camping?.region || "Región no especificada";
    const comuna = camping?.comuna || "Comuna no especificada";
    const availableSites = camping?.available_zones_count || "N/A"; // Cambiado a available_zones_count
    const averageRating = camping?.rating !== null ? camping.rating : "N/A"; // Usar rating si existe
    const totalReviews = camping?.reviews_count !== undefined ? camping.reviews_count : "0"; // Usar reviews_count si existe

    return (
        <div className="container-camping-card row border-success">
            <div className="image-camping-card col-3">
                <img
                    className="image-camping-size"
                    src={mainImage}
                    alt={campingName}
                />
            </div>
            <div className="container-card-camping-info col-6">
                <div className="camping-name-info">
                    <h1>{campingName}</h1>
                </div>
                <p className="camping-description-info">{description}</p>
                <p className="camping-location-info">
                    Ubicación: {region}, {comuna}
                </p>
                <p className="camping-available-sites" style={{ fontSize: "1.5rem" }}>
                    Sitios disponibles: {availableSites} 
                </p>
            </div>
            <div className="rating-camping-info col-2">
                <button className="btn btn-warning rating-button-link" style={{ fontSize: "2rem" }}>
                    {averageRating}
                </button>
                <div className="icon-comment-container">
                    <FaComments className="comment-icon" />
                    <span>Comentarios: {totalReviews}</span>
                </div>
            </div>
            <div className="container-footer-card">
                <Link to={`/camping/${camping.camping_id}`}>
                    <button className="camping btn btn-warning">
                        Visita nuestro Camping
                    </button>
                </Link>
                <div className="container-card-icons">
                    <PiTentBold className="icon" />
                    <FaWifi className="icon" />
                    <FaShower className="icon" />
                </div>
            </div>
        </div>
    );
};

export default SearchCampingCard;
