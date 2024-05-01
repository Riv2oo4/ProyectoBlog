import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Home from '/src/pages/Home.jsx';
import CreatePost from '/src/pages/CreatePost';
import EliminatePost from "/src/pages/EliminatePost.jsx";
import Login from "/src/pages/Login.jsx";
import Register from "/src/pages/Register.jsx";
import ReadPost from "/src/pages/ReadPost.jsx";
import UpdatePost from "/src/pages/UpdatePost.jsx";

function Navegar() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route path='home' element={<Home/>}/>
                        <Route path='CreatePost' element={<CreatePost/>}/>
                        <Route path='EliminatePost' element={<EliminatePost/>}/>
                        <Route path='Login' element={<Login/>}/>
                        <Route path='Register' element={<Register/>}/>
                        <Route path='ReadPost' element={<ReadPost/>}/>
                        <Route path='UpdatePost' element={<UpdatePost/>}/>
                    </Route>
                </Routes>
            </Router>
        </div>
    );
}

function Layout() {
    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/CreatePost">CreatePost</Link>
                <Link to="/EliminatePost">EliminatePost</Link>
                <Link to="/Login">Login</Link>
                <Link to="/Register">Register</Link>
                <Link to="/ReadPost">ReadPost</Link>
                <Link to="/UpdatePost">UpdatePost</Link>
            </nav>
        </>
    );
}

export default Navegar;
