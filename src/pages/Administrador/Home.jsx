import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Necesario para la redirección
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import "./home.scss";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";

const Home = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Verificar si los datos necesarios están en localStorage
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('id_usuario');
        
        if (!token || !userId) {
            // Si no están presentes, redirige al login
            navigate("/loginmod");
        } else {
            setIsAuthenticated(true);  // Si están presentes, se establece como autenticado
        }
    }, [navigate]);

    if (!isAuthenticated) {
        return null; // Si no está autenticado, no se renderiza nada (se redirige al login)
    }

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">
                    <Widget type="user" />
                    <Widget type="order" />
                    <Widget type="balance" />
                </div>
                <div className="charts">
                    {/* <Featured /> */}
                    <Chart />
                </div>
                <div className="listContainer">
                    <div className="listTitle">Últimos Agregados</div>
                    <List />
                </div>
            </div>
        </div>
    );
};

export default Home;
