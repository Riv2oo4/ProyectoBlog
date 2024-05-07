import React from 'react';
import useToken from '@hooks/useToken';
import useNavigate from '@hooks/useNavigate';
import '@styles/index.css'; 
import Nav from '@components/Nav';
import Home from '@pages/Home';
import CreatePost from '@pages/CreatePost';
import EliminatePost from "@pages/EliminatePost";
import Login from "@pages/Login";
import Register from "@pages/Register";
import ReadPost from "@pages/ReadPost";
import UpdatePost from "@pages/UpdatePost";
import Logout from "@pages/Logout";

const routes = {
    '/': { component: Home, requiresAuth: false },
    '/register': { component: Register, requiresAuth: false },
    '/CreatePost': { component: CreatePost, requiresAuth: true },
    '/ReadPost': { component: ReadPost, requiresAuth: false },
    '/UpdatePost': { component: UpdatePost, requiresAuth: true },
    '/EliminatePost': { component: EliminatePost, requiresAuth: true },
    '/login': { component: Login, requiresAuth: false },
    '/logout': { component: Logout, requiresAuth: false },
}

const Router = () => {
    const { token } = useToken();
    const { page } = useNavigate();

    let CurrentPage = () => <h1>404 Página no encontrada</h1>;

    if (routes[page]) {
        if (routes[page].requiresAuth && !token) {
            CurrentPage = Login;
        } else {
            CurrentPage = routes[page].component;
        }
    }

    if (page === "/logout") {
        window.location.replace("/");
    }

    return (
        <div>
            <Nav />
            <div className="main-container">
                <div className="content-container">
                    <div className="current-page-container">
                        <CurrentPage />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Router;
