import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const Profile = () => {
  const [usuario, setUsuario] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    email: "",
    imagen: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const id_usuario = localStorage.getItem("id_usuario");
      if (!id_usuario) return;

      setLoading(true);
      const response = await fetch(`http://localhost:3000/tienda/${id_usuario}`);
      const data = await response.json();
      setUsuario(data);
      setFormData({
        nombre: data.nombre || "",
        apellido: data.apellido || "",
        telefono: data.telefono || "",
        direccion: data.direccion || "",
        email: data.email || "",
        imagen: null,
      });
    } catch (error) {
      console.error("Error al obtener datos del perfil:", error);
      Swal.fire("Error", "No se pudo cargar el perfil", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    fetchProfileData();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, imagen: e.target.files[0] });
  };

  const handleSaveClick = async () => {
    Swal.fire({
      title: "¿Guardar cambios?",
      text: "Se actualizará tu perfil con los nuevos datos.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, guardar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const id_usuario = localStorage.getItem("id_usuario");
          if (!id_usuario) return;

          setLoading(true);
          const formDataToSend = new FormData();
          formDataToSend.append("nombre", formData.nombre);
          formDataToSend.append("apellido", formData.apellido);
          formDataToSend.append("telefono", formData.telefono);
          formDataToSend.append("direccion", formData.direccion);
          if (formData.imagen) {
            formDataToSend.append("imagen", formData.imagen);
          }

          const response = await fetch(`http://localhost:3000/tienda/${id_usuario}`, {
            method: "PUT",
            body: formDataToSend,
          });

          if (response.ok) {
            setEditMode(false);
            fetchProfileData();
            Swal.fire("Guardado", "Tu perfil ha sido actualizado", "success").then(() => {
              if (!formData.password || formData.password.trim() === "") {
                Swal.fire("Atención", "Por favor ingrese su contraseña para finalizar o cámbiela", "warning");
              }
            });
          } else {
            Swal.fire("Error", "No se pudo actualizar el perfil", "error");
          }
        } catch (error) {
          console.error("Error al guardar los cambios:", error);
          Swal.fire("Error", "No se pudo guardar los cambios", "error");
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Perfil de Usuario</h2>
      <div className="card p-4">
        {loading && <div className="text-center">Cargando...</div>}
        {!loading && (
          <>
            <div className="text-center">
              <img
                src={usuario?.imagenUrl || "/default-avatar.png"}
                alt="Avatar"
                className="rounded-circle mb-3"
                width="150"
              />
            </div>
            {editMode && (
              <div className="mb-3">
                <label className="form-label">Actualizar Imagen</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
            )}
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className="form-control"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input
                type="text"
                className="form-control"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="d-flex justify-content-between">
              {editMode ? (
                <>
                  <button className="btn btn-success" onClick={handleSaveClick} disabled={loading}>
                    Guardar
                  </button>
                  <button className="btn btn-secondary" onClick={handleCancelClick} disabled={loading}>
                    Cancelar
                  </button>
                </>
              ) : (
                <button className="btn btn-primary" onClick={handleEditClick}>
                  Editar
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
