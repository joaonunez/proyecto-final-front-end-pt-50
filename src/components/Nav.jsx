import React, { useContext } from "react";
import logo from "../assets/images/logo/logocamping.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdForest } from "react-icons/md";
import { GiCampingTent } from "react-icons/gi";
import { FaPeopleRoof } from "react-icons/fa6";
import { MdContacts } from "react-icons/md";
import { RiLoginBoxLine } from "react-icons/ri";
import { TbTableOptions } from "react-icons/tb";
import { MdOutlinePublish } from "react-icons/md";
import { Context } from "../store/context";

export function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { store, actions } = useContext(Context);

  const handleLogout = () => {
    actions.logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navigation fixed-top">
      <div className="container-fluid">
        <img src={logo} alt="Logo Camping" className="logo-nav" />
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
                to="/"
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
              >
                Inicio <MdForest />
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/campings"
                className={`nav-link ${
                  location.pathname === "/campings" ? "active" : ""
                }`}
              >
                Campings <GiCampingTent />
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/about-us"
                className={`nav-link ${
                  location.pathname === "/about-us" ? "active" : ""
                }`}
              >
                Nosotros <FaPeopleRoof />
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                className={`nav-link ${
                  location.pathname === "/contact" ? "active" : ""
                }`}
              >
                Contacto <MdContacts />
              </Link>
            </li>
          </ul>

          {store.user ? (
            <div className="d-flex align-items-center">
              <span className="navbar-text me-3">
                Bienvenido, {store.user.first_name + " " + store.user.last_name}
              </span>

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
                  {store.user.role.id === 2 && ( // Proveedor
                    <li>
                      <Link className="dropdown-item" to="/provider-dashboard">
                        Ver mis Campings
                      </Link>
                    </li>
                  )}
                  {store.user.role.id === 3 && ( // Cliente
                    <li>
                      <Link className="dropdown-item" to="/mis-reservas">
                        Ver mis Reservas
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link className="dropdown-item" to="/user-config">
                      Configuración
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <Link to="/provider-login" className="btn-to-camping-link">
                <button className="btn btn-camping-nav" type="button">
                  Registra tu camping <MdOutlinePublish />
                </button>
              </Link>
              <Link to="/login" className="btn-to-login-link ms-3">
                <button className="btn btn-login-nav" type="button">
                  Ingresar <RiLoginBoxLine />
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
