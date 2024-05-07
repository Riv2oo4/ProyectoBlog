import  { useState } from 'react';
import '@styles/Login.css'; // Importa los estilos CSS
import useToken from '@hooks/useToken';
import useNavigate from "@hooks/useNavigate";

function Login() {
  const [username, setUsername] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  const {setToken} = useToken()
  const {navigate}= useNavigate()
  
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, contrasenia }),
      });
  
      // Verifica si la respuesta es exitosa
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
  
      // Si la respuesta es exitosa, obtén el token directamente de la respuesta JSON
      const responseData = await response.json(); 
      const token = responseData.token; 
  
      console.log('token',token)
      localStorage.setItem('token', token);
     
      console.log(localStorage.getItem('token'));
      setToken(token)
      navigate('/')
      console.log('Inicio de sesión exitoso');
      window.location.replace("#/");
  
    } catch (error) {
      setError(error.message);
    }
  };
  
  

  return (

    <div className="login-container"> {/* Aplica los estilos del contenedor */}
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
