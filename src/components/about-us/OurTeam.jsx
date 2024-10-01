import React from "react";

export function OurTeam() {
  return (
    <section className="about-section">
      <h2>Nuestro Equipo</h2>
      <p>
        Nuestro equipo está formado por profesionales apasionados y dedicados,
        cada uno con habilidades únicas para llevar a cabo proyectos innovadores y eficientes.
      </p>
      <div className="team-members">
        <div className="team-member">
          <h4>Rodrigo Morales</h4>
          <p>Diseñador Gráfico & Desarrollador Front End</p>
        </div>
        <div className="team-member">
          <h4>Martin Leiva</h4>
          <p>Desarrollador Full Stack & Administrador de Base de Datos</p>
        </div>
        <div className="team-member">
          <h4>Joao Nuñez</h4>
          <p>Desarrollador Full Stack</p>
        </div>
        <div className="team-member">
          <h4>José Antonio</h4>
          <p>Desarrollador Backend & Scrum Master</p>
        </div>
      </div>
    </section>
  );
}
