export const fetchData = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://22500.arpanetos.lol/posts',{
        headers:{
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) {
        throw new Error('No hay una buena conexión o aún no has iniciado sesión');
    }
    return response.json();
};
