import "./dataimportant.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Datatable = () => {
  const [productos, setProductos] = useState([]);

  // Función para listar todos los productos
  const listarProductos = async () => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/productos`;
      const respuesta = await axios.get(url);
      setProductos(
        respuesta.data.map((producto) => ({
          id: producto._id,
          Nombre: producto.Nombre,
          precio: producto.precio,
          estado: producto.Estado ? "Activo" : "Inactivo",
        }))
      );
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  // Cambiar estado del producto
  const cambiarEstadoProducto = async (idProducto) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/producto/estado/${idProducto}`;
      const respuesta = await axios.put(url);
      Swal.fire("Estado cambiado", respuesta.data.msg, "success");
      listarProductos();
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
    }
  };

  // Eliminar producto
  const eliminarProducto = async (idProducto) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/producto/${idProducto}`;
      await axios.delete(url);
      Swal.fire("¡Eliminado!", "El producto ha sido eliminado.", "success");
      listarProductos();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  // Confirmar eliminación
  const confirmarEliminacion = (idProducto) => {
    Swal.fire({
      title: "¿Desea realmente eliminar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarProducto(idProducto);
      }
    });
  };

  useEffect(() => {
    listarProductos();
  }, []);

  // Configuración de columnas
  const columns = [
    { field: "id", headerName: "ID de Producto", width: 250 },
    { field: "Nombre", headerName: "Nombre", width: 250 },
    { field: "precio", headerName: "Precio", width: 100 },
    { field: "estado", headerName: "Estado", width: 120 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Acciones",
      width: 300,
      renderCell: (params) => (
        <div className="cellAction">
          <Link to={`/productos/${params.row.id}`} style={{ textDecoration: "none" }}>
            <div className="viewButton">Detalle</div>
          </Link>
          {/* <Link to={`/producto/edit/${params.row.id}`} style={{ textDecoration: "none" }}>
            <div className="updateButton">Actualizar</div>
          </Link> */}
          <div
            className="stateButton"
            onClick={() => cambiarEstadoProducto(params.row.id)}
          >
            Cambiar Estado
          </div>
          <div
            className="deleteButton"
            onClick={() => confirmarEliminacion(params.row.id)}
          >
            Eliminar
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        Productos
        <Link to="/productos/add" className="link">
          Registrar Nuevo Producto
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={productos}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        // checkboxSelection
      />
    </div>
  );
};

export default Datatable;
