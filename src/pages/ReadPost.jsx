import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ReadPost.css'; // Importa los estilos CSS

function ReadPost() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        // Lógica para obtener todos los posts del servidor
        const fetchPosts = async () => {
            try {
                const response = await axios.get("http://localhost:3000/posts");
                setPosts(response.data);
            } catch (error) {
                setError("Error al obtener los posts");
                console.log(error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="container">
            <div className="logout-button-container">
                <button className="logout-button">Cerrar Sesión</button>
            </div>
            <h1>Blog UFC</h1>
            <div className="button-container">
                <button className="button">Crear Post</button>
                <button className="button">Ver Posts</button>
                <button className="button">Eliminar Post</button>
                <button className="button">Editar Post</button>
            </div>
            <hr />
            <div className="posts-container">
                {posts.map(post => (
                    <div key={post.id} className="post">
                        <div className="post-image">
                            <img src={post.winner_image_url} alt={post.title} />
                        </div>
                        <div className="post-details">
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                        </div>
                    </div>
                ))}
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default ReadPost;
