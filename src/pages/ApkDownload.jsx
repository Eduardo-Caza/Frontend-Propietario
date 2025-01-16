import React from 'react';
import apkIcon from '../assets/apk-icon.png'; // Reemplaza con tu propio icono o imagen
import { Link } from 'react-router-dom';

const ApkDownload = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6 py-12">
      
      {/* Header */}
      <h1 className="text-5xl font-extrabold text-purple-500 mb-8 text-center">
        ¡Descarga la App de QuitoTECH!
      </h1>
      
      {/* Description */}
      <p className="text-lg text-center text-gray-300 max-w-2xl mb-10">
        Nuestra aplicación móvil te permite acceder a la mejor selección de productos gamer en Quito. 
        Realiza compras, busca tiendas cerca de ti y accede a ofertas exclusivas desde la comodidad de tu dispositivo móvil.
      </p>
      
      {/* APK Icon */}
      <div className="mb-8">
        <img src={apkIcon} alt="APK Icon" className="w-32 h-32 md:w-40 md:h-40 bg-purple-600 p-4 rounded-full shadow-2xl" />
      </div>
      
      {/* Download Button */}
      <Link to="/apk-file-path" download className="py-4 px-12 bg-purple-600 rounded-full text-lg font-semibold hover:bg-purple-700 transition duration-300 shadow-lg">
        Descargar APK
      </Link>
      
      {/* Additional Information */}
      <div className="mt-10 text-center text-gray-400">
        <p>Versión: 1.0.0</p>
        <p>Tamaño: 25 MB</p>
        <p>Última actualización: Octubre 2024</p>
      </div>

      {/* Help Section */}
      <div className="mt-12 bg-gray-800 rounded-lg p-6 shadow-lg max-w-lg text-center">
        <h3 className="text-2xl font-semibold text-purple-400 mb-3">¿Necesitas ayuda?</h3>
        <p className="text-gray-300 mb-3">Si tienes problemas para instalar la aplicación, sigue los pasos de <Link to="/ayuda-instalacion" className="text-purple-500 underline hover:text-purple-400">esta guía</Link>.</p>
        <p className="text-gray-300">Para más preguntas, contáctanos en nuestro <Link to="/contacto" className="text-purple-500 underline hover:text-purple-400">Centro de Ayuda</Link>.</p>
      </div>

    </div>
  );
};

export default ApkDownload;
