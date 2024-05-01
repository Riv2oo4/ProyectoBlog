import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ReadPost.css'; 
import { Link } from 'react-router-dom';

function ReadPost() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
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
                <Link to="/CreatePost" className="button">Crear Post</Link>
                <Link to="/ReadPost" className="button">Ver Post</Link>
                <Link to="/EliminatePost" className="button">Eliminar Post</Link>
                <Link to="/UpdatePost" className="button">Editar Post</Link>
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
