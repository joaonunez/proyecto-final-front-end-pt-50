const getState = ({ getActions, getStore, setStore }) => {
  return {
    store: {
      user: null,
      token: null,
      error: null,
      campings: [],
      reviews: [],
      reservations: []
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
              role_id: 2, //para registrar un usuario con el rol de proveedor desde su seccion visual del register user
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
              role_id: 3, //para registrar un usuario con el rol de cliente desde su seccion visual del register user
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
      //metodo post para logearse en la aplicacion
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
            // si las credenciales son validas, declaramos el user en el store asi como tambien su token
            setStore({ user: result.user, token: result.token, error: null });

            localStorage.setItem("user", JSON.stringify(result.user)); //se agrega el user al local storage
            localStorage.setItem("token", result.token); //se agrega el token al local storage
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
        localStorage.removeItem("user"); //al cerrar sesion se remueve el usuario del store y del local storage
        localStorage.removeItem("token"); // lo mismo de arriba en base al token
      },
      loadUserFromStorage: () => {
        const user = JSON.parse(localStorage.getItem("user")); //preguntar al profe si es seguro eso en localstorage
        const token = localStorage.getItem("token"); //(preguntar)
        if (user && token) {
          setStore({ user, token });
        }
      },
      //metodo para obtener todos los campings en  la vistaC ampingsList
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
      //para obtener todos los campings de los que sea dueño un proveedor mediante su id en su dashboard
      getProviderCampings: async () => {
        const store = getStore();
        try {
          const response = await fetch(`http://localhost:3001/camping/provider/${store.user.id}/campings`, {
            headers: {
              Authorization: `Bearer ${store.token}`,//esto es para validar y autenticar a los usuarios para ver si el usuario tiene permiso para acceder a ciertos recursos del servidor 
              //en cada solicitud se debe validad la identdiad y permisos del usuario
              //se verifificara el token almacenado en el store.
            },
          });
          if (response.ok) {
            const data = await response.json();
            setStore({ campings: data, error: null });
          } else {
            setStore({ campings: [], error: "No se encontraron campings para este proveedor." });
          }
        } catch (err) {
          console.error("Error fetching campings:", err);
          setStore({ error: "Error al cargar campings. Por favor, intenta nuevamente." });
        }
      },
      //para obtener unos reviews atraves del useparams en el componente Camping.jsx, para asi poder obntener los reviews de cada camping
      getReviews: async (campingId) => {
        const store = getStore();
        try {
          const response = await fetch(`http://localhost:3001/review/camping/${campingId}/reviews`, {
            headers: {
              'Accept': 'application/json',
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
      getSiteByCamping: async (campingId) => {
        try {
          const response = await fetch(`http://localhost:3001/site/camping/${campingId}/sites`, {
            headers: {
              'Accept': 'application/json',
            },
          });
          if (response.ok) {
            const data = await response.json();
            setStore({ site: data });
          } else {
            console.error("error al obtener los sitios del camping");
          }
        } catch (err) {
          console.error("Error en la solicitud de sitios del camping:", err);
        }
      },
      //Traer data de reservas en relación al usuario logeado
      getReservationByUser: async () => {
        const store = getStore(); 
        try {
          const response = await fetch('http://localhost:3001/reservation/reservation', {
            headers: {
              Authorization: `Bearer ${store.token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setStore({ reservations: data, error: null });
          } else { 
            setStore({ reservations: [], error: "No se encontraron reservaciones para este usuario."});
          }
        } catch (error) {
          console.error("Error fetching reservations:", error);
          setStore({ error: "Error al cargar las reservaciones. Por favor, intente nuevamente."})        
        }
      }
    }
  };
};

  export default getState;














