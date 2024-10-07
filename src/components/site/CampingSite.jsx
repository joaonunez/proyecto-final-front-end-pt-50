import React, { useState, useContext } from 'react';
import CardSite from './CardSite';
import AvailableSites from './AvailableSites';
import { Context } from '../../store/context';

const CampingSite = () => {
  const [selectedSiteId, setSelectedSiteId] = useState(null);
  const { store } = useContext(Context);

  const handleSiteSelect = (siteId) => {
    setSelectedSiteId(siteId);
  };

  // Filtra el sitio seleccionado para pasar su data a `CardSite`
  const selectedSiteData = store.sites.find(site => site.id === selectedSiteId);

  return (
    <div className="container border rounded border-success p-2 mb-2" style={{ width: '100%'}}>
      <div className="row">
        <div className="col-8">
          <AvailableSites onSiteSelect={handleSiteSelect} />
        </div>
        <div className="col-4">
          {selectedSiteData ? (
            <CardSite siteData={selectedSiteData} />
          ) : (
            <p>Selecciona un sitio para más detalles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampingSite;
