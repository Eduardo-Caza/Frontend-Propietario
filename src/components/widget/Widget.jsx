import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useEffect, useState } from "react";

const Widget = ({ type }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Obtener el idTienda del localStorage
  const id_tienda = localStorage.getItem("id_tienda");

  // Construir la URL dinámicamente
  const url = id_tienda
    ? `${import.meta.env.VITE_BACKEND_URL}/administrador/estadisticas/${id_tienda}`
    : `${import.meta.env.VITE_BACKEND_URL}/administrador/estadisticas`;

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los datos del servidor");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener datos:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [url]); // Agregar URL como dependencia

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  let widgetData;

  switch (type) {
    case "user":
      widgetData = {
        title: "USUARIOS",
        isMoney: false,
        value: data.cantidadUsuarios,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{ color: "crimson", background: "rgba(255,0,0,0.2)" }}
          />
        ),
      };
      break;
    case "order":
      widgetData = {
        title: "TIENDAS",
        isMoney: false,
        value: data.cantidadTiendasRegistradas,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              color: "goldenrod",
              background: "rgba(218,165,32,0.2)",
            }}
          />
        ),
      };
      break;
    case "balance":
      widgetData = {
        title: "PRODUCTOS",
        isMoney: false,
        value: id_tienda === null ? data.cantidadProductos : data.productos,
        icon: (
          <InventoryIcon
            className="icon"
            style={{ color: "purple", background: "rgba(128,0,128,0.2)" }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{widgetData.title}</span>
        <span className="counter">
          {widgetData.isMoney && "$"}
          {widgetData.value}
        </span>
        <span className="link">{widgetData.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
        </div>
        {widgetData.icon}
      </div>
    </div>
  );
};

export default Widget;
