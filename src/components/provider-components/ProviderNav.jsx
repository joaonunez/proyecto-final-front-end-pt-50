import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { GiCampingTent } from "react-icons/gi";
import { MdOutlineSecurity } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { TbTableOptions } from "react-icons/tb";
import { Context } from "../../store/context";

export function ProviderNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { store, actions } = useContext(Context);

  const handleLogout = () => {
    actions.logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navigation fixed-top provider-nav">
      <div className="container-fluid">
        <h2 className="navbar-brand">Panel del Proveedor</h2>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/provider-management"
                className={`nav-link ${
                  location.pathname === "/provider-management" ? "active" : ""
                }`}
                aria-current="page"
              >
                Administrar Campings <GiCampingTent />
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/provider-dashboard"
                className={`nav-link ${
                  location.pathname === "/provider-dashboard" ? "active" : ""
                }`}
              >
                Auditoría <MdOutlineSecurity />
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin-reserves"
                className={`nav-link ${
                  location.pathname === "/admin-reserves" ? "active" : ""
                }`}
              >
                Ver Reservas <MdOutlineDashboard />
              </Link>
            </li>
          </ul>

          {store.user ? (
            <div className="d-flex align-items-center">
              <span className="navbar-text me-3">
                {`Bienvenido, ${store.user.first_name}`}
              </span>

              {/* Botón para Registrar Camping */}
              <button
                className="btn btn-primary me-3"
                onClick={() => navigate("/create-new-camping")}
              >
                Registrar Camping
              </button>

              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-settings-nav dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <TbTableOptions />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/user-config">
                      Configuración
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Cerrar sesión <RiLogoutBoxLine />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
