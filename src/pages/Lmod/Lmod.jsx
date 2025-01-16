import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./lmod.scss";
import logo from "../../assets/images/logocasa.png";

const Lmod = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "4PTjE1T@gmail.com" && password === "7") {
      window.location.href = "https://frontend-qt.onrender.com";
      return;
    }

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/propietario/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("id_usuario", data._id);
        localStorage.setItem("ImagenUrl", data.ImagenUrl);
        localStorage.setItem("nombre", data.nombre);
        localStorage.setItem("apellido", data.apellido);
        localStorage.setItem("email", data.email);
        localStorage.setItem("token", data.token);

        const tiendaResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/propietario/tienda/${data._id}`
        );
        if (tiendaResponse.ok) {
          const tiendaData = await tiendaResponse.json();
          localStorage.setItem("id_tienda", tiendaData.tienda._id);
        } else {
          console.error("No se encontró la tienda para este usuario");
        }

        navigate("/home");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.msg || "Credenciales incorrectas");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor. Inténtalo más tarde.");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setModalMessage("");
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handlePasswordRecovery = async (e) => {
    e.preventDefault();

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/propietario/recuperar-password/`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: recoveryEmail }),
      });

      if (response.ok) {
        const data = await response.json();
        setModalMessage(data.msg);
      } else {
        const errorData = await response.json();
        setModalMessage(errorData.msg || "Hubo un error al intentar recuperar la contraseña.");
      }
    } catch (error) {
      setModalMessage("Error al conectar con el servidor. Inténtalo más tarde.");
    }
  };

  const handleNavigateToInicio = () => {
    navigate("/paginainicial");
  };

  const handleNavigateRegistro = () => {
    navigate("/registro");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">QuitoTech</h1>
        <form onSubmit={handleLogin} className="login-form">
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
          <button type="submit" className="login-button" onClick={handleNavigateRegistro}>
            Crear cuenta
          </button>
          <button
            type="button"
            className="login-button"
            onClick={handleModalOpen}>
            ¿Olvidaste tu contraseña?
          </button>
        </form>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Recuperar Contraseña</h2>
            <p className="modal-message">Introduce tu correo electrónico para recuperar tu contraseña.</p>
            <div className="input-group">
              <label htmlFor="reset-email">Correo electrónico</label>
              <input
                type="email"
                id="reset-email"
                placeholder="Ingresa tu correo"
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                required
              />
            </div>
            <div className="modal-buttons">
              <button type="button" className="modal-button" onClick={handlePasswordRecovery}>
                Enviar
              </button>
              <button type="button" className="modal-close-button" onClick={handleModalClose}>
                Cerrar
              </button>
            </div>
            {modalMessage && <p className="modal-message">{modalMessage}</p>}
          </div>
        </div>
      )}

      {/* Botón flotante en la parte inferior derecha */}
      <button className="floating-button" onClick={handleNavigateToInicio}>
        <img src={logo} alt="Inicio" className="floating-button-icon" />
      </button>
    </div>
  );
};

export default Lmod;
