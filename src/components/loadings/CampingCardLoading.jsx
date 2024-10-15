import React from "react";


export function LoadingCampingCard() {
    const skeletons = Array(3).fill(0);
    return (
        <>

            <div className="container-fluid skeleton-camping-container row mt-5 d-flex" style={{ width: "83rem", height: "35rem" }}>
                <div className="skeleton-logo-provider-container row">
                    {/* Simulación de la imagen del logo del camping */}
                    <div className="skeleton-camping-logo col-3">
                        <div className="skeleton-logo-image"></div>
                    </div>

                    {/* Simulación de la información del proveedor */}
                    <div className="skeleton-provider-info">
                        <div className="skeleton-text skeleton-title"></div>
                        <ul className="skeleton-provider-list">
                            <li className="skeleton-text"></li>
                            <li className="skeleton-text"></li>
                            <li className="skeleton-text"></li>
                        </ul>
                    </div>

                    {/* Simulación del rating y comentarios */}
                    <div className="skeleton-rating-info">
                        <div className="skeleton-rating-button"></div>
                        <div className="skeleton-text skeleton-comment"></div>
                    </div>
                </div>

                {/* Simulación de la información del camping */}
                <div className="skeleton-camping-info">
                    <div className="skeleton-camping-header">
                        <div className="skeleton-title col-5"></div>

                    </div>

                </div>
            </div>
            <div className="line" />


            <div className="container-charging-camping-img row d-flex justify-content-center m-5 h-100">
                {skeletons.map((_, index) => (
                    
                    <div key={index} className="charging-image p-5 col-3"></div>
                    

                ))}
            </div>




        </>

    );
}