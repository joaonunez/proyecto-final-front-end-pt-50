import React from "react";
import { Link } from "react-router-dom";
import { PiTentBold } from "react-icons/pi";
import { FaWifi, FaShower, FaComments } from "react-icons/fa";
import "../../assets/css/components/search/searchCampingCard.css";

const SearchCampingCard = ({ camping }) => {
    // Validar que las propiedades necesarias existan antes de usarlas
    const mainImage = camping?.main_image || "default-image.jpg"; // Imagen por defecto si no existe
    const campingName = camping?.camping_name || "Nombre no disponible";
    const description = camping?.description || "Descripción no disponible";
    const region = camping?.region || "Región no especificada";
    const comuna = camping?.comuna || "Comuna no especificada";
    const availableSites = camping?.available_sites_count || "N/A";
    const averageRating = camping?.average_rating || "N/A";
    const totalReviews = camping?.total_reviews || "0";

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
                <p className="camping-available-sites">
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
