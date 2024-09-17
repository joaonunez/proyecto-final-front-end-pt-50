import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../store/context';

export function RegisterForm() {
  const { actions } = useContext(Context);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const success = await actions.register({
      first_name: firstName,
      last_name: lastName,
      rut: rut,
      email: email,
      password: password,
      phone: phone
    });

    if (success) {
      navigate("/login"); 
    } else {
      setError("Error al registrar el usuario, inténtalo nuevamente.");
    }
  };

  return (
    <div className="register-form">
      <h2>Registro</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">Nombre</label>
          <input 
            type="text" 
            id="firstName" 
            className="form-control" 
            placeholder="Ingresa tu nombre" 
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Apellido</label>
          <input 
            type="text" 
            id="lastName" 
            className="form-control" 
            placeholder="Ingresa tu apellido" 
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rut">RUT</label>
          <input 
            type="text" 
            id="rut" 
            className="form-control" 
            placeholder="Ingresa tu RUT" 
            required
            value={rut}
            onChange={(e) => setRut(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input 
            type="email" 
            id="email" 
            className="form-control" 
            placeholder="Ingresa tu correo" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input 
            type="password" 
            id="password" 
            className="form-control" 
            placeholder="Ingresa tu contraseña" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Teléfono (opcional)</label>
          <input 
            type="text" 
            id="phone" 
            className="form-control" 
            placeholder="Ingresa tu teléfono" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-register-container">
          Registrar
        </button>
      </form>
    </div>
  );
}
