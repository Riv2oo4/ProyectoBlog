import  { useState, useEffect } from 'react';
import axios from 'axios';
import '@styles/DeletePost.css'; 

function EliminatePost() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get("http://localhost:3000/posts", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPosts(response.data);            
                setPosts(response.data);
            } catch (error) {
                setError("Error al obtener los posts");
                console.log(error);
            }
        };

        fetchPosts();
    }, []);

    const handleDeletePost = async (postId) => {
        try {
            const token = localStorage.getItem('token');

            await axios.delete(`http://localhost:3000/posts/${postId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const updatedPosts = posts.filter(post => post.id !== postId);
            setPosts(updatedPosts);
        } catch (error) {
            setError("Error al eliminar el post");
            console.log(error);
        }
    };

    return (
        <div className="eliminate-container">
            <div className="header-container">
                <h1>Blog UFC</h1>
            </div>
            <hr />
            <div className="posts-container">
                {posts.map(post => (
                    <div key={post.id} className="post">
                        <div className="post-image">
                            <img src={post.winner_image_url} alt={post.title} />
                        </div>
                        <div className="post-content">
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <button className="delete-button" onClick={() => handleDeletePost(post.id)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default EliminatePost;
