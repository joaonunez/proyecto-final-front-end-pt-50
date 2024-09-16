import React from "react";
import { FaComments } from "react-icons/fa";
import { PiTentBold } from "react-icons/pi";
import { FaWifi } from "react-icons/fa";
import { FaShower } from "react-icons/fa";
import { FaHotTubPerson } from "react-icons/fa6";






export function CampingCard() {

   
    return (
        <>
            <div className="container-fluid camping-card mt-5">
                <div className="camping-logo">
                    <img className="camping-logo-image" src="https://sendasconguillio.cl/wp-content/uploads/2022/11/logo-vertical-color.png" alt="#" />
                </div>
                <div className="camping-card-info">
                    <div className="camping-header">

                    <h1 className="camping-name">Camping El Huarango</h1>
                    <div className="rating-info ">

                        <button className="btn btn-warning button-rating"> 8</button>
                        
                        < FaComments className="comment-icon mt-3" />
                    </div>
                    

                    </div>
                    <p className="description ">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                        Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum
                        iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio
                        dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
                        Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
                        Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>

                    <div className="icons-container">

                    <PiTentBold className="icons"/>
                    <FaWifi className="icons"/> 
                    <FaShower className="icons"/>
                    <FaHotTubPerson className="icons"/>

                    </div>
                    



                </div>

            </div>
            <div className="line" /> 

        </>
    )
}