import React, { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el mensaje
    console.log("Mensaje enviado:", formData);
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Contacto</h2>
      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          placeholder="Tu nombre"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          placeholder="Tu correo"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Mensaje</label>
        <textarea
          id="message"
          name="message"
          className="form-control"
          placeholder="Escribe tu mensaje"
          value={formData.message}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn-contact-submit">
        Enviar
      </button>
    </form>
  );
}
