import React from "react";
import { Link } from "react-router-dom";
import { PiTentBold } from "react-icons/pi";
import { FaWifi, FaShower, FaComments } from "react-icons/fa";
import "../../assets/css/components/search/searchCampingCard.css";

const SearchCampingCard = ({ camping }) => {
    return (
        <div className="container-camping-card row border-success">
            <div className="image-camping-card col-3">
                <img
                    className="image-camping-size"
                    src={camping.main_image}
                    alt={camping.camping_name}
                />
            </div>
            <div className="container-card-camping-info col-6">
                <div className="camping-name-info">
                    <h1>{camping.camping_name}</h1>
                </div>
                <p className="camping-description-info">{camping.description}</p>
                <p className="camping-location-info">
                    Ubicación: {camping.region}, {camping.comuna}
                </p>
                <p className="camping-available-sites">
                    Sitios disponibles: {camping.available_sites_count}
                </p>
            </div>
            <div className="rating-camping-info col-2">
                <button className="btn btn-warning rating-button-link" style={{ fontSize: "2rem" }}>
                    {camping.average_rating || "N/A"}
                </button>
                <div className="icon-comment-container">
                    <FaComments className="comment-icon" />
                    <span>Comentarios: {camping.total_reviews || "0"}</span>
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
