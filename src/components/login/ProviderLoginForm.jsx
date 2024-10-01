import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../store/context';

export function ProviderLoginForm() {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await actions.login(email, password);

    if (success) {
      navigate("/provider-dashboard"); 
    } else {
      setError(store.error);
    }
  };

  return (
    <div className="provider-login-container">
      <div className="provider-login-form">
        <h2>Iniciar Sesión Como Proveedor De Camping</h2>
        {error && <div className="provider-error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="provider-form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              className="provider-form-control"
              placeholder="Ingresa tu correo"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="provider-form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              className="provider-form-control"
              placeholder="Ingresa tu contraseña"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-provider-login-container">
            Iniciar Sesión
          </button>
        </form>
        <hr className="provider-login-separator" />
        <div className="provider-register-link">
          <p>¿No estás registrado? <a href="/provider-register">Regístrate como proveedor</a></p>
        </div>
      </div>
    </div>
  );
}
