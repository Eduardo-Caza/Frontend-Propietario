import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Asegúrate de tener acceso a navigate

export default function Profile() {
  const [usuario, setUsuario] = useState(null);
  const [tienda, setTienda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar el modo de edición
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    numero: "",
    alerta_cantidad: "",
    direccion: "", // Corregir: asegurarse que esté en minúsculas
    nombreTienda: "",
    password: "", // Si el usuario desea cambiar la contraseña
    imagen: null, // Para manejar la imagen subida
  });
  const [emailChanged, setEmailChanged] = useState(false); // Estado para verificar si el email cambió
  const navigate = useNavigate();

  const userId = localStorage.getItem("id_usuario");

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
        imagen: file, // Guardar la imagen seleccionada en el estado
      });
    }
  };

  // Función para manejar el envío del formulario
  const handleSaveClick = async () => {
    try {
      const form = new FormData();
      form.append("nombre", formData.nombre);
      form.append("apellido", formData.apellido);
      form.append("email", formData.email);
      form.append("numero", formData.numero);
      form.append("alerta_cantidad", formData.alerta_cantidad);
      form.append("Direccion", formData.Direccion);
      form.append("nombreTienda", formData.nombreTienda);
      form.append("password", formData.password);

      if (formData.imagen) {
        form.append("imagen", formData.imagen); // Agregar la imagen al formulario
      }

      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/propietario/${userId}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Es importante para enviar archivos
          },
        }
      );

      // Si todo fue correcto, actualizar el perfil en el estado
      setUsuario(response.data.usuario);
      setTienda(response.data.tienda);
      setIsEditing(false); // Desactivar el modo de edición

      // Mostrar mensaje de éxito
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: response.data.msg,
      });

      // Recargar los datos del perfil después de guardar
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
            Direccion: response.data.tienda.direccion, // Asegúrate que la dirección se mantenga
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
  };

  // Obtener los datos del perfil
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
          Direccion: response.data.tienda.direccion, // Asegúrate de que esté en minúsculas
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
                  {/* Información editable */}
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

                  {/* Solo mostrar la alerta_cantidad y password cuando estamos en modo de edición */}
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
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="store-info">
                <p><strong>Nombre de la Tienda:</strong></p>
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
                <p><strong>Dirección:</strong></p>
                {isEditing ? (
                  <input
                    type="text"
                    name="Direccion"
                    value={formData.Direccion}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p>{tienda?.direccion}</p>
                )}

                {/* Opción para subir una nueva imagen, solo en modo de edición */}
                {isEditing && (
                  <>
                    <p><strong>Imagen de perfil:</strong></p>
                    <input
                      type="file"
                      name="imagen"
                      onChange={handleImageChange}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Botones de acción */}
            {isEditing ? (
              <div>
                <button className="card-button" onClick={handleSaveClick}>
                  Guardar Cambios
                </button>
                <button
                  className="card-button"
                  onClick={() => setIsEditing(false)} // Cancelar edición
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button className="card-button" onClick={handleEditClick}>
                Cambiar Información
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}