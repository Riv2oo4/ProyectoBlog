import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Register.css'; 
import { Link } from 'react-router-dom';

function CreateUser() {
    const [username, setUsername] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (!username || !contrasenia) {
            setError("Obligatorio llenar todos los campos");
            return;
        }

        const data = {
            username: username,
            contrasenia: contrasenia 
        };

        try {
            const res = await axios.post("http://localhost:3000/users", data);
            console.log(res);
            setUsername(""),
            setContrasenia("")

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <h1>Registro</h1>
            {error && <div className="error">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Usuario</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" value={contrasenia} onChange={(e) => setContrasenia(e.target.value)} />
                </div>
                <div className="form-group">
                    <button type="submit">Registrarse</button>
                </div>
            </form>
        </div>
    );
}

export default CreateUser;
