import React from "react";
import logo from "../assets/images/logo/logocamping.jpg";
import { Link, useLocation } from "react-router-dom";
import { MdForest } from "react-icons/md";
import { GiCampingTent } from "react-icons/gi";
import { FaPeopleRoof } from "react-icons/fa6";
import { MdContacts } from "react-icons/md";
import { RiLoginBoxLine } from "react-icons/ri";

export function Nav() {
  const location = useLocation();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
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
                    location.pathname === "/camping" ? "active" : ""
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
            <button className="btn btn-login-nav" type="button">
              <Link to={"/login"} className="btn-to-login-link">
                Ingresar <RiLoginBoxLine />
              </Link>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
