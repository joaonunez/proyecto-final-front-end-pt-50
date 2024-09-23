import React from "react";
import { useParams } from "react-router-dom"
import CampingSite from "../../components/site/CampingSite";
import { CampingCard } from "../../components/camping/camping-card";
import { Review } from "../../components/review/review";



 export function Camping() {
    const { id } = useParams()  

    return (
        <>
            < CampingCard id={id} />
           
            <CampingSite />

            <Review />

        </>
    );
}

