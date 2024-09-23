import React from "react";
import '../../assets/css/components/footer/footer.css'; 
import { FaFacebook, FaInstagram, FaTiktok, FaGithub, FaTwitter } from "react-icons/fa"; 
import { Link } from "react-router-dom"; 

export function Footer() {
    return (
        <footer className="footer bg-black" style={{padding: "20px", alignItems: "bottom"}}> 
            <div className="container-fluid">
                <div className="row">   
                    <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                        <img className="logofooter"
                            src="https://catarsiscreativa.com/camping_app/img/logoCamping.png"
                            alt="Logo Camping App"
                        />
                    </div>
                    <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
                        <div className="footer-widget recent-blog">
                            <h4 className="mb-4 text-white letter-spacing text-uppercase">Menú</h4>
                            <div><Link to="#" className="text-white">Nosotros</Link></div>
                            <div className="mt-4"><Link to="#" className="text-white">Campings</Link></div>
                            <div className="mt-4"><Link to="#" className="text-white">Terminos y condiciones</Link></div>
                            <div className="mt-4"><Link to="#" className="text-white">Reclamos y denuncias</Link></div>
                            <div className="mt-4"><Link to="#" className="text-white">Privacidad</Link></div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-5 mb-5 mb-lg-0">
                        <div className="footer-icons">
                            <h4 className="mb-4 text-white letter-spacing text-uppercase">Publicate acá</h4>
                            <ul className="list-unstyled footer-menu lh-40 mb-0">
                                <li><Link to="#"><i className="ti-angle-double-right mr-2"></i>Publicar camping</Link></li>
                                <li><Link to="#"><i className="ti-angle-double-right mr-2"></i>Publicar cabañas</Link></li>
                                <li><Link to="#"><i className="ti-angle-double-right mr-2"></i>Publicar Glamping</Link></li>
                                <li><Link to="#"><i className="ti-angle-double-right mr-2"></i>Otros servicios</Link></li>
                                <li><Link to="#"><i className="ti-angle-double-right mr-2"></i>Valores</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-5">
                        <div className="footer-widget">
                            <h4 className="mb-4 text-white letter-spacing text-uppercase">Contacto</h4>
                            <p>Av. Del Valle Norte 937, Santiago</p>
                            <p className="text-white">+(569) 988866678</p>
                            <p className="text-white">info@campingapp.cl</p>
                        </div>
                        <div className="redes">
                            <div className="text-right">
                                <ul className="footer-socials list-inline">
                                    <li className="list-inline-item"><Link to="#"><FaFacebook /></Link></li>
                                    <li className="list-inline-item"><Link to="#"><FaInstagram /></Link></li>
                                    <li className="list-inline-item"><Link to="#"><FaTiktok /></Link></li>
                                    <li className="list-inline-item"><Link to="#"><FaTwitter /></Link></li>
                                    <li className="list-inline-item"><Link to="#"><FaGithub /></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="derechos" style={{ textAlign: 'center', width: '100%', marginTop: '20px' }}>
                        <p>Derechos reservados, CampingApp © 2024, Creado por Grupo Camping</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
