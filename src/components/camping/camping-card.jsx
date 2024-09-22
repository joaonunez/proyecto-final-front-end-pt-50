import React from "react";
import { useEffect, useState } from "react";
import { FaComments } from "react-icons/fa";
import { PiTentBold } from "react-icons/pi";
import { FaWifi } from "react-icons/fa";
import { FaShower } from "react-icons/fa";
import { FaHotTubPerson } from "react-icons/fa6";




export function CampingCard({ id }) {

    const [camping, setCamping] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3001/camping/camping/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((resp) => resp.json())
            .then((data) => setCamping(data))
            .catch((error) => console.log(error))
    }, [])


    return (
        <>

            <div className="container-fluid camping-card mt-5 row">
                <div className="camping-logo col-3">
                    <img
                        className="camping-logo-image"
                        src={camping.main_image}
                        alt="..." />
                </div>
                <div className="camping-card-info col-9">
                    <div className="camping-header">

                        <h1 className="camping-name">{camping.name} </h1>
                        <div className="rating-info ">

                            <button className="btn btn-warning button-rating"> 8</button>
                            <div className="container-comments-space">

                                < FaComments className="comment-icon-camping " />
                                <span>Comments</span>
                            </div>
                        </div>


                    </div>
                    <p className="description-camping ">{camping.description}</p>

                    <div className="icons-container">

                        <PiTentBold className="icons-camping-card" />
                        <FaWifi className="icons-camping-card" />
                        <FaShower className="icons-camping-card" />
                        <FaHotTubPerson className="icons-camping-card" />

                    </div>




                </div>

            </div>
            <div className="line" />
            <div className="container">
                <div className="image-container row m-5">
                    {camping.images && camping.images.length > 0 ? (
                        camping.images.map((campingImages, index) => (
                            <div className="col-4" key={index}>
                                <img src={campingImages} className="img-fluid p-3" alt="..." />
                            </div>
                        ))
                    ) : (
                        <p>No images available de este camping</p> 
                    )}
                </div>
            </div>

        </>
    )
}