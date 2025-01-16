import React from 'react';

const Terminos = () => {
    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-gray-900 bg-cover bg-center">
            <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-2xl">
                <h1 className="text-4xl font-bold text-purple-500 mb-6 text-center">Términos y Condiciones</h1>
                <p className="text-gray-300 mb-4">
                    Bienvenido a QuitoTECH. Estos son los términos y condiciones que rigen el uso de nuestros servicios. Al utilizar nuestra plataforma, aceptas cumplir con los siguientes términos.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-6 mb-4">1. Aceptación de los Términos</h2>
                <p className="text-gray-300 mb-4">
                    Al acceder y utilizar los servicios de QuitoTECH, aceptas estos términos y condiciones en su totalidad.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-6 mb-4">2. Modificaciones</h2>
                <p className="text-gray-300 mb-4">
                    Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones se publicarán en esta página, y se considera que has aceptado los nuevos términos si continúas utilizando nuestros servicios.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-6 mb-4">3. Uso de los Servicios</h2>
                <p className="text-gray-300 mb-4">
                    Te comprometes a utilizar los servicios de manera responsable y a no realizar actividades que puedan dañar o afectar el funcionamiento de la plataforma.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-6 mb-4">4. Propiedad Intelectual</h2>
                <p className="text-gray-300 mb-4">
                    Todos los derechos de propiedad intelectual relacionados con los servicios de QuitoTECH son propiedad de la empresa. Queda prohibido el uso no autorizado de nuestros contenidos.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-6 mb-4">5. Limitación de Responsabilidad</h2>
                <p className="text-gray-300 mb-4">
                    QuitoTECH no será responsable de ningún daño indirecto, incidental o consecuente que surja del uso de nuestros servicios.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-6 mb-4">6. Ley Aplicable</h2>
                <p className="text-gray-300 mb-4">
                    Estos términos se rigen por las leyes del país en el que operamos. Cualquier disputa se resolverá en los tribunales correspondientes.
                </p>

                <h2 className="text-2xl font-semibold text-white mt-6 mb-4">7. Contacto</h2>
                <p className="text-gray-300 mb-4">
                    Si tienes preguntas sobre estos términos, contáctanos a través de nuestro formulario de contacto.
                </p>

                <div className="mt-8">
                    <p className="text-gray-400 text-center">
                        Gracias por utilizar QuitoTECH. Tu confianza y seguridad son nuestra prioridad.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Terminos;
