import { useState } from 'react';
import '@styles/Login.css'; 
import useToken from '@hooks/useToken';
import useNavigate from "@hooks/useNavigate";
import { parseToken } from '@components/tokenUtils';

function Login() {
  const [username, setUsername] = useState('');
  const [contrasenia, setContrasenia] = useState('');
  const [error, setError] = useState('');
  const { setToken } = useToken();
  const { navigate } = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:225000/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, contrasenia }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const responseData = await response.json();
      const token = responseData.token;

      const tokenInfo = parseToken(token);

      if (tokenInfo.exp * 1000 < Date.now()) {
        console.log("Token expirado")
        navigate('/login');
        return;
      }

     
      localStorage.setItem('token', token);
      setToken(token);
      navigate('/');
      console.log('Inicio de sesión exitoso');

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container"> 
      <h2>Iniciar Sesión</h2>
      {error && <div className="error">{error}</div>} 
      <div className="form-group"> 
        <label>Nombre de Usuario:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="form-group"> 
        <label>Contraseña:</label>
        <input type="password" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
      </div>
      <button className="form-group button" onClick={handleLogin}>Iniciar Sesión</button> 
    </div>
  );
}

export default Login;
