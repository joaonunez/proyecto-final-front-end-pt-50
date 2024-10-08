import React from "react";
import { useParams } from "react-router-dom"
import CampingSite from "../../components/site/CampingSite";
import { CampingCard } from "../../components/camping/camping-card";
import { Review } from "../../components/review/Review";
import { PostReview } from "../../components/review/PostReview";



export function Camping() {
    const { id } = useParams()

    return (
        <>
            <CampingCard id={id} />

            <CampingSite />
                

            <PostReview />
            <Review />

        </>
    );
}