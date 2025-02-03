import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [usuario, setUsuario] = useState(null);
  const [tienda, setTienda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    numero: null,
    alerta_cantidad: "",
    direccion: "",
    nombreTienda: "",
    password: "",
    imagen: null,
  });
  const [emailChanged, setEmailChanged] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id_usuario");

  // Función para manejar el clic de editar
  const handleEditClick = () => {
    Swal.fire({
      title: "Le recordamos que tiene que ingresar su contraseña para evitar la perdida de su cuenta.",
      icon: "info",
      confirmButtonText: "Aceptar",
    });
    setIsEditing(true);
  };

  // Función para manejar el cambio en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email") {
      setEmailChanged(value !== usuario?.email); // Detecta si el email ha cambiado
    }
  };

  // Función para manejar el cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imagen: file,
      });
    }
  };

  // Función para manejar el envío del formulario
  const handleSaveClick = async () => {
    // Verificación de campos vacíos
    const camposVacios = Object.values(formData).some((value) => !value && value !== 0 && value !== null);

    if (formData.password.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Contraseña vacía",
        text: "Por favor, ingrese una contraseña válida si desea cambiarla.",
      });
      return;
    }

    if (camposVacios) {
      Swal.fire({
        icon: "error",
        title: "Campos vacíos",
        text: "Por favor, complete todos los campos antes de guardar los cambios.",
      });
      return;
    }

    // Muestra la alerta de confirmación con dos botones
    Swal.fire({
      title: "¿Está seguro de que desea guardar los cambios?",
      text: "Recuerde que debe ingresar su contraseña para confirmar los cambios.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, estoy seguro",
      cancelButtonText: "No, no estoy seguro",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const form = new FormData();
          form.append("nombre", formData.nombre);
          form.append("apellido", formData.apellido);
          form.append("email", formData.email);
          form.append("numero", formData.numero);
          form.append("alerta_cantidad", formData.alerta_cantidad);
          form.append("Direccion", formData.direccion);
          form.append("nombreTienda", formData.nombreTienda);

          if (formData.password && formData.password.trim() !== "") {
            form.append("password", formData.password);
          }

          if (formData.imagen) {
            form.append("imagen", formData.imagen);
          }

          const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/propietario/${userId}`,
            form,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          setUsuario(response.data.usuario);
          setTienda(response.data.tienda);
          setIsEditing(false);

          Swal.fire({
            icon: "success",
            title: "Éxito",
            text: response.data.msg,
          });

          // Recargar datos de perfil
          const fetchProfileData = async () => {
            try {
              const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/propietario/perfil/${userId}`
              );
              setUsuario(response.data.usuario);
              setTienda(response.data.tienda);
              setFormData({
                nombre: response.data.usuario.nombre,
                apellido: response.data.usuario.apellido,
                email: response.data.usuario.email,
                numero: response.data.usuario.numero,
                alerta_cantidad: response.data.usuario.alerta_cantidad,
                direccion: response.data.tienda.direccion,
                nombreTienda: response.data.tienda.nombre,
              });
            } catch (err) {
              setError("No se pudo cargar el perfil o la tienda. Intente más tarde.");
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo cargar el perfil o la tienda. Intente más tarde.",
              });
            }
          };
          fetchProfileData();
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo actualizar la información. Intente más tarde.",
          });
        }
      } else {
        // Si el usuario elige "No, no estoy seguro", no hace nada
        Swal.fire({
          icon: "info",
          title: "Cancelado",
          text: "No se realizaron cambios.",
        });
      }
    });
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/propietario/perfil/${userId}`
        );
        setUsuario(response.data.usuario);
        setTienda(response.data.tienda);
        setLoading(false);
        setFormData({
          nombre: response.data.usuario.nombre,
          apellido: response.data.usuario.apellido,
          email: response.data.usuario.email,
          numero: response.data.usuario.numero,
          alerta_cantidad: response.data.usuario.alerta_cantidad,
          direccion: response.data.tienda.direccion,
          nombreTienda: response.data.tienda.nombre,
        });
      } catch (err) {
        setLoading(false);
        setError("No se pudo cargar el perfil o la tienda. Intente más tarde.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo cargar el perfil o la tienda. Intente más tarde.",
        });
      }
    };

    fetchProfileData();
  }, [userId]);

  if (loading) {
    return (
      <div className="loading">
        <p>Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="profile">
      <div><Sidebar /></div>
      <div className="profile-container">
        <div><Navbar /></div>
        <div className="profile-content">
          <div className="card">
            <div className="card-header">Información del Propietario</div>

            <div className="info-wrapper">
              <div className="user-info">
                <img
                  src={usuario?.imagenUrl || "/default-avatar.png"}
                  alt="Profile"
                  className="user-avatar"
                />
                <div className="user-text">
                  <p><strong>Nombre:</strong></p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{usuario?.nombre}</p>
                  )}
                  <p><strong>Apellido:</strong></p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{usuario?.apellido}</p>
                  )}
                  <p><strong>Email:</strong></p>
                  {isEditing ? (
                    <>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {emailChanged && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          Si actualiza su correo, deberá volver a verificar su cuenta con el correo enviado.
                        </p>
                      )}
                    </>
                  ) : (
                    <p>{usuario?.email}</p>
                  )}
                  <p><strong>Teléfono:</strong></p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="numero"
                      value={formData.numero}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{usuario?.numero}</p>
                  )}

                  {isEditing && (
                    <>
                      <p><strong>Alerta de Cantidad:</strong></p>
                      <input
                        type="number"
                        name="alerta_cantidad"
                        value={formData.alerta_cantidad}
                        onChange={handleInputChange}
                      />
                      <p><strong>Contraseña:</strong></p>
                      <p>Porfavor si no ingresa su contraseña no podra guardar cambios</p>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </>
                  )}

                  <p><strong>Tienda:</strong></p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="nombreTienda"
                      value={formData.nombreTienda}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{tienda?.nombre}</p>
                  )}

                  <p><strong>Dirección de la Tienda:</strong></p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <p>{tienda?.direccion}</p>
                  )}
                  {isEditing && (
                    <>
                      <p><strong>Imagen:</strong></p>
                      <input
                        type="file"
                        onChange={handleImageChange}
                      />
                    </>
                  )}
                  <div className="buttons">
                    {isEditing ? (
                      <button onClick={handleSaveClick}>Guardar Cambios</button>
                    ) : (
                      <button onClick={handleEditClick}>Editar</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
