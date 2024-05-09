import { useState, useEffect } from 'react';
import axios from 'axios';
import '@styles/ReadPost.css';

function ReadPost() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get("http://22500.arpanetos.lol/posts", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPosts(response.data);
            } catch (error) {
                setError("Error al obtener los posts");
                console.log(error);
            }
        };

        fetchPosts();
    }, []);

    const openModal = (content) => {
        setModalContent(content);
        setModalOpen(true);
    };

    return (
        <div className="read-container">
            <h1>Blog UFC</h1>
            <hr />
            <div className="posts-container">
                {posts.map(post => (
                    <div key={post.id} className="post">
                        <div className="post-image">
                            <img src={post.winner_image_url} alt={post.title} />
                        </div>
                        <div className="post-details">
                            <h2>{post.title}</h2>
                            <p className="post-content">
                                {post.content.length > 24 ? post.content.slice(0, 24) + '...' : post.content}
                                {post.content.length > 24 && (
                                    <button onClick={() => openModal(post.content)}>Ver más</button>
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {error && <div className="error">{error}</div>}
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setModalOpen(false)}>&times;</span>
                        <p>{modalContent}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ReadPost;
