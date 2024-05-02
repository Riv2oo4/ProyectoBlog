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
                <Layout />
            </Router>
        </div>
    );
}

function Layout() {
    const token = localStorage.getItem('token');
    return (
        <>
            <nav>
                <Link to="/"></Link>
                <Link to="/CreatePost"></Link>
                <Link to="/EliminatePost"></Link>
                <Link to="/Login"></Link>
                <Link to="/Register"></Link>
                <Link to="/ReadPost"></Link>
                <Link to="/UpdatePost"></Link>
            </nav>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/CreatePost' element={ token !== null ? <CreatePost /> : <Login/>} /> 
                <Route path='/EliminatePost' element={ token !== null ? <EliminatePost /> : <Login/>} /> 
                <Route path='/Login' element={<Login />} />
                <Route path='/Register' element={<Register />} />
                <Route path='/ReadPost' element={ token !== null ? <ReadPost /> : <Login/>} /> 
                <Route path='/UpdatePost' element={ token !== null ? <UpdatePost /> : <Login/>} /> 
            </Routes>
        </>
    );
}

export default Navegar;
