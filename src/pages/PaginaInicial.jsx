import logoDarkMode from '../assets/dark.png';
import logoFacebook from '../assets/facebook.png';
import logoGithub from '../assets/github.png';
import logoLinkedin from '../assets/linkedin.png';
import logoGamer from '../assets/gamer.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const PaginaInicial = () => {
    const [darkMode, setDarkMode] = useState(true);

    return (
        <div className={darkMode ? "dark" : ""}>
            <main className="bg-gray-900 text-white px-10 md:px-20 lg:px-40">
                
                {/* Navbar */}
                <nav className="p-6 flex justify-between items-center shadow-lg bg-purple-800 rounded-lg">
                    <h1 className="text-3xl font-bold">QuitoTECH</h1>
                    <ul className="flex items-center space-x-6">
                        <li>
                            <Link to="/ingresar" className="py-2 px-4 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition duration-300">
                                Ingresar
                            </Link>
                        </li>
                        <li>
                            <Link to="/registrar" className="py-2 px-4 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition duration-300">
                                Registrarse
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Hero Section */}
                <section className="text-center py-20">
                    <h2 className="text-5xl font-extrabold text-purple-500 mb-4">
                        Encuentra lo mejor del mundo gamer en Quito
                    </h2>
                    <p className="text-xl max-w-2xl mx-auto mb-6 text-gray-300">
                        Encuentra productos exclusivos y de calidad en nuestras tiendas registradas o da a conocer tu propia tienda para que los gamers de Quito te descubran.
                    </p>
                    <div className="relative mx-auto w-72 h-72 bg-gradient-to-b from-purple-700 to-purple-900 rounded-full overflow-hidden shadow-2xl">
                        <img src={logoGamer} alt="logo-gamer" className="w-full h-full object-cover" />
                    </div>
                </section>

                {/* Descargar APK */}
                <section className="text-center py-16 bg-purple-700 bg-opacity-50 rounded-lg shadow-lg my-12">
                    <h3 className="text-4xl font-semibold mb-4">Descarga nuestra aplicación móvil</h3>
                    <p className="text-lg text-gray-200 mb-6">
                        Accede a las mejores tiendas gamer desde tu dispositivo móvil. ¡Disponible ahora!
                    </p>
                    <Link to="/apk-download" className="inline-block py-3 px-8 bg-purple-500 rounded-full text-white font-semibold hover:bg-purple-600 transition duration-300 shadow-lg">
                        Descargar APK
                    </Link>
                </section>

                {/* Términos y Condiciones */}
                <section className="text-center py-12">
                    <h3 className="text-4xl font-semibold mb-4">Términos y Condiciones</h3>
                    <p className="text-lg text-gray-300 max-w-xl mx-auto mb-4">
                        Por favor, lee nuestros términos y condiciones haciendo clic 
                        <Link to="/terminos" className="text-purple-400 hover:text-purple-500 underline ml-1">
                            aquí
                        </Link>.
                    </p>
                </section>

                {/* Sobre Nosotros */}
                <section className="text-center py-12 bg-gray-800 rounded-lg shadow-lg">
                    <h3 className="text-4xl font-semibold text-purple-400 mb-6">Sobre Nosotros</h3>
                    <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-6 leading-relaxed">
                        En QuitoTECH, somos apasionados por el mundo gamer y queremos conectar a las mejores tiendas con los gamers de Quito. Nuestra plataforma facilita que encuentres productos de calidad y descubras nuevas tiendas en la ciudad.
                    </p>
                    <p className="text-lg text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        Si tienes una tienda gamer, regístrate y permite que nuestra comunidad te conozca. En QuitoTECH estamos comprometidos con el crecimiento de la comunidad gamer en Ecuador.
                    </p>
                </section>
                <footer className="py-6 mt-12 text-center bg-purple-900">
                <div className="flex justify-center space-x-4 mb-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src={logoFacebook} alt="Facebook" className="w-6 h-6 hover:scale-110 transform transition duration-300" />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <img src={logoGithub} alt="Github" className="w-6 h-6 hover:scale-110 transform transition duration-300" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src={logoLinkedin} alt="LinkedIn" className="w-6 h-6 hover:scale-110 transform transition duration-300" />
                    </a>
                </div>
                <p className="text-gray-300 text-sm">
                    © 2024 QuitoTECH. Todos los derechos reservados.
                </p>
            </footer>
            </main>

            
        </div>
    );
};
