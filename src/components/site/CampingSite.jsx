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
        <div className="col-8">
          <AvailableSites onSiteSelect={handleSiteSelect} />
        </div>
        <div className="col-4">
          {selectedSiteId ? (
            <CardSite siteId={selectedSiteId} />
          ) : (
            <p>Selecciona un sitio para más detalles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampingSite;
