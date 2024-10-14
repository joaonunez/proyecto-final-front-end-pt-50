import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export function OurTeam() {
  return (
    <div className="about-section">
      <h2>Nuestro Equipo</h2>
      <p>
        Nuestro equipo está formado por profesionales apasionados y dedicados,
        cada uno con habilidades únicas para llevar a cabo proyectos innovadores y eficientes.
      </p>
      <div className="team-members">
        <div className="face front">
          <img src="https://img.freepik.com/vector-premium/ilustracion-vectorial-hombre-computadora-portatil-manos-estilo-dibujos-animados_1142-73437.jpg" alt="" />
          <h3>Joao Nuñez</h3>
        </div>
        <div className="face back">
          <h3>Joao Nuñez</h3>
          <p>Full Stack Developer | Desarrollador Web | React | Javascript | Python | Flask | HTML | CCS | SQL | MySQL</p>
          <div className="link">
            <a href="#" target="_blank" class="icon instagram">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" class="icon facebook">
              <FaFacebook />
            </a>
            <a href="#" target="_blank"class="icon linkedin">
              <FaLinkedin />
            </a>
            <a href="https://github.com/joaonunez" target="_blank" class="icon Github">
              <FaGithub />
            </a>
          </div>

        </div>
      </div>
      <div className="team-members">
        <div className="face front">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmhCrrOwvnFt5POydLiEbT-GPRu8ul0wL7KE74O9CC6cFFbs7vnaZvCZhVMMTDbwuHz5Y&usqp=CAU" alt="" />
          <h3>MartinLFD</h3>
        </div>
        <div className="face back">
          <h3>MartinLFD</h3>
          <p>Full Stack Developer | Desarrollador Web | React | Javascript | Python | Flask | HTML | CCS | SQL | MySQL</p>
          <div className="link">
            <a href="#" target="_blank" class="icon instagram">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" class="icon facebook">
              <FaFacebook />
            </a>
            <a href="#" target="_blank" class="icon linkedin">
              <FaLinkedin />
            </a>
            <a href="https://github.com/MartinLFD" target="_blank" class="icon Github">
              <FaGithub />
            </a>
          </div>

        </div>
      </div>
      <div className="team-members">
        <div className="face front">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFRtUBenylrQqH5OcF7xt5GaziXQxUzjjZow&s" alt="" />
          <h3>Rodrigo Francisco</h3>
        </div>
        <div className="face back">
          <h3>Rodrigo Francisco</h3>
          <p>Full Stack Developer | Desarrollador Web | React | Javascript | Python | Flask | HTML | CCS | SQL | MySQL</p>
          <div className="link">
            <a href="#" target="_blank" class="icon instagram">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" class="icon facebook">
              <FaFacebook />
            </a>
            <a href="#" target="_blank" class="icon linkedin">
              <FaLinkedin />
            </a>
            <a href="https://github.com/RodrigoFranciscom" target="_blank" class="icon Github">
              <FaGithub />
            </a>

          </div>

        </div>
      </div>
      <div className="team-members">
        <div className="face front">
          <img src="https://img.freepik.com/vector-premium/ilustracion-vectorial-joven-computadora-portatil-manos_1142-67465.jpg" alt="" />
          <h3>Jose Betancourt</h3>
        </div>
        <div className="face back">
          <h3>Jose Betancourt</h3>
          <p>Full Stack Developer | Desarrollador Web | React | Javascript | Python | Flask | HTML | CCS | SQL | MySQL</p>
          <div className="link">
            <a href="#" target="_blank" class="icon instagram">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" class="icon facebook">
              <FaFacebook />
            </a>
            <a href="#" target="_blank" class="icon linkedin">
              <FaLinkedin />
            </a>
            <a href="https://github.com/JoseB852" target="_blank" class="icon Github">
              <FaGithub />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
