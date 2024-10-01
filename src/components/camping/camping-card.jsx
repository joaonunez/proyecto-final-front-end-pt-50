import React, { useEffect, useContext } from "react";
import { FaComments } from "react-icons/fa";
import { PiTentBold } from "react-icons/pi";
import { FaWifi } from "react-icons/fa";
import { FaShower } from "react-icons/fa";
import { FaHotTubPerson } from "react-icons/fa6";
import { Context } from "../../store/context";

export function CampingCard({ id }) {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getCampingById(id);  // Obtener los detalles del camping
        actions.getReviewsAndAverage(id);  // Obtener reseñas y promedio de rating
    }, [id]);

    const camping = store.selectedCamping;  // Acceder al camping seleccionado desde el store

    return (
        <>
            {camping && (
                <div className="container-fluid camping-card mt-5" style={{ width: "83rem", height :"32rem" }}>
                    <div className="camping-logo col-3">
                        <img
                            className="camping-logo-image"
                            src={camping.main_image}
                            alt="Camping logo"
                        />
                    </div>
                    <div className="camping-card-info col-12">
                        <div className="camping-header">
                            <h1 className="camping-name">{camping.name}</h1>
                            
                            <div className="rating-info">
                                <button className="btn btn-warning button-rating mt-5" style={{ fontSize: "2rem" }}>
                                    {store.averageRating || "N/A"}
                                </button>
                                <div className="container-comments-space">
                                    <FaComments className="comment-icon-camping" />
                                    <span>Comments:{store.lenOfReviews}</span>
                                </div>
                            </div>
                        </div>
                        <p className="description-camping">{camping.description}</p>
                        <div className="icons-container">
                            <PiTentBold className="icons-camping-card" />
                            <FaWifi className="icons-camping-card" />
                            <FaShower className="icons-camping-card" />
                            <FaHotTubPerson className="icons-camping-card" />
                        </div>
                    </div>
                </div>
            )}
            <div className="line" />
            <div className="container">
                <div className="image-container row m-5">
                    {camping?.images?.length > 0 ? (
                        camping.images.map((campingImage, index) => (
                            <div className="col-4" key={index}>
                                <img src={campingImage} className="img-fluid p-3" alt="Camping" />
                            </div>
                        ))
                    ) : (
                        <p>No images available for this camping</p>
                    )}
                </div>
            </div>
        </>
    );
}