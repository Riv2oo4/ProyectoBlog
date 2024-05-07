import  { useState, useEffect } from 'react';
import axios from 'axios';
import '@styles/UpdatePost.css'; 

function UpdatePost() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [editingPostId, setEditingPostId] = useState(null);
    const [editedPost, setEditedPost] = useState({
        title: '',
        content: '',
        result: '',
        winnerImageUrl: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleEditPost = async (postId) => {
        try {
            const response = await axios.get(`http://localhost:3000/posts/${postId}`);
            setEditingPostId(postId);
            setEditedPost(response.data);
            setIsModalOpen(true); 
        } catch (error) {
            setError("Error al editar el post");
            console.log(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedPost({ ...editedPost, [name]: value });
    };

    const handleUpdatePost = async () => {
        try {
            await axios.put(`http://localhost:3000/posts/${editingPostId}`, editedPost);

            const updatedPosts = posts.map(post => {
                if (post.id === editingPostId) {
                    return { ...post, ...editedPost };
                }
                return post;
            });
            setPosts(updatedPosts);
            setEditingPostId(null);
            setEditedPost({
                title: '',
                content: '',
                result: '',
                winnerImageUrl: ''
            });
            setIsModalOpen(false);
        } catch (error) {
            setError("Error al actualizar el post");
            console.log(error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="update-container">
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
                            <p>{post.content}</p>
                            <button className="edit-button" onClick={() => handleEditPost(post.id)}>Editar</button>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
    <div className="modal">
        <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Editar Post</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="editedTitle">Título</label>
                    <input type="text" id="editedTitle" name="title" value={editedPost.title} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="editedContent">Contenido</label>
                    <textarea id="editedContent" name="content" rows="3" value={editedPost.content} onChange={handleInputChange}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="editedResult">Resultado</label>
                    <input type="text" id="editedResult" name="result" value={editedPost.result} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="editedWinnerImageUrl">URL de la imagen del ganador</label>
                    <input type="text" id="editedWinnerImageUrl" name="winnerImageUrl" value={editedPost.winnerImageUrl} onChange={handleInputChange} />
                </div>
                <button className="update-button" onClick={handleUpdatePost}>Actualizar</button>
            </form>
        </div>
    </div>
)}

            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default UpdatePost;
