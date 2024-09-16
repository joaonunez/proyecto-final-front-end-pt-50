import React from "react";
import CampingSite from "../components/site/CampingSite";
import { CampingCard } from "../components/camping/camping-card";
import { Carousel } from "../components/camping/carousel";

export function Camping() {
    return (
        <>
            < CampingCard />
            < Carousel />
            <CampingSite />

        </>
    );
}
export default Camping;
