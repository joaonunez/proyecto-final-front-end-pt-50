import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './store/context';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { store } = useContext(Context);
  const location = useLocation(); // Obtener la ubicación actual para redireccionamientos condicionales.

  // Si no hay token y no está en las rutas públicas (login o register), redirigir a login.
  if (!store.token) {
    if (location.pathname === "/login" || location.pathname === "/register") {
      return children;
    }
    return <Navigate to="/login" />;
  }

  // Si el usuario tiene un token y está en login o register, redirigir a la página de inicio.
  if (store.token && (location.pathname === "/login" || location.pathname === "/register")) {
    return <Navigate to="/" />;
  }

  // Verificar si el rol requerido es un array y si el rol del usuario está incluido.
  if (Array.isArray(requiredRole)) {
    if (!requiredRole.includes(store.user.role.id)) {
      return <Navigate to="/" />; // Redirigir a la página de inicio si el rol no coincide.
    }
  } else if (requiredRole && store.user.role.id !== requiredRole) {
    return <Navigate to="/" />; // Redirigir a la página de inicio si no tiene el rol requerido.
  }

  // Si cumple con las condiciones de autenticación y rol, renderizar el componente hijo.
  return children;
};

export default ProtectedRoute;
