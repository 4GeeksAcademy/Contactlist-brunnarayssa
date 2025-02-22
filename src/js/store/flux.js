import { Link } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      demo: [],
      inputs: {
        name: "",
        phone: "",
        email: "",
        address: "",
      },
    },

    actions: {
      setInputs: (newInputs) => {
        setStore({ inputs: newInputs });
      },

      sendForm: (inputs) => {
        const store = getStore();
        console.log("addContact");

        const requestOption = {
          method: store.selectedId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: inputs.name,
            phone: inputs.phone,
            email: inputs.email,
            address: inputs.address,
          }),
        };

        const url = store.selectedId
          ? `https://playground.4geeks.com/contact/agendas/brunnarayssa/` + store.selectedId
          : `https://playground.4geeks.com/contact/agendas/brunnarayssa`;

        fetch(url, requestOption)
          .then((response) => response.json())
          .then((data) => {
            fetch("https://playground.4geeks.com/contact/agendas/brunnarayssa")
              .then((response) => response.json())
              .then((data) => setStore({ demo: data.contacts }));
          });
      },

      loadSomeData: () => {
        console.log("loadSomeData");

        fetch("https://playground.4geeks.com/contact/agendas/brunnarayssa")
          .then((response) => response.json())
          .then((data) => setStore({ demo: data.contacts }));
      },

      deleteItem: (id) => {
        console.log("deleteItm", id);
        const requestOption = {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        };
        fetch(
          "https://playground.4geeks.com/contact/agendas/brunnarayssa/" + id,
          requestOption
        )
          .then((response) => response.text())
          .then((data) => {
            fetch("https://playground.4geeks.com/contact/agendas/brunnarayssa")
              .then((response) => response.json())
              .then((data) => setStore({ demo: data.contacts }));
          });
      },

      modifyContact: (id, inputs) => {
        console.log("modifyCont", id);
        fetch("https://playground.4geeks.com/contact/agendas/brunnarayssa/")
          .then((response) => response.json())
          .then((data) => {
            const contact = data.contacts.find((contact) => contact.id === id);

            if (contact) {
              setStore({
                inputs: {
                  name: contact.name,
                  phone: contact.phone,
                  email: contact.email,
                  address: contact.address,
                },
                selectedId: id,
              });
              console.log("datos cargados en el form", contact);
            }
          });
      },
    },
  };
};

export default getState;
