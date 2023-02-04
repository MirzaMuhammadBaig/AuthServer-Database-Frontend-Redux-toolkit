import '../App.css';
import Main from './pages/Main';
import Auth from './pages/Auth';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
// import {useSelector } from 'react-redux';


function Navbar() {
    return (
        <div>
            {/* <h3>username:{userName} </h3> */}
            <BrowserRouter>
                <nav className="navbar navbar-expand-lg navbar-dark color">
                    <div className="container-fluid">
                        <Link className="navbar-brand me-5" to="/">Authentication</Link>
                        <div className="collapse navbar-collapse" id="navbarText">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link nav-item text-white ms-3 " to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link nav-item text-white ms-3 " to="/register">Register</Link>
                                </li>
                            </ul>
                            <span className="navbar-text">
                                Frontend Of Authentication Server With Express And Typescript
                            </span>
                        </div>
                    </div>
                </nav>
                <Routes>
                    <Route classNameName="nav-item" path='/' element={<Auth />} />
                    <Route classNameName="nav-item" path='/dashboard' element={<Main />} />
                    <Route classNameName="nav-item" path='/login' element={<Login />} />
                    <Route classNameName="nav-item" path='/register' element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default Navbar;
