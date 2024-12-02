import React from "react";
import "./opciones.scss";
import { Link } from "react-router-dom";

const Opciones = () => {
    return (
        <div className="opciones">
            <div className="wrapper">
                <div className="empresa">
                    QUITOTECH
                </div>
                <div className="items">
                    <div className="item">
                        <Link to="/loginmod" style={{ textDecoration: "none" }}>
                            <span className="bold-text">Ingresar</span>
                        </Link>
                    </div>
                    <div className="item">
                        <Link to="/registro" style={{ textDecoration: "none" }}>
                            <span className="bold-text">Registrarse</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Opciones;
