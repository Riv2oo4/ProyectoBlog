import useToken from "@hooks/useToken";
import useNavigate from "@hooks/useNavigate";
import "../styles/nav.css"

const Nav = () => {
    const { isLoggedIn,getRawToken } = useToken();
    const { page, navigate } = useNavigate();

    let decodedToken = {};
    if (isLoggedIn) {
        decodedToken = getRawToken();
        console.log(decodedToken);
    }

    return (
        <nav className="navbar">
            <div className="nav-container">
                <ul className="nav">
                    <li className="nav-item">
                        <a className={page === "/" ? "nav-link active" : "nav-link"} href="#/" onClick={() => navigate('/')}>Inicio</a>
                    </li>
                    {isLoggedIn && (
                        <>
                            <li className="nav-item">
                                <a className={page === "/CreatePost" ? "nav-link active" : "nav-link"} href="#/CreatePost" onClick={() => navigate('/CreatePost')}>Crear Post</a>
                            </li>
                            <li className="nav-item">
                                <a className={page === "/ReadPost" ? "nav-link active" : "nav-link"} href="#/ReadPost" onClick={() => navigate('/ReadPost')}>Leer Post</a>
                            </li>
                            <li className="nav-item">
                                <a className={page === "/EliminatePost" ? "nav-link active" : "nav-link"} href="#/EliminatePost" onClick={() => navigate('/EliminatePost')}>Eliminar Post</a>
                            </li>
                            <li className="nav-item">
                                <a className={page === "/UpdatePost" ? "nav-link active" : "nav-link"} href="#/UpdatePost" onClick={() => navigate('/UpdatePost')}>Editar Post</a>
                            </li>
                        </>
                    )}
                    {!isLoggedIn && (
                        <li className="nav-item">
                            <a className={page === "/login" ? "nav-link active" : "nav-link"} href="" onClick={() => navigate('/login')}>Iniciar Sesión</a>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li className="nav-item">
                            <a className="nav-link" href="#/" onClick={() => navigate('/logout')}>Cerrar Sesión</a>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li className="nav-item">
                            <span className="nav-link">{decodedToken.name}</span>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
