import "./acount.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Para obtener el parámetro de la URL
import axios from "axios";

const Acount = () => {
  const [moderador, setModerador] = useState(null); // Estado para los datos del moderador
  const [loading, setLoading] = useState(true); // Estado para el estado de carga
  const [error, setError] = useState(null); // Estado para errores

  const { modId } = useParams(); // Obtener el ID del moderador desde la URL

  useEffect(() => {
    const fetchModerador = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/propietario/perfil/${modId}`
        );
        setModerador(response.data); // Guardamos los datos del moderador
      } catch (err) {
        console.error("Error fetching moderador data:", err);
        setError("No se pudo cargar la información del moderador.");
      } finally {
        setLoading(false); // Cambiamos el estado de carga
      }
    };

    if (modId) {
      fetchModerador(); // Llama la función si `modId` está definido
    }
  }, [modId]);

  if (loading) {
    return <div>Cargando datos del moderador...</div>; // Muestra un mensaje mientras carga
  }

  if (error) {
    return <div>Error: {error}</div>; // Muestra el mensaje de error
  }

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Información del Moderador</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt="Foto del Moderador"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{moderador.nombre}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{moderador.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Teléfono:</span>
                  <span className="itemValue">{moderador.telefono}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Dirección:</span>
                  <span className="itemValue">{moderador.direccion}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Pais:</span>
                  <span className="itemValue">{moderador.pais}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Rol:</span>
                  <span className="itemValue">{moderador.role}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Estado:</span>
                  <span className="itemValue">
                    {moderador.estado ? "Activo" : "Inactivo"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Productos Agregados Recientemente</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Acount;
