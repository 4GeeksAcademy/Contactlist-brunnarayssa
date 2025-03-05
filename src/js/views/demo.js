import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/demo.css";
import ContactCard from "../component/ContactCard";

export const Demo = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.loadContacts(); // Asegura que los contactos se carguen cuando la vista se monta
	}, []);

	return (
		<div className="container-fluid">
			<ul className="list-group m-4">
				{store.demo.length === 0 ? (
					<p className="text-center">No contacts found. Add a new one!</p>
				) : (
					store.demo.map((item, index) => (
						<li
							key={item.id} // Ahora usamos item.id en lugar de index
							className="list-group-item d-flex justify-content-between"
							style={{ background: "white" }}>
							
							<ContactCard item={item} index={index} />
						</li>
					))
				)}
			</ul>
		</div>
	);
};
