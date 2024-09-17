import React from "react";
import { Link } from "react-router-dom";
import { FaComments } from "react-icons/fa";
import { PiTentBold } from "react-icons/pi";
import { FaWifi } from "react-icons/fa";
import { FaShower } from "react-icons/fa";
import { FaHotTubPerson } from "react-icons/fa6";
import { GiCampingTent } from "react-icons/gi";


export function Campings() {

    return (
        <>
            <h1 className="title-page">Busqueda de Campings < GiCampingTent /></h1>
            <div className="container-camping-card row border-success">
                <div className="image-camping-card col-3">
                    <img
                        className="image-camping-size"
                        src="https:/catarsiscreativa.com/camping_app/img/carpa_en_bosque.jpg"
                        alt="..." />

                </div>
                <div className="container-card-camping-info col-6">
                    <div className="camping-name-info">
                        <h1>El huarango</h1>
                    </div>
                    <p className="camping-description-info ">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                        Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum
                        iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio
                        dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                        Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                        Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
                </div>
                <div className="rating-camping-info col-2">
                    <button className="btn btn-warning rating-button-link">8</button>
                    <div className="icon-comment-container">
                        <FaComments className="facomments" />
                        <span>Comments</span>
                    </div>
                </div>

                <div className="container-footer-card">
                    <Link to={"/camping"}>
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

        </>
    )
}