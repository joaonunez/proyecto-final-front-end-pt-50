const getState = ({ getActions, getStore, setStore }) => {
  return {
    store: {
      user: null,
      token: null, 
      error: null,
      campings:[],
    },
    actions: {
      registerProvider: async (providerData) => {
        try {
          const response = await fetch("http://localhost:3001/user/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...providerData,
              role_id: 2, 
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
      registerCustomer: async (userData) => {
        try {
          const response = await fetch("http://localhost:3001/user/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...userData,
              role_id: 3, 
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
            // Guardar usuario y token en el store y localStorage.
            setStore({ user: result.user, token: result.token, error: null });
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", result.token); // Guardar el token.
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
      logout: () => {
        setStore({ user: null, token: null }); 
        localStorage.removeItem("user"); // eliminar el user del localstorage
        localStorage.removeItem("token"); // eliminar el token del localstorage
      },
      loadUserFromStorage: () => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token"); //cargar el token del localstorage
        if (user && token) {
          setStore({ user, token }); // establecer el usuario y el token en el store
        }
      },
      getProviderCampings: async () => {
        const store = getStore();
        try {
          const response = await fetch(`http://localhost:3001/camping/provider/${store.user.id}/campings`, {
            headers: {
              Authorization: `Bearer ${store.token}`, // usamos el token desde el store
            },
          });
          if (response.ok) {
            const data = await response.json();
            setStore({ campings: data, error: null }); // actualizamos el store con los campings obtenidos
          } else {
            setStore({ campings: [], error: "No se encontraron campings para este proveedor." });
          }
        } catch (err) {
          console.error("Error fetching campings:", err);
          setStore({ error: "Error al cargar campings. Por favor, intenta nuevamente." });
        }
      },
    }
  };
};

export default getState;
