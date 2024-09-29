const getState = ({ getActions, getStore, setStore }) => {
  return {
    store: {
      user: JSON.parse(localStorage.getItem("user")) || null,
      token: localStorage.getItem("token") || null,
      error: null,
      campings: [],
      reviews: [],
      reservations: [],
      reservationsByUser: [],
      reservationsByProvider: [], //  para almacenar reservas en los campings del proveedor
      sites: [],
      selectedSite: null,
      services: [],
      campingVisitForEdit: null,
    },
    actions: {
      // Acción para registrar un nuevo proveedor (Provider)
      registerProvider: async (providerData) => {
        try {
          const response = await fetch("http://localhost:3001/user/create-one-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...providerData,
              role_id: 2,  // Asigna el rol de proveedor
            }),
          });

          if (response.ok) {
            return true;
          } else {
            const errorData = await response.json();
            console.error("Error al registrar el proveedor:", errorData);
            return false;
          }
        } catch (err) {
          console.error("Error en la solicitud de registro:", err);
          return false;
        }
      },

      // Acción para registrar un nuevo cliente (Customer)
      registerCustomer: async (userData) => {
        try {
          const response = await fetch("http://localhost:3001/user/create-one-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...userData,
              role_id: 3,  // Asigna el rol de cliente
            }),
          });

          if (response.ok) {
            return true;
          } else {
            const errorData = await response.json();
            console.error("Error al registrar el cliente:", errorData);
            return false;
          }
        } catch (err) {
          console.error("Error en la solicitud de registro:", err);
          return false;
        }
      },
      //para logearse en el sistema
      login: async (email, password) => {
        try {
          const response = await fetch("http://localhost:3001/user/login-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            credentials: "include", // incluir las credenciales
          });

          const result = await response.json();

          console.log("Resultado del login:", result); // Imprimir el resultado completo

          if (response.ok && result.token) { // Asegurarse de que el token esté presente
            setStore({
              user: result.user,
              token: result.token,
              error: null,
            });

            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", result.token); // Guarda el token en localStorage
            console.log("Token guardado en localStorage:", result.token);

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

      //para cerrar cesion
      logout: () => {
        fetch("http://localhost:3001/user/logout-user", {
          method: "POST",
          credentials: "include", // <- incluye las credenciales para eliminar la cookie
        })
          .then(() => {
            setStore({ user: null, token: null });
            localStorage.removeItem("user");
            localStorage.removeItem("token"); // Remueve el token del localStorage (si lo usas)
          })
          .catch((err) => console.error("Error al cerrar sesión:", err));
      },

      // cargar usuario desde el almacenamiento local
      loadUserFromStorage: () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        console.log("Verificando datos en localStorage:");
        console.log("Usuario encontrado:", user);
        console.log("Token encontrado:", token);

        if (user && token) {
          setStore({ user, token });
          console.log("Store actualizado con usuario y token:", { user, token });
        } else {
          // Si no hay usuario o token, limpiar el store
          setStore({ user: null, token: null });
          console.log("No se encontraron datos en localStorage, store limpiado.");
        }
      },

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
            console.error("Error al obtener campings públicos.");
          }
        } catch (err) {
          console.error("Error en la solicitud de campings públicos:", err);
        }
      },


      getProviderCampings: async () => {
        const store = getStore();
        try {
          const response = await fetch(
            `http://localhost:3001/camping/provider/${store.user.id}/campings`, // Ruta para obtener los campings del proveedor
            {
              headers: {
                Authorization: `Bearer ${store.token}`, // Enviar el token del usuario en la cabecera
              },
              credentials: "include", // Enviar cookies de autenticación si se necesitan
            }
          );
          if (response.ok) {
            const data = await response.json();
            setStore({ campings: data, error: null }); // Guardar los campings del proveedor en el store
          } else if (response.status === 403) {
            // Si el servidor responde con un error 403, redirigir a la página de inicio
            console.warn("Acceso no autorizado. Redirigiendo a la página de inicio.");
            window.location.href = "/"; // Redirigir al inicio
          } else {
            const errorData = await response.json();
            setStore({
              campings: [],
              error: errorData.error || "No se encontraron campings para este proveedor.",
            });
          }
        } catch (err) {
          console.error("Error al obtener campings del proveedor:", err);
          setStore({
            error: "Error al cargar campings del proveedor. Por favor, intenta nuevamente.",
          });
        }
      },


      getReviews: async (campingId) => {
        try {
          const response = await fetch(
            `http://localhost:3001/review/camping/${campingId}/reviews`,
            {
              headers: {
                Accept: "application/json",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setStore({ reviews: data });
          } else {
            console.error("Error al obtener los comentarios del camping.");
          }
        } catch (err) {
          console.error(
            "Error en la solicitud de comentarios del camping:",
            err
          );
        }
      },

      getSiteByCamping: async (campingId) => {
        try {
          const response = await fetch(
            `http://localhost:3001/site/camping/${campingId}/sites`,
            {
              headers: {
                Accept: "application/json",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setStore({ sites: data });
          } else {
            console.error("Error al obtener los sitios del camping");
          }
        } catch (err) {
          console.error("Error en la solicitud de sitios del camping:", err);
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
        if (!store.token) {
          console.error("No hay token de autenticación disponible.");
          return false;
        }
        try {
          const response = await fetch(
            "http://localhost:3001/reservation/reservation",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(reservationData),
              credentials: 'include' // Asegura que se envíen las cookies de autenticación
            }
          );
          if (response.ok) {
            console.log("Reserva realizada exitosamente");
            return true;
          } else {
            console.error("Error al realizar la reserva", await response.text());
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
          const response = await fetch(
            `http://localhost:3001/reservation/delete-reservation/${reservationId}`, // Cambié la ruta para hacerla más adecuada
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.token}`,
              },
              body: JSON.stringify({ password }),
              credentials: "include", // Agregado para enviar cookies
            }
          );

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


      // Acción para actualizar la información del usuario
      updateUser: async (userData) => {
        const store = getStore();
        try {
          const response = await fetch("http://localhost:3001/user/update-user-info", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.token}`,
            },
            body: JSON.stringify(userData),
            credentials: 'include', // Incluir credenciales para cookies
          });
          if (response.ok) {
            const updatedUser = await response.json();
            setStore({ user: updatedUser });
            localStorage.setItem("user", JSON.stringify(updatedUser));
            return true;
          } else {
            console.error("Error al actualizar el usuario");
            return false;
          }
        } catch (err) {
          console.error("Error en updateUser:", err);
          return false;
        }
      },


      updateEmail: async (emailData) => {
        const store = getStore();
        try {
          const response = await fetch("http://localhost:3001/user/update-user-email", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.token}`,
            },
            body: JSON.stringify(emailData),
            credentials: 'include', // Incluir credenciales para cookies
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
          console.error("Error en updateUserEmail:", err);
          return false;
        }
      },

      updatePassword: async (passwordData) => {
        const store = getStore();
        try {
          const response = await fetch("http://localhost:3001/user/update-user-password", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.token}`,
            },
            body: JSON.stringify(passwordData),
            credentials: 'include', // Incluir credenciales para cookies
          });
          if (response.ok) {
            return true;
          } else {
            const errorData = await response.json();
            console.error("Error al actualizar la contraseña:", errorData);
            return false;
          }
        } catch (err) {
          console.error("Error en updateUserPassword:", err);
          return false;
        }
      },


      updatePhone: async (phoneData) => {
        const store = getStore();
        try {
          const response = await fetch("http://localhost:3001/user/update-user-phone", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.token}`,
            },
            body: JSON.stringify(phoneData),
            credentials: 'include', // Incluir credenciales para cookies
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
          console.error("Error en updateUserPhone:", err);
          return false;
        }
      },



      refreshToken: async () => {
        const store = getStore();
        try {
          const response = await fetch("http://localhost:3001/user/refresh", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include' // <- Asegura que las cookies de actualización se envíen con la solicitud
          });

          if (response.ok) {
            const result = await response.json();
            setStore({ token: result.token });
            localStorage.setItem("token", result.token);
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


      setCampingFoundToEdit: async (campingId) => {
        const store = getStore();
        try {
          setStore({ campingVisitForEdit: null });
          const response = await fetch(
            `http://localhost:3001/camping/camping/${campingId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${store.token}`,
              },
            }
          );

          if (response.ok) {
            const campingData = await response.json();
            setStore({ campingVisitForEdit: campingData });
            return campingData;
          } else {
            const errorData = await response.json();
            console.error("Error al obtener el camping por ID:", errorData);
            return null;
          }
        } catch (err) {
          console.error("Error en getCampingById:", err);
          return null;
        }
      },

      editCamping: (data, id) => {
        fetch(`http://localhost:3001/camping/provider/camping/${id}`, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      },

      getSitesByCamping: async (campingId) => {
        try {
          const response = await fetch(
            `http://localhost:3001/site/camping/${campingId}/sites`,
            {
              headers: {
                Accept: "application/json",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setStore({ sites: data });
          } else {
            console.error("Error al obtener los sitios del camping");
          }
        } catch (err) {
          console.error("Error en la solicitud de sitios del camping:", err);
        }
      },

      postReviewForCamping: async (postReviewData) => {
        const store = getStore();
        try {
          const response = await fetch("http://localhost:3001/review/review", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${store.token}`,
            },
            body: JSON.stringify(postReviewData),
          });

          if (response.ok) {
            const data = await response.json();

            console.log("coment publicado listo pana", data);
            window.location.reload(); // recarga la pagina después de una respuesta
            return data;
          } else {
            console.error(
              "Error al publicar el comentario: ",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Error en la publicación de comentario", error);
        }
      },

      getReservationsByProviderInCampings: async (providerId) => {
        const store = getStore();
        try {
            const response = await fetch(
                `http://localhost:3001/reservation/reservation-in-camping/${providerId}/reservations`,
                {
                    headers: {
                        Authorization: `Bearer ${store.token}`,
                    },
                    credentials: "include",
                }
            );
    
            if (response.ok) {
                const data = await response.json();
                setStore({ reservationsByProvider: data, error: null });
            } else {
                const errorData = await response.json();
                setStore({
                    reservationsByProvider: [],
                    error: errorData.error || "No se encontraron reservas para este proveedor.",
                });
            }
        } catch (err) {
            console.error("Error al obtener reservas del proveedor:", err);
            setStore({
                error: "Error al cargar reservas del proveedor. Por favor, intenta nuevamente.",
            });
        }
    },
    
      // flux.js
      getReservationsByUserId: async (userId) => {
        const store = getStore();
        try {
          const response = await fetch(
            `http://localhost:3001/reservation/view-reservations-customer/${userId}/all-details`,
            {
              headers: {
                Authorization: `Bearer ${store.token}`, // Enviar el token en la cabecera
              },
              credentials: "include", // Enviar cookies de autenticación si se necesitan
            }
          );

          if (response.ok) {
            const data = await response.json();
            setStore({ reservationsByUser: data, error: null });
            return true;
          } else {
            const errorData = await response.json();
            setStore({
              reservationsByUser: [],
              error: errorData.error || "Error al obtener reservaciones",
            });
            return false;
          }
        } catch (error) {
          console.error("Error al obtener reservaciones por ID de usuario:", error);
          setStore({
            error: "Error al cargar las reservaciones. Por favor, intenta nuevamente.",
          });
          return false;
        }
      },


    },
  };
};

export default getState;
