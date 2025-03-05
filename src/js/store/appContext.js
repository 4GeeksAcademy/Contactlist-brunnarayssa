import React, { useState, useEffect } from "react";
import getState from "./flux.js";

export const Context = React.createContext(null);

const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        const [state, setState] = useState(() =>
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updatedStore) =>
                    setState((prevState) => ({
                        store: { ...prevState.store, ...updatedStore },
                        actions: { ...prevState.actions }
                    }))
            })
        );

        useEffect(() => {
            if (state.actions.loadContacts) {
                state.actions.loadContacts(); // Cambio de loadSomeData a loadContacts (suponiendo que sea la acción correcta)
            }
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
