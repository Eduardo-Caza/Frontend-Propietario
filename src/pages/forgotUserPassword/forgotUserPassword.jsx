// src/views/RecuperarPassword.js

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./forgotUserPassword.scss";

const RecuperarPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false); // Para mostrar/ocultar nueva contraseña
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Para mostrar/ocultar confirmar contraseña
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/propietario/recuperar-password/${token}`);
        const data = await response.json();
        
        if (response.ok) {
          setIsTokenValid(true);
          setMessage(data.msg);
        } else {
          setMessage(data.msg || "El token no es válido.");
          setIsTokenValid(false);
        }
      } catch (error) {
        setMessage("Hubo un error al verificar el token.");
        setIsTokenValid(false);
      }
    };

    verifyToken();
  }, [token]);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/propietario/nuevo-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: newPassword, confirmpassword: confirmPassword }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.msg);
        setTimeout(() => {
          navigate("/"); // Redirige a login después de 3 segundos
        }, 3000);
      } else {
        setMessage(data.msg || "Error al cambiar la contraseña.");
      }
    } catch (error) {
      setMessage("Hubo un error al intentar cambiar la contraseña.");
    }
  };

  return (
    <div className="forgot-login-container">
  <div className="forgot-login-card">
    <h1 className="forgot-login-title">Recuperar Contraseña</h1>
    <form onSubmit={handlePasswordChange} className="forgot-login-form">
      {message && <p className="forgot-modal-message">{message}</p>}
      
      <div className="forgot-input-group">
        <label htmlFor="new-password">Nueva contraseña</label>
        <div className="forgot-password-wrapper">
          <input
            type={showNewPassword ? "text" : "password"}
            id="new-password"
            placeholder="********"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="forgot-toggle-password"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? "Ocultar" : "Ver"}
          </button>
        </div>
      </div>

      <div className="forgot-input-group">
        <label htmlFor="confirm-password">Confirmar contraseña</label>
        <div className="forgot-password-wrapper">
          <input
            type={showConfirmPassword ? "text" : "password"}
            id="confirm-password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="forgot-toggle-password"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "Ocultar" : "Ver"}
          </button>
        </div>
      </div>

      <button type="submit" className="forgot-modal-button" disabled={!isTokenValid}>
        Cambiar contraseña
      </button>
    </form>
  </div>
</div>
  );
};

export default RecuperarPassword;
