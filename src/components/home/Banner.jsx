import React from "react";
import image_camper from "../../assets/images/banner/banner_camper.jpg";
import image_camping from "../../assets/images/banner/banner_camping.jpg";
import image_glamping from "../../assets/images/banner/banner_glamping.jpg";


export function Banner() {
    return (
        <div className="col-12 banner-section">
            <h2 className="banner-title">¡Animate a tener unas buenas vacaciones!</h2>
            <div className="col-12 container-banner">
                <div className="col-4 image-container">
                    <img src={image_camper} alt="Camper" className="image-banner col-12" />
                </div>
                <div className="col-4 image-container">
                    <img src={image_camping} alt="Camping" className="image-banner col-12" />
                </div>
                <div className="col-4 image-container">
                    <img src={image_glamping} alt="Glamping" className="image-banner col-12" />
                </div>
            </div>
        </div>
    );
}
