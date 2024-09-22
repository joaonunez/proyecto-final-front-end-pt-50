import React, { useState } from 'react';
import CardSite from './CardSite';
import AvailableSites from './AvailableSites';

const CampingSite = () => {
  const [selectedSiteId, setSelectedSiteId] = useState(null);

  const handleSiteSelect = (siteId) => {
    setSelectedSiteId(siteId);
  };

  return (
    <div className="container border rounded border-success p-2 mb-2" style={{ width: '100%' }}>
      <div className="row">
        <div className="AvailableSite col-9">
          <AvailableSites onSiteSelect={handleSiteSelect} />
        </div>
        <div className="CardSite col-3 d-flex justify-content-center">
          {selectedSiteId ? <CardSite siteId={selectedSiteId} /> : <p>Selecciona un sitio para más detalles.</p>}
        </div>
      </div>
    </div>
  );
};

export default CampingSite;
