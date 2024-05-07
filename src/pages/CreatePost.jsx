import  { useState } from 'react';
import axios from 'axios';
import '@styles/CreatePost.css'; 

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [result, setResult] = useState('');
    const [winnerImageUrl, setWinnerImageUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (!title || !content || !result || !winnerImageUrl) {
            setError("Obligatorio llenar todos los campos");
            return;
        }

        const token = localStorage.getItem('token');

        const data = {
            title: title,
            content: content,
            result: result,
            winnerImageUrl: winnerImageUrl
        };

        try {
            const res = await axios.post("http://localhost:225000/posts", data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(res);
            setTitle("");
            setContent("");
            setResult("");
            setWinnerImageUrl("");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="create-container">
            <h1>Blog UFC</h1>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Título</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Contenido</label>
                    <textarea id="content" rows="3" value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="result">Resultado</label>
                    <input type="text" id="result" value={result} onChange={(e) => setResult(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="winnerImageUrl">URL de la imagen del ganador</label>
                    <input type="text" id="winnerImageUrl" value={winnerImageUrl} onChange={(e) => setWinnerImageUrl(e.target.value)} />
                </div>
                {error && <div className="error">{error}</div>}
                <button className="button" type="submit">Crear Post</button>
            </form>
        </div>
    );
}

export default CreatePost;
