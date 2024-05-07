import { useEffect } from 'react';
import useNavigate from "@hooks/useNavigate";

const Logout = () => {
    const { navigate } = useNavigate();

    useEffect(() => {
        localStorage.clear();

        setTimeout(() => {
            navigate('/');
        }, 1000);
    }, [navigate]); 

    return <h1>Saliendo</h1>;
};

export default Logout;
