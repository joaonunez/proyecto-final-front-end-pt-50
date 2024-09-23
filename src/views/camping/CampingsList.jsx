import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import { PiTentBold } from "react-icons/pi";
import { FaWifi } from "react-icons/fa";
import { FaShower } from "react-icons/fa";
import { FaHotTubPerson } from "react-icons/fa6";
import { GiCampingTent } from "react-icons/gi";


export function CampingsList() {
    
    const [campings, setCampings] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/camping/camping", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then((resp) => resp.json())
        .then((data) => setCampings(data))
        .catch((error) => console.log(error))
    }, [])
    

    return (
        <>
            <h1 className="title-page">Busqueda de Campings < GiCampingTent /></h1>

            {campings.map((camping) => (


            <div key={camping.id} className="container-camping-card row border-success">
                <div className="image-camping-card col-3">
                    <img
                        className="image-camping-size"
                        src={camping.main_image}
                        alt={camping.name} />

                </div>
                <div className="container-card-camping-info col-6">
                    <div className="camping-name-info">
                        <h1>{camping.name}</h1>
                    </div>
                    <p className="camping-description-info ">{camping.description} </p>
                </div>
                <div className="rating-camping-info col-2">
                    <button className="btn btn-warning rating-button-link">8</button>
                    <div className="icon-comment-container">
                        <FaComments className="facomments" />
                        <span>Comments</span>
                    </div>
                </div>

                <div className="container-footer-card">
                    <Link to={`/camping/${camping.id}`}>
                        <button className="camping btn btn-warning" >

                            Visita nuestro Camping
                        </button>
                    </Link>
                    <div className="container-card-icons">
                        <PiTentBold className="icon" />
                        <FaWifi className="icon" />
                        <FaShower className="icon" />
                        <FaHotTubPerson className="icon" />

                    </div>
                </div>
            </div>
            ))}

        </>
    )
}