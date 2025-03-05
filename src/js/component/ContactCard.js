import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

const ContactCard = ({ item }) => {
    const { actions } = useContext(Context);

    return (
        <div className="d-flex align-items-center p-3 border rounded">
            {/* Imagen del contacto */}
            <div className="col-auto">
                <img
                    src="https://img.freepik.com/fotos-premium/mejores-gafas-hombre-mejores-lentes_759095-27098.jpg"
                    className="rounded-circle"
                    alt="User"
                    width="100"
                />
            </div>

            {/* Información del usuario */}
            <div className="userInfo col ms-3">
                <h4>{item.name || "No name"}</h4>
                <p className="text-secondary">
                    <i className="fa-solid fa-location-dot"></i> {item.address || "No address"}
                </p>
                <p className="text-secondary">
                    <i className="fa-solid fa-phone"></i> {item.phone || "No phone"}
                </p>
                <p className="text-secondary">
                    <i className="fa-solid fa-envelope"></i> {item.email || "No email"}
                </p>
            </div>

            {/* Botones de acción */}
            <div className="col-auto">
                {/* ✅ Botón corregido para editar */}
                <Link to={`/edit/${item.id}`}>
                    <button className="btn btn-warning me-2" onClick={() => actions.modifyContact(item.id)}>
                        <i className="fa-solid fa-pencil"></i>
                    </button>
                </Link>

                {/* Botón de eliminar con confirmación */}
                <button className="btn btn-danger" onClick={() => {
                    if (window.confirm("¿Estás seguro de que quieres eliminar este contacto?")) {
                        actions.deleteItem(item.id);
                    }
                }}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    );
};

export default ContactCard;

