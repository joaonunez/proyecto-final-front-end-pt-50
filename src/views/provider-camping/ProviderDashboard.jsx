import React from "react";
import { Link } from "react-router-dom";
import { ProviderCampings } from "../../components/provider-components/ProviderCampings";

export function ProviderDashboard() {
  return (
    <div className="provider-dashboard">
      <ProviderCampings />
      <div className="dashboard-buttons">
        <Link to="/admin-reserves">
          <button className="btn btn-primary">Ver Reservas</button>
        </Link>
      </div>
    </div>
  );
}
