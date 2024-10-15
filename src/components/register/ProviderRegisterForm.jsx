import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../store/context';

export function ProviderRegisterForm() {
  const { actions } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  // Expresiones regulares para validaciones
  const rutRegex = /^\d{2}\.\d{3}\.\d{3}-[\dkK]{1}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
  const phoneRegex = /^\d{9}$/;

  const validateFields = () => {
    const newErrors = {};

    // Validación de nombre
    if (!firstName.trim()) newErrors.firstName = "El nombre es obligatorio.";

    // Validación de apellido
    if (!lastName.trim()) newErrors.lastName = "El apellido es obligatorio.";

    // Validación de RUT
    if (!rutRegex.test(rut)) newErrors.rut = "El RUT debe tener el formato 12.345.678-9.";

    // Validación de email
    if (!email.trim()) newErrors.email = "El correo electrónico es obligatorio.";

    // Validación de contraseña
    if (!passwordRegex.test(password)) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres, una mayúscula y un símbolo.";
    }

    // Validación de teléfono (opcional, pero si está presente, debe tener 9 dígitos)
    if (phone && !phoneRegex.test(phone)) {
      newErrors.phone = "El teléfono debe tener exactamente 9 dígitos.";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar las validaciones del formulario
    if (!validateFields()) return; // Detener el envío si hay errores

    // Intentar registrar al proveedor
    const { success, message } = await actions.registerProvider({
      first_name: firstName,
      last_name: lastName,
      rut: rut,
      email: email,
      password: password,
      phone: phone
    });

    if (success) {
      navigate("/provider-login"); // Redirigir al login de proveedores si todo está bien
    } else {
      // Manejar errores específicos como RUT duplicado o correo duplicado
      if (message === "El RUT ingresado ya está registrado.") {
        setError((prevErrors) => ({ ...prevErrors, rut: message }));
      } else if (message === "El correo electrónico ya está en uso.") {
        setError((prevErrors) => ({ ...prevErrors, email: message }));
      } else {
        setError({ general: message }); // Mensaje general para otros errores
      }
    }
  };

  return (
    <div className="provider-register-page">
      <div className="provider-register-form-container">
        <h2 className='text-center'>Registro de Proveedor</h2>
        {error.general && <div className="provider-error-message">{error.general}</div>}
        <form onSubmit={handleSubmit}>
          <div className={`provider-form-group ${error.firstName ? 'has-error' : ''}`}>
            <label htmlFor="firstName">Nombre</label>
            <input
              type="text"
              id="firstName"
              className="provider-form-control"
              placeholder="Ingresa tu nombre"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {error.firstName && <div className="error-message">{error.firstName}</div>}
          </div>

          <div className={`provider-form-group ${error.lastName ? 'has-error' : ''}`}>
            <label htmlFor="lastName">Apellido</label>
            <input
              type="text"
              id="lastName"
              className="provider-form-control"
              placeholder="Ingresa tu apellido"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {error.lastName && <div className="error-message">{error.lastName}</div>}
          </div>

          <div className={`provider-form-group ${error.rut ? 'has-error' : ''}`}>
            <label htmlFor="rut">RUT</label>
            <input
              type="text"
              id="rut"
              className="provider-form-control"
              placeholder="Ingresa tu RUT"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
            />
            {error.rut && <div className="error-message">{error.rut}</div>}
          </div>

          <div className={`provider-form-group ${error.email ? 'has-error' : ''}`}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className="provider-form-control"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.email && <div className="error-message">{error.email}</div>}
          </div>

          <div className={`provider-form-group ${error.password ? 'has-error' : ''}`}>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              className="provider-form-control"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && <div className="error-message">{error.password}</div>}
          </div>

          <div className={`provider-form-group ${error.phone ? 'has-error' : ''}`}>
            <label htmlFor="phone">Teléfono (opcional)</label>
            <input
              type="text"
              id="phone"
              className="provider-form-control"
              placeholder="Ingresa tu teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {error.phone && <div className="error-message">{error.phone}</div>}
          </div>

          <button type="submit" className="btn-provider-register-container">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}
