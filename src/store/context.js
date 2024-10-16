import React, { useState, useEffect } from "react";
import getState from "./flux";

// Don't change, here is where we initialize our context, by default it's just going to be null.
export const Context = React.createContext(null);

// This function injects the global store to any view/component where you want to use it, we will inject the context to layout.js, you can see it here:
// https://github.com/4GeeksAcademy/react-hello-webapp/blob/master/src/js/layout.js#L35
const injectContext = (PassedComponent) => {
  const StoreWrapper = (props) => {
    const [state, setState] = useState(
      getState({
        getStore: () => state.store,
        getActions: () => state.actions,
        setStore: (updatedStore) =>
          setState({
            store: Object.assign(state.store, updatedStore),
            actions: { ...state.actions },
          }),
      })
    );

    useEffect(() => {
      // Cargar usuario y token desde localStorage al iniciar la app
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        setState((prevState) => ({
          ...prevState,
          store: {
            ...prevState.store,
            user: storedUser,
            token: storedToken,
          },
        }));
      }

      // Asegurarse de que se ejecuten las acciones necesarias después de cargar el usuario
      state.actions.loadUserFromStorage();
    }, []);

    return (
      <Context.Provider value={state}>
        <PassedComponent {...props} />
      </Context.Provider>
    );
  };
  return StoreWrapper;
};

export default injectContext;
