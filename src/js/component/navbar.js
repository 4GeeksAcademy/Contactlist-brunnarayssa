import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light px-3">
            <div className="container-fluid d-flex justify-content-between">
                <h4 className="m-0">Contact List</h4>
                <Link to="/add">
                    <button className="btn btn-success">Add new contact</button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
