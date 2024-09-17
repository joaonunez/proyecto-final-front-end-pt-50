const getState = ({ getActions, getStore, setStore }) => {
    return {
      store: {
        user: null,
        error: null,
      },
      actions: {
        register: async (userData) => {
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
              setStore({ user: result.user, error: null });
              localStorage.setItem("user", JSON.stringify(result.user));
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
          setStore({ user: null });
          localStorage.removeItem("user");
        },
        loadUserFromStorage: () => {
          const user = JSON.parse(localStorage.getItem("user"));
          if (user) {
            setStore({ user });
          }
        }
      }
    };
  };
  
  export default getState;
  