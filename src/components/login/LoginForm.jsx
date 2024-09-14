import React from 'react';
import { Link } from 'react-router-dom';
export function LoginForm () {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input type="email" id="email" className="form-control" placeholder="Ingresa tu correo" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" className="form-control" placeholder="Ingresa tu contraseña" required />
          </div>
          <button type="submit" className="btn-login-container">
            <Link className="btn-login-link">Iniciar Sesión</Link>
          </button>
        </form>
        <hr className="login-separator" />
        <div className="register-link">
          <p>¿No estás registrado? <a href="/register">Regístrate</a></p>
        </div>
      </div>
    </div>
  );
};


