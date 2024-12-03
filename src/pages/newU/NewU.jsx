import "./newu.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import Swal from "sweetalert2"; // Importa SweetAlert

const NewProduct = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    cantidad: "",
    precio: "",
    id_tienda: localStorage.getItem("id_tienda"),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Verificación de campos vacíos usando SweetAlert
    if (!formData.nombre || !formData.categoria || !formData.cantidad || !formData.precio || !file) {
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Por favor, completa todos los campos y selecciona una imagen.",
      });
      return;
    }
  
    const data = new FormData();
    data.append("Nombre", formData.nombre);
    data.append("Categoria", formData.categoria);
    data.append("Cantidad", formData.cantidad);
    data.append("precio", formData.precio);
    data.append("id_tienda", formData.id_tienda);
    data.append("imagen", file);
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/producto/registro`, {
        method: "POST",
        body: data,
      });
  
      const result = await response.json();
      if (response.ok) {
        // Alerta de éxito con SweetAlert
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Producto registrado exitosamente.",
        });
        setFormData({
          nombre: "",
          categoria: "",
          cantidad: "",
          precio: "",
          id_tienda: localStorage.getItem("id_tienda"),
        });
        setFile(null);
      } else {
        // Alerta de error con SweetAlert
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: `Error: ${result.msg}`,
        });
      }
    } catch (error) {
      console.error("Error al registrar el producto:", error);
      // Alerta de error con SweetAlert
      Swal.fire({
        icon: "error",
        title: "¡Error!",
        text: "Hubo un problema al enviar los datos.",
      });
    }
  };  

  return (
    <div className="newProduct">
      <div><Sidebar /></div>  
      <div className="newProductContainer">
        <div><Navbar /></div>
        <div className="content">
          <h1>Registrar Producto</h1>
          <div className="formWrapper">
            <div className="imagePreview">
              <img
                src={file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                alt="Vista previa"
              />
            </div>
            <form onSubmit={handleSubmit} className="form">
              <div className="formGroup">
                <label htmlFor="file">
                  Imagen <DriveFolderUploadOutlinedIcon />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formGroup">
                <label>Nombre del Producto</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre del producto"
                  required
                />
              </div>
              <div className="formGroup">
                <label>Categoría</label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Selecciona una categoría
                  </option>
                  <option value="Mandos">Mandos</option>
                  <option value="Consolas">Consolas</option>
                  <option value="Videojuegos">Videojuegos</option>
                  <option value="Perifericos">Periféricos</option>
                  <option value="ComponentesPC">Componentes PC</option>
                  <option value="Otros">Otros</option>
                </select>
              </div>
              <div className="formGroup">
                <label>Cantidad</label>
                <input
                  type="number"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleInputChange}
                  placeholder="Cantidad disponible"
                  min="1"
                  required
                />
              </div>
              <div className="formGroup">
                <label>Precio</label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleInputChange}
                  placeholder="Precio del producto"
                  step="0.01"
                  required
                />
              </div>
              <button type="submit" className="submitButton">
                Registrar Producto
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
