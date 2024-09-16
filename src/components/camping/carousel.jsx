
import React from "react";

export function Carousel() {
    return (
        <>
            <div id="carouselExampleFade" className="carousel slide carousel-fade d-flex justify-content-between">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https:/catarsiscreativa.com/camping_app/img/carpa_en_bosque.jpg" className="d-block img-fluid    " alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://catarsiscreativa.com/camping_app/img/campinreal__1.jpg" className="d-block img-fluid" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https:/catarsiscreativa.com/camping_app/img/carpa_familia1.jpg" className="d-block img-fluid " alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>

                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>

                </button>
            </div>
        </>
    )
}