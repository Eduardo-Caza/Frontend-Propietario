import { Link } from 'react-router-dom'

export const NoEncontrada = () => {
  return (
    <>
      <style>
        {`
          .no-encontrada-container {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-image: url('../assets/images/olvidarcontra.jpg');
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
          }

          .card-container {
            background-color: white;
            background-opacity: 0.9;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
            width: 90%;
            max-width: 500px;
            text-align: center;
          }

          .notfound-image {
            object-fit: cover;
            height: 200px;
            width: 200px;
            border-radius: 50%;
            border: 4px solid #4b5563; /* Slate border */
            margin: 0 auto;
          }

          .message-container {
            margin-top: 2rem;
          }

          .title {
            font-size: 2.5rem;
            color: #2d3748; /* Dark gray */
            font-weight: 600;
          }

          .description {
            font-size: 1.2rem;
            color: #4a5568; /* Light gray */
            margin-top: 1rem;
          }

          .ingresar-button {
            display: inline-block;
            margin-top: 1.5rem;
            background-color: #6b46c1; /* Purple */
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            text-decoration: none;
            transition: background-color 0.3s ease;
          }

          .ingresar-button:hover {
            background-color: #553c9a; /* Darker purple */
          }
        `}
      </style>
      <div className="no-encontrada-container">
        <div className="card-container">
          <div className="message-container">
            <p className="title">¿Te Perdiste?</p>
            <p className="description">Lo sentimos, la página que intentas buscar no se encuentra disponible o no existe.</p>
            <Link to="paginainicial" className="ingresar-button">Ingresar</Link>
          </div>
        </div>
      </div>
    </>
  )
}
