const getState = ({ getStore, getActions, setStore }) => {
  return {
      store: {
          demo: [], // Aquí se almacenan los contactos
          inputs: {
              name: "",
              phone: "",
              email: "",
              address: "",
          },
          selectedId: null, // ID del contacto seleccionado para editar
      },

      actions: {
          setInputs: (newInputs) => {
              setStore({ inputs: newInputs });
          },

          sendForm: () => {
              const store = getStore();
              console.log("Enviando contacto:", store.inputs);

              const requestOption = {
                  method: store.selectedId ? "PUT" : "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                      name: store.inputs.name.trim(),
                      phone: store.inputs.phone.trim(),
                      email: store.inputs.email.trim(),
                      address: store.inputs.address.trim(),
                  }),
              };

              const url = store.selectedId
                  ? `https://playground.4geeks.com/contact/agendas/brunnarayssa/${store.selectedId}`
                  : `https://playground.4geeks.com/contact/agendas/brunnarayssa`;

              fetch(url, requestOption)
                  .then((response) => {
                      if (!response.ok) throw new Error("Error en la solicitud");
                      return response.json();
                  })
                  .then(() => {
                      console.log("Contacto guardado correctamente");
                      setStore({
                          inputs: { name: "", phone: "", email: "", address: "" },
                          selectedId: null,
                      });
                      getActions().loadContacts();
                  })
                  .catch((error) => console.error("Error al guardar contacto:", error));
          },

          loadContacts: () => {
              console.log("Cargando contactos...");

              fetch("https://playground.4geeks.com/contact/agendas/brunnarayssa")
                  .then((response) => {
                      if (!response.ok) throw new Error("Error al cargar contactos");
                      return response.json();
                  })
                  .then((data) => {
                      if (Array.isArray(data.contacts)) {
                          setStore({ demo: data.contacts });
                          console.log("Contactos cargados:", data.contacts);
                      } else {
                          console.error("Error: la API no devolvió un array válido");
                      }
                  })
                  .catch((error) => console.error("Error al obtener contactos:", error));
          },

          deleteItem: (id) => {
              console.log("Eliminando contacto:", id);
              const requestOption = {
                  method: "DELETE",
                  headers: { "Content-Type": "application/json" },
              };

              fetch(`https://playground.4geeks.com/contact/agendas/brunnarayssa/${id}`, requestOption)
                  .then((response) => {
                      if (!response.ok) throw new Error("Error al eliminar contacto");
                      return response.text();
                  })
                  .then(() => {
                      console.log("Contacto eliminado correctamente");
                      getActions().loadContacts();
                  })
                  .catch((error) => console.error("Error al eliminar contacto:", error));
          },

          modifyContact: (id) => {
              console.log("Cargando contacto para edición:", id);
              const store = getStore();
              const contact = store.demo.find((contact) => contact.id == id);

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
                  console.log("Datos cargados en el formulario:", contact);
              } else {
                  console.error("Contacto no encontrado");
              }
          },
      },
  };
};

export default getState;
