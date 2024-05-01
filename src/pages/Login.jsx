import React, { useState } from 'react';
import '../styles/Login.css'; // Importa los estilos CSS

function Login() {
  const [username, setUsername] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, contrasenia }),
      });
      setContrasenia("")
      setUsername("")
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      
      const responseData = await response.json(); 
      const token = responseData.token; 
  
      localStorage.setItem('token', token);
      console.log(localStorage.getItem('token'));

      console.log('Inicio de sesión exitoso');
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <div className="container"> {/* Aplica los estilos del contenedor */}
      <h2>Iniciar Sesión</h2>
      {error && <div className="error">{error}</div>} {/* Aplica los estilos de error */}
      <div className="form-group"> {/* Aplica los estilos del grupo de formulario */}
        <label>Nombre de Usuario:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="form-group"> {/* Aplica los estilos del grupo de formulario */}
        <label>Contraseña:</label>
        <input type="password" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
      </div>
      <button className="form-group button" onClick={handleLogin}>Iniciar Sesión</button> {/* Aplica los estilos del botón */}
    </div>
  );
}

export default Login;
