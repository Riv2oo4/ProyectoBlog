import { useState, useEffect } from 'react';
import { fetchData } from '../api.js'; 
import '@styles/Home.css'; 

const Home = () => {
    const [fights, setFights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

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

    const openModal = (content) => {
        setModalContent(content);
        setModalOpen(true);
    };

    return (
        <div>
            <div className="home-container">
                <div className="home-header">
                    <h1 className="home-title">Peleas de UFC</h1>
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
                                    <p className="card-text">
                                        {fight.content.length > 10 ? fight.content.slice(0, 10) + '...' : fight.content}
                                        {fight.content.length > 10 && (
                                            <button onClick={() => openModal(fight.content)}>Ver más</button>
                                        )}
                                    </p>
                                    <p className="card-created">Creado en: {fight.created_at}</p>
                                    <p className="card-result">{fight.result}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {modalOpen && (
                <div className="modal-home">
                    <div className="modal-content-home">
                        <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
                        <p>{modalContent}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
