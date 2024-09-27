const getState = ({ getActions, getStore, setStore }) => {
  return {
    store: {
      user: JSON.parse(localStorage.getItem("user")) || null, // almacenamos el usuario logueado si está en localStorage
      token: localStorage.getItem("token") || null, // guardamos el token de acceso
      refreshToken: localStorage.getItem("refresh_token") || null, // guardamos el refresh token
      error: null,
      campings: [], // lista de campings
      reviews: [], // lista de reseñas
      reservations: [], // lista de reservaciones generales
      reservationsByUser: [], // lista de reservaciones específicas de un usuario
      sites: [],
      selectedSite: null,
      services: [],
    },
    actions: {
      // registrar proveedor
      registerProvider: async (providerData) => {
        try {
          const response = await fetch("http://localhost:3001/user/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...providerData,
              role_id: 2, // asigna el rol de proveedor
            }),
          });

          if (response.ok) {
            return true;
          } else {
            console.error("Error al registrar el proveedor");
            return false;
          }
        } catch (err) {
          console.error("Error en la solicitud de registro:", err);
          return false;
        }
      },

      // registrar cliente
      registerCustomer: async (userData) => {
        try {
          const response = await fetch("http://localhost:3001/user/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...userData,
              role_id: 3, // asigna el rol de cliente
            }),
          });

          if (response.ok) {
            return true;
          } else {
            console.error("Error al registrar el usuario");
            return false;
          }
        } catch (err) {
          console.error("Error en la solicitud de registro:", err);
          return false;
        }
      },

      // login de usuario
      login: async (email, password) => {
        try {
          const response = await fetch("http://localhost:3001/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          const result = await response.json();

          if (response.ok) {
            // actualiza el store y el localStorage con el token y el refresh token
            setStore({
              user: result.user,
              token: result.token,
              refreshToken: result.refresh_token,
              error: null,
            });

            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", result.token);
            localStorage.setItem("refresh_token", result.refresh_token);
            return true;
          } else {
            setStore({ error: result.error });
            return false;
          }
        } catch (err) {
          console.error("Error en la solicitud:", err);
          setStore({ error: "Error de conexión. Intenta nuevamente." });
          return false;
        }
      },

      // logout del usuario
      logout: () => {
        setStore({ user: null, token: null, refreshToken: null });
        // limpiar el localStorage al cerrar sesión
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
      },

      // cargar usuario desde localStorage al inicializar la aplicación
      loadUserFromStorage: () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refresh_token"); // también cargar el refresh token
        if (user && token && refreshToken) {
          setStore({ user, token, refreshToken });
        }
      },

      // obtener lista de campings
      getCampings: async () => {
        try {
          const response = await fetch("http://localhost:3001/camping/camping", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            setStore({ campings: data });
          } else {
            console.error("Error al obtener campings.");
          }
        } catch (err) {
          console.error("Error en la solicitud de campings:", err);
        }
      },

      // obtener lista de campings de un proveedor
      getProviderCampings: async () => {
        const store = getStore();
        try {
          const response = await fetch(`http://localhost:3001/camping/provider/${store.user.id}/campings`, {
            headers: {
              Authorization: `Bearer ${store.token}`, // token de acceso para autenticar la solicitud
            },
          });
          if (response.ok) {
            const data = await response.json();
            setStore({ campings: data, error: null });
          } else {
            setStore({ campings: [], error: "No se encontraron campings para este proveedor." });
          }
        } catch (err) {
          console.error("Error al obtener campings:", err);
          setStore({ error: "Error al cargar campings. Por favor, intenta nuevamente." });
        }
      },

      // obtener reseñas de un camping específico
      getReviews: async (campingId) => {
        try {
          const response = await fetch(`http://localhost:3001/review/camping/${campingId}/reviews`, {
            headers: {
              Accept: "application/json",
            },
          });
          if (response.ok) {
            const data = await response.json();
            setStore({ reviews: data });
          } else {
            console.error("Error al obtener los comentarios del camping.");
          }
        } catch (err) {
          console.error("Error en la solicitud de comentarios del camping:", err);
        }
      },

      // obtener sitios de un camping específico
      getSiteByCamping: async (campingId) => {
        try {
          const response = await fetch(`http://localhost:3001/site/camping/${campingId}/sites`, {
            headers: {
              Accept: "application/json",
            },
          });
          if (response.ok) {
            const data = await response.json();
            setStore({ site: data });
          } else {
            console.error("Error al obtener los sitios del camping");
          }
        } catch (err) {
          console.error("Error en la solicitud de sitios del camping:", err);
        }
      },
      // actualizar usuario logueado
      updateUser: async (userData) => {
        const store = getStore();
        try {
          const response = await fetch("http://localhost:3001/user/user", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.token}`, // usa el token para autorizar la solicitud
            },
            body: JSON.stringify(userData),
          });
          if (response.ok) {
            const updatedUser = await response.json();
            setStore({ user: updatedUser });
            localStorage.setItem("user", JSON.stringify(updatedUser));
            return true;
          } else if (response.status === 401) {
            // intenta refrescar el token si el estado es 401
            const tokenRefreshed = await getActions().refreshToken();
            if (tokenRefreshed) {
              return await getActions().updateUser(userData); // reintentar la solicitud con el nuevo token
            }
            return false;
          } else {
            const errorData = await response.json();
            console.error("Error al actualizar el usuario:", errorData);
            return false;
          }
        } catch (err) {
          console.error("Error en updateUser:", err);
          return false;
        }
      },

      // actualizar correo del usuario
      updateEmail: async (emailData) => {
        const store = getStore();
        try {
          const response = await fetch("http://localhost:3001/user/update_email", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.token}`,
            },
            body: JSON.stringify(emailData),
          });
          if (response.ok) {
            let updatedUser = { ...store.user, email: emailData.email };
            setStore({ user: updatedUser });
            localStorage.setItem("user", JSON.stringify(updatedUser));
            return true;
          } else {
            const errorData = await response.json();
            console.error("Error al actualizar el correo:", errorData);
            return false;
          }
        } catch (err) {
          console.error("Error en updateEmail:", err);
          return false;
        }
      },

      // actualizar contraseña del usuario
      updatePassword: async (passwordData) => {
        const store = getStore();
        try {
          const response = await fetch("http://localhost:3001/user/update_password", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.token}`,
            },
            body: JSON.stringify(passwordData),
          });
          if (response.ok) {
            return true;
          } else {
            const errorData = await response.json();
            console.error("Error al actualizar la contraseña:", errorData);
            return false;
          }
        } catch (err) {
          console.error("Error en updatePassword:", err);
          return false;
        }
      },

      // actualizar teléfono del usuario
      updatePhone: async (phoneData) => {
        const store = getStore();
        try {
          const response = await fetch("http://localhost:3001/user/update_phone", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.token}`,
            },
            body: JSON.stringify(phoneData),
          });
          if (response.ok) {
            const updatedUser = await response.json();
            setStore({ user: updatedUser });
            localStorage.setItem("user", JSON.stringify(updatedUser));
            return true;
          } else {
            const errorData = await response.json();
            console.error("Error al actualizar el teléfono:", errorData);
            return false;
          }
        } catch (err) {
          console.error("Error en updatePhone:", err);
          return false;
        }
      },

      // refrescar token de acceso
      refreshToken: async () => {
        const store = getStore();
        try {
          const response = await fetch("http://localhost:3001/user/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.refreshToken}`, // usa el refresh token para obtener un nuevo access token
            },
          });

          if (response.ok) {
            const result = await response.json();
            // actualizar el store con el nuevo token de acceso
            setStore({ token: result.token });
            localStorage.setItem("token", result.token); // guarda el nuevo token en el localStorage
            return true;
          } else {
            console.error("Error al refrescar el token.");
            return false;
          }
        } catch (err) {
          console.error("Error en la solicitud de refresco de token:", err);
          return false;
        }
      },

      getReservationsByUserId: async (userId) => {
        const store = getStore();
        try {
          const response = await fetch(`http://localhost:3001/reservation/user/${userId}/reservations`, {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setStore({ reservationsByUser: data, error: null });
            return true;
          } else {
            const errorData = await response.json();
            setStore({ reservationsByUser: [], error: errorData.error || "Error al obtener reservaciones" });
            return false;
          }
        } catch (error) {
          console.error("Error al obtener reservaciones por ID de usuario:", error);
          setStore({ error: "Error al cargar las reservaciones. Por favor, intenta nuevamente." });
          return false;
        }
      },
      getSitesByCamping: async (campingId) => {
        try {
          const response = await fetch(`http://localhost:3001/site/camping/${campingId}/sites`, {
            headers: {
              Accept: "application/json",
            },
          });
          if (response.ok) {
            const data = await response.json();
            console.log("Sitios obtenidos:", data);   
            setStore({ sites: Array.isArray(data) ? data : [] });
          } else {
            console.error("Error al obtener los sitios");
            setStore({ sites: [] });
          }
        } catch (error) {
          console.error("Error al obtener sitios:", error);
          setStore({ sites: [] }); 
        }
      },

      
      selectSite: (site) => {
        setStore({ selectedSite: site });
        localStorage.setItem("selectedSite", JSON.stringify(site)); 
      },

      loadSelectedSiteFromStorage: () => {
        const site = JSON.parse(localStorage.getItem("selectedSite"));
        if (site) {
          setStore({ selectedSite: site });
        }
      },

      makeReservation: async (reservationData) => {
        const store = getStore();
        try {
          const response = await fetch("http://localhost:3001/reservation/reservation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.token}`, 
            },
            body: JSON.stringify(reservationData),
          });
          if (response.ok) {
            console.log("Reserva realizada exitosamente");
            return true;
          } else {
            console.error("Error al realizar la reserva");
            return false;
          }
        } catch (error) {
          console.error("Error en la solicitud de reserva:", error);
          return false;
        }
      },
      deleteReservation: async (reservationId, password) => {
        const store = getStore();
        try {
          const response = await fetch(`http://localhost:3001/reservation/reservation/${reservationId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.token}`, 
            },
            body: JSON.stringify({ password }) // para enviar la contraseña ala solicitud
          });
      
          if (response.ok) {
            return true;
          } else {
            console.error("Error al cancelar la reserva");
            return false;
          }
        } catch (err) {
          console.error("Error en la solicitud de cancelación:", err);
          return false;
        }
      },
      

  
    },
  };
};

export default getState;
