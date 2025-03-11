import React, { useEffect, useContext, useState } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(false); // Nuevo estado para manejar el botón de carga

    useEffect(() => {
        
        actions.loadContacts(); // Asegura que los contactos se carguen cuando la vista se monta
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita el refresh de la página
        if (loading) return; // Evita múltiples clics
        setLoading(true); // Deshabilita el botón

        console.log("Formulario enviado:", store.inputs);

        // Verificar si el contacto ya existe antes de agregarlo
        /* const contactExists = store.demo.some(
            (contact) => contact.email === store.inputs.email || contact.phone === store.inputs.phone
        );

        if (contactExists) {
            alert("Este contacto ya existe.");
            setLoading(false);
            return;
        } */

        actions.sendForm(store.inputs) 
        setLoading(false)
    };

    const handleChange = (e) => {
        actions.setInputs({ ...store.inputs, [e.target.name]: e.target.value });
    };

    return (
        <>
            <form className="container-fluid px-5 pt-5" onSubmit={handleSubmit}>
                <h1 className="text-center">Add a new contact</h1>

                <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input type="text" value={store.inputs.name || ""} onChange={handleChange} name="name" className="form-control" placeholder="Full Name" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" value={store.inputs.email || ""} onChange={handleChange} name="email" className="form-control" placeholder="Enter email" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input type="text" value={store.inputs.phone || ""} onChange={handleChange} name="phone" className="form-control" placeholder="Enter phone" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" value={store.inputs.address || ""} onChange={handleChange} name="address" className="form-control" placeholder="Enter address" required />
                </div>

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </form>

            <div className="ml-auto">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <div className="getBack ps-5">or get back to contacts</div>
                </Link>
            </div>
        </>
    );
};
