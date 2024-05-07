export const fetchData = async () => {
    const response = await fetch('http://localhost:225000/posts');
    if (!response.ok) {
        throw new Error('No hay una buena conexión');
    }
    return response.json();
};
