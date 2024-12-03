import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import "./DetalleProd.scss";

export default function ProductDetail() {
  const [producto, setProducto] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar el modo de edición
  const [formData, setFormData] = useState({
    Nombre: "",
    Categoria: "",
    precio: "",
    Estado: "",
    Cantidad: "",
    imagen: null, // Para manejar la imagen
  });
  const [error, setError] = useState(null);
  const { id } = useParams(); // Obtener el id desde la URL
  const navigate = useNavigate();

  // Obtener los detalles del producto
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/producto/${id}`);
        setProducto(response.data);
        setFormData({
          Nombre: response.data.Nombre,
          Categoria: response.data.Categoria,
          precio: response.data.precio,
          Estado: response.data.Estado,
          Cantidad: response.data.Cantidad,
          imagenUrl: response.data.imagenUrl || "", // Establecer imagenUrl si existe
        });
      } catch (err) {
        setError("No se pudo cargar el producto");
        Swal.fire("Error", "No se pudo cargar el producto", "error");
      }
    };

    fetchProducto();
  }, [id]);

  // Función para manejar el clic de editar
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Función para manejar el cambio en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para manejar el cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imagen: file, // Guardar la imagen seleccionada en el estado
      });
    }
  };

  // Función para manejar el envío del formulario (guardar cambios)
  const handleSaveClick = async () => {
    const form = new FormData();
    form.append("Nombre", formData.Nombre);
    form.append("Categoria", formData.Categoria);
    form.append("precio", formData.precio);
    form.append("Estado", formData.Estado);
    form.append("Cantidad", formData.Cantidad);

    if (formData.imagen) {
      form.append("imagen", formData.imagen); // Agregar la imagen al formulario
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/producto/${id}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Es importante para enviar archivos
          },
        }
      );

      Swal.fire("Éxito", "Producto actualizado correctamente", "success");
      setIsEditing(false); // Desactivar el modo de edición
      setProducto(response.data); // Actualizar el producto con los nuevos datos

      // Redirigir al usuario a la misma página para recargar los datos
      navigate(`/producto/${id}`);
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el producto", "error");
    }
  };

  // Función para manejar la cancelación de edición
  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      Nombre: producto?.Nombre,
      Categoria: producto?.Categoria,
      precio: producto?.precio,
      Estado: producto?.Estado,
      Cantidad: producto?.Cantidad,
      imagenUrl: producto?.imagenUrl || "",
    });
  };

  const handleGoBack = () => {
    navigate(-1); // Volver a la página anterior
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!producto) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="product-detail">
      <Sidebar />
      <div className="product-detail-container">
        <Navbar />
        <div className="product-detail-content">
          <div className="card">
            <div className="card-header">Detalle del Producto</div>

            <div className="info-wrapper">
              <div className="product-info">
                <div className="product-text">
                  <p><strong>Nombre:</strong></p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="Nombre"
                      value={formData.Nombre}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{producto?.Nombre}</p>
                  )}

                  <p><strong>Categoría:</strong></p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="Categoria"
                      value={formData.Categoria}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{producto?.Categoria}</p>
                  )}

                  <p><strong>Precio:</strong></p>
                  {isEditing ? (
                    <input
                      type="number"
                      name="precio"
                      value={formData.precio}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{producto?.precio}</p>
                  )}

                  <p><strong>Estado:</strong></p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="Estado"
                      value={formData.Estado}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{producto?.Estado ? "Disponible" : "No disponible"}</p>
                  )}

                  <p><strong>Cantidad:</strong></p>
                  {isEditing ? (
                    <input
                      type="number"
                      name="Cantidad"
                      value={formData.Cantidad}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{producto?.Cantidad}</p>
                  )}

                  {isEditing && (
                    <>
                      <p><strong>Cargar nueva imagen:</strong></p>
                      <input
                        type="file"
                        name="imagen"
                        onChange={handleImageChange}
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="product-image">
                <img
                  src={formData.imagenUrl || "/default-product.png"}
                  alt="Product"
                  className="product-avatar"
                />
              </div>
            </div>

            {/* Botones de acción */}
            <div className="button-wrapper">
              {isEditing ? (
                <div>
                  <button className="card-button" onClick={handleSaveClick}>
                    Guardar Cambios
                  </button>
                  <button
                    className="card-button"
                    onClick={handleCancelEdit} // Cancelar edición
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <>
                  <button className="card-button" onClick={handleEditClick}>
                    Cambiar Información
                  </button>
                  <button className="card-button" onClick={handleGoBack}>
                    Volver
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
