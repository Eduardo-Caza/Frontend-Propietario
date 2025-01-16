import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./page.scss";
import logoGamer from "../../../assets/images/logo.jpg";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const Page = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openDownloadDialog, setOpenDownloadDialog] = useState(false); // Nuevo estado para el diálogo de APK

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenDownloadDialog = () => {
    setOpenDownloadDialog(true); // Abre el diálogo de descarga
  };

  const handleCloseDownloadDialog = () => {
    setOpenDownloadDialog(false); // Cierra el diálogo de descarga
  };

  return (
    <div className="page">
      {/* Sección Principal */}
      <section className="main-section">
        <h2 className="title">Encuentra lo mejor del mundo gamer en Quito</h2>
        <p className="description">
          Si eres dueño de un local, regístrate y promociona tus artículos para que más personas los descubran. Si solo deseas explorar qué tiendas ofrecen los productos que buscas, descarga nuestra App y navega fácilmente entre las tiendas de todo Quito. ¡No te lo pierdas!
        </p>
        <div className="image-container">
          <img src={logoGamer} alt="logo-gamer" className="logo" />
        </div>
      </section>

      {/* Descargar APK */}
      <section className="download-section">
        <h3 className="subtitle">Descarga nuestra aplicación móvil</h3>
        <p className="text">
          Accede a las mejores tiendas gamer desde tu dispositivo móvil. ¡Disponible ahora!
        </p>
        <Button onClick={handleOpenDownloadDialog} className="button" style={{ textDecoration: "none", color: "inherit" }}>
          Descargar APK
        </Button>
      </section>

      {/* Términos y Condiciones */}
      <section className="terms-section">
        <h3 className="subtitle">Términos y Condiciones</h3>
        <p className="text">
          Por favor, lee nuestros términos y condiciones haciendo clic{" "}
          <span
            onClick={handleOpenModal}
            className="link"
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "#c39dda",
            }}
          >
            aquí
          </span>.
        </p>
      </section>

      {/* Modal de Términos */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        PaperProps={{
          style: {
            backgroundColor: "#1a1a1a",
            color: "#e0e0e0",
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle
          style={{
            fontSize: "1.5rem",
            color: "#9b4ddb",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          Términos y Condiciones
        </DialogTitle>
        <DialogContent>
          <p style={{ lineHeight: "1.5", fontSize: "1rem", color: "#ccc" }}>
            <strong>1. Aceptación de los Términos:</strong> Al acceder y utilizar los servicios de QuitoTECH, aceptas estos términos y condiciones en su totalidad.
          </p>
          <p style={{ lineHeight: "1.5", fontSize: "1rem", color: "#ccc" }}>
            <strong>2. Modificaciones:</strong> Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones se publicarán en esta página, y se considera que has aceptado los nuevos términos si continúas utilizando nuestros servicios.
          </p>
          <p style={{ lineHeight: "1.5", fontSize: "1rem", color: "#ccc" }}>
            <strong>3. Uso de los Servicios:</strong> Te comprometes a utilizar los servicios de manera responsable y a no realizar actividades que puedan dañar o afectar el funcionamiento de la plataforma.
          </p>
          <p style={{ lineHeight: "1.5", fontSize: "1rem", color: "#ccc" }}>
            <strong>4. Propiedad Intelectual:</strong> Todos los derechos de propiedad intelectual relacionados con los servicios de QuitoTECH son propiedad de la empresa. Queda prohibido el uso no autorizado de nuestros contenidos.
          </p>
          <p style={{ lineHeight: "1.5", fontSize: "1rem", color: "#ccc" }}>
            <strong>5. Limitación de Responsabilidad:</strong> QuitoTECH no será responsable de ningún daño indirecto, incidental o consecuente que surja del uso de nuestros servicios.
          </p>
          <p style={{ lineHeight: "1.5", fontSize: "1rem", color: "#ccc" }}>
            <strong>6. Ley Aplicable:</strong> Estos términos se rigen por las leyes del país en el que operamos. Cualquier disputa se resolverá en los tribunales correspondientes.
          </p>
          <p style={{ lineHeight: "1.5", fontSize: "1rem", color: "#ccc" }}>
            <strong>7. Contacto:</strong> Si tienes preguntas sobre estos términos, contáctanos a través de nuestro formulario de contacto.
          </p>
          <p style={{ lineHeight: "1.5", fontSize: "1rem", color: "#ccc" }}>
            Gracias por utilizar QuitoTECH. Tu confianza y seguridad son nuestra prioridad.
          </p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseModal}
            style={{
              backgroundColor: "#9b4ddb",
              color: "#fff",
              borderRadius: "25px",
              textTransform: "none",
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de Descargar APK */}
      <Dialog
        open={openDownloadDialog}
        onClose={handleCloseDownloadDialog}
        PaperProps={{
          style: {
            backgroundColor: "#1a1a1a",
            color: "#e0e0e0",
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle
          style={{
            fontSize: "1.5rem",
            color: "#9b4ddb",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          Descargar APK
        </DialogTitle>
        <DialogContent>
          <p style={{ lineHeight: "1.5", fontSize: "1rem", color: "#ccc" }}>
            Accede a productos gamer en Quito, realiza compras, encuentra tiendas cercanas y aprovecha ofertas exclusivas, todo desde tu dispositivo móvil.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <img
              src={logoGamer}
              alt="logo-gamer"
              width={"25%"}
              height={"25%"}  // Asegúrate de que el ancho y la altura sean iguales
              style={{ borderRadius: '50%' }}  // Esto hace que la imagen sea redonda
            />
          </div>
          <p>Versión: 1.0.0</p>
          <p>Tamaño: 25 MB</p>
          <p>Última actualización: Octubre 2024</p>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDownloadDialog}
            style={{
              backgroundColor: "#9b4ddb",
              color: "#fff",
              borderRadius: "25px",
              textTransform: "none",
            }}
          >
            Cerrar
          </Button>
          <Button
            href="https://github.com/Eduardo-Caza/Backend-QT/blob/master/src/QuitoTech.apk" // Reemplaza con la URL del APK
            target="_blank"
            style={{
              backgroundColor: "#9b4ddb",
              color: "#fff",
              borderRadius: "25px",
              textTransform: "none",
            }}
          >
            Descargar APK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Sobre Nosotros */}
      <section className="about-section">
        <h3 className="subtitle">Sobre Nosotros</h3>
        <p className="text">
          En QuitoTECH, somos apasionados por el mundo gamer y queremos conectar a las mejores tiendas con los gamers de Quito. Nuestra plataforma facilita que encuentres productos de calidad y descubras nuevas tiendas en la ciudad.
        </p>
        <p className="text">
          Si tienes una tienda gamer, regístrate y permite que nuestra comunidad te conozca. En QuitoTECH estamos comprometidos con el crecimiento de la comunidad gamer en Ecuador.
        </p>
      </section>

      {/* Footer */}
      <footer>
  <section className="about-section">
    <h3 className="subtitle">Nuestro Equipo</h3>
    <div className="team-cards" style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
      <div className="card" style={{ width: "250px", padding: "20px", margin: "10px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <h4 style={{ textAlign: "center", color: "black"}}><strong>Luis Guaygua</strong></h4>
        <a href="https://github.com/Kr-luis" className="button" style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
          <GitHubIcon />
        </a>
      </div>

      <div className="card" style={{ width: "250px", padding: "20px", margin: "10px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <h4 style={{ textAlign: "center", color: "black"}}><strong>Eduardo Caza</strong></h4>
        <a href="https://github.com/Eduardo-Caza" className="button" style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
          <GitHubIcon />
        </a>
      </div>

      <div className="card" style={{ width: "250px", padding: "20px", margin: "10px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <h4 style={{ textAlign: "center", color: "black"}}><strong>Yuverly Verdezoto</strong></h4>
        <a href="https://github.com/YuverlyHidokun" className="button" style={{ display: "block", textAlign: "center", marginTop: "10px" }}>
          <GitHubIcon />
        </a>
      </div>
    </div>
    <p>© 2024 QuitoTECH. Todos los derechos reservados.</p>
  </section>
</footer>



    </div>
  );
};

export default Page;
