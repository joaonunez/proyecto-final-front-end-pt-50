import React from 'react';
import CardSite from './CardSite';
import AvailableSites from './AvailableSites';


const CampingSite = () => {
  return (
    <div className="container border rounded border-success p-2 mb-2" style={{ width: '100%' }}>
      <div className="row">
        <div className="AvailableSite col-9">
          <AvailableSites />
        </div>
        <div className="CardSite col-3 d-flex justify-content-center">
          <CardSite />
        </div>
      </div>
    </div>
  );
};

export default CampingSite;
