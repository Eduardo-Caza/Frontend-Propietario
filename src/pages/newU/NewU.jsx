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
                  onChange={(e) => {
                    // Asegura que solo se pueda ingresar hasta 3 dígitos
                    const value = Math.max(0, Math.min(999, e.target.value)); // Limita entre 1 y 999
                    handleInputChange({ target: { name: 'cantidad', value: value } });
                  }}
                  placeholder="Cantidad disponible"
                  min="1"
                  max="999"
                  required
                />
              </div>

              <div className="formGroup">
                <label>Precio</label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={(e) => {
                    let value = e.target.value;

                    // Limitar el total de dígitos a 6 (contando los decimales)
                    const parts = value.split(".");
                    if (parts.length > 1) {
                      // Si tiene parte decimal, limitamos el número de dígitos a 6
                      if (parts[0].length + parts[1].length > 6) {
                        value = `${parts[0]}.${parts[1].slice(0, 4)}`; // Máximo 4 decimales
                      }
                    } else {
                      if (value.length > 4) {
                        value = value.slice(0, 4); // Máximo 6 dígitos en total
                      }
                    }

                    // Si el valor tiene más de 2 decimales, cortamos a 2 decimales
                    if (value.includes(".")) {
                      const [integerPart, decimalPart] = value.split(".");
                      if (decimalPart.length > 2) {
                        value = `${integerPart}.${decimalPart.slice(0, 2)}`;
                      }
                    }

                    handleInputChange({ target: { name: 'precio', value } });
                  }}
                  onBlur={(e) => {
                    let value = e.target.value;

                    // Aseguramos que siempre haya dos decimales si no los tiene
                    if (value && !value.includes(".")) {
                      value = parseFloat(value).toFixed(2);
                    }

                    // Limitar a 6 dígitos en total
                    if (value.length > 6) {
                      value = value.slice(0, 6);
                    }

                    handleInputChange({ target: { name: 'precio', value } });
                  }}
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
