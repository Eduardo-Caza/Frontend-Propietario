import { useEffect, useState } from "react";
import axios from "axios";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const [rows, setRows] = useState([]); // Estado para los productos
  const [loading, setLoading] = useState(true); // Estado para el loading
  const [error, setError] = useState(""); // Estado para manejar errores

  const idTienda = localStorage.getItem("id_tienda"); // Obtener id de la tienda del localStorage
  const url = `${import.meta.env.VITE_BACKEND_URL}/tienda/${idTienda}`; // URL con el id de tienda

  // UseEffect para hacer la solicitud al backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(url); // Hacemos la solicitud a la API

        console.log("Respuesta de la API:", response.data); // Verificamos la estructura de la respuesta

        // Revisamos si la respuesta tiene productos de una manera esperada
        if (Array.isArray(response.data)) {
          setRows(response.data); // Si la respuesta es un arreglo directo
        } else if (response.data && Array.isArray(response.data.productos)) {
          setRows(response.data.productos); // Si los productos están en response.data.productos
        } else {
          console.error("Estructura de datos inesperada:", response.data);
          setError("Estructura de datos inesperada");
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
        setError("Error al obtener los productos");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [url]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Producto</TableCell>
            <TableCell>Imagen</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row._id}> {/* Usamos _id para identificar cada producto */}
              <TableCell className="tableCell">{row.Nombre}</TableCell>
              <TableCell className="tableCell">{row.Categoria}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img
                    className="image"
                    src={row.imagenUrl}
                    alt={row.Nombre_producto}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      marginRight: "10px",
                      objectFit: "cover"
                    }}
                  />
                </div>
              </TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.Estado ? "Active" : "Inactive"}`}>
                  {row.Estado ? "Active" : "Inactive"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
