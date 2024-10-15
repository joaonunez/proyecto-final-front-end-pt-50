import React from "react";

export function LoadingCampingList() {
  
  const skeletons = Array(6).fill(0); 
  return (
    <>
      {skeletons.map((_, index) => (
        <div key={index} className="skeleton-campingList-card row border-success">
          <div className="image-camping-card col-3">
            <div className="skeleton-image-campingList"></div> 
          </div>
          <div className="container-card-camping-info col-6">
            <div className="skeleton-title-campingList"></div> 
            <div className="skeleton-description-campingList"></div> 
          </div>
          <div className="rating-camping-info col-2">
            <div className="skeleton-button-campingList"></div> 
            <div className="skeleton-comment-campingList"></div> 
          </div>
          <div className="container-footer-card">
            <div className="skeleton-button-campingList"></div> 
            <div className="skeleton-icons-campingList"></div> 
          </div>
        </div>
      ))}
    </>
  );
}

