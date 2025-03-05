import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = () => {
    const { store, actions } = useContext(Context);
    const { theid } = useParams(); // Obtenemos el ID desde la URL

    // Buscamos el contacto en el store
    const contact = store.demo.find(contact => contact.id == theid);

    if (!contact) {
        return (
            <div className="container text-center mt-5">
                <h1>Contact not found</h1>
                <Link to="/">
                    <button className="btn btn-primary">Back to Contacts</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card p-4">
                <h1 className="display-4">{contact.name}</h1>
                <hr className="my-4" />
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Phone:</strong> {contact.phone}</p>
                <p><strong>Address:</strong> {contact.address}</p>

                <Link to="/">
                    <button className="btn btn-primary">Back to Contacts</button>
                </Link>
            </div>
        </div>
    );
};
