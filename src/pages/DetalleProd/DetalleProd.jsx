import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import "./DetalleProd.scss";

export default function ProductDetail() {
  const [producto, setProducto] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    Nombre: "",
    Categoria: "",
    precio: "",
    Estado: true, // Valor booleano para "Disponible"
    Cantidad: "",
    imagen: null,
  });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/producto/${id}`);
        setProducto(response.data);
        setFormData({
          Nombre: response.data.Nombre,
          Categoria: response.data.Categoria,
          precio: response.data.precio,
          Estado: response.data.Estado, // Estado: true o false
          Cantidad: response.data.Cantidad,
          imagenUrl: response.data.imagenUrl || "",
        });
      } catch (err) {
        setError("No se pudo cargar el producto");
        Swal.fire("Error", "No se pudo cargar el producto", "error");
      }
    };

    fetchProducto();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imagen: file,
      });
    }
  };

  const handleSaveClick = async () => {
    const form = new FormData();
    form.append("Nombre", formData.Nombre);
    form.append("Categoria", formData.Categoria);
    form.append("precio", formData.precio);
    form.append("Estado", formData.Estado);
    form.append("Cantidad", formData.Cantidad);

    if (formData.imagen) {
      form.append("imagen", formData.imagen);
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/producto/${id}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      Swal.fire("Éxito", "Producto actualizado correctamente", "success");
      setIsEditing(false);
      setProducto(response.data);

      navigate(`/productos`);
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el producto", "error");
    }
  };

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
    navigate(-1);
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
                    <select
                      name="Categoria"
                      value={formData.Categoria}
                      onChange={handleInputChange}
                    >
                      <option value="Mandos">Mandos</option>
                      <option value="Consolas">Consolas</option>
                      <option value="Videojuegos">Videojuegos</option>
                      <option value="Perifericos">Perifericos</option>
                      <option value="ComponentesPC">Componentes PC</option>
                      <option value="Otros">Otros</option>
                    </select>
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
                    <select
                      name="Estado"
                      value={formData.Estado}
                      onChange={handleInputChange}
                    >
                      <option value={true}>Disponible</option>
                      <option value={false}>No disponible</option>
                    </select>
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

            <div className="button-wrapper">
              {isEditing ? (
                <div>
                  <button className="card-button" onClick={handleSaveClick}>
                    Guardar Cambios
                  </button>
                  <button className="card-button" onClick={handleCancelEdit}>
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
