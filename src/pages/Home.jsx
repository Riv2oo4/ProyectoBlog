import React, { useState, useEffect } from 'react';
import { fetchData } from '../api.js'; 
import '../styles/Home.css'; 
import { Link } from 'react-router-dom';

const Home = () => {
    const [fights, setFights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFights = async () => {
            try {
                const data = await fetchData(); 
                setFights(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchFights(); 
    }, []);

    return (
        <div className="home-container">
            <div className="home-header">
                <h1 className="home-title">Peleas de UFC</h1>
                <div className="home-buttons">
                <Link to="/Login" className="button">Iniciar sesión</Link>
                <Link to="/Register" className="button">Registrarse</Link>

                </div>
            </div>
            <hr className="home-divider" />
            {loading ? (
                <div style={{ textAlign: 'center' }}>Cargando...</div>
            ) : error ? (
                <div style={{ textAlign: 'center', color: '#ff0000' }}>{error}</div>
            ) : (
                <div className="card-container">
                    {fights.map(fight => (
                        <div key={fight.id} className="card">
                            <img src={fight.winner_image_url} alt="Imagen del ganador" className="card-img" />
                            <div>
                                <h2 className="card-content">{fight.title}</h2>
                                <p className="card-text">Contenido: {fight.content}</p>
                                <p className="card-created">Creado en: {fight.created_at}</p>
                                <p className="card-result">{fight.result}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
