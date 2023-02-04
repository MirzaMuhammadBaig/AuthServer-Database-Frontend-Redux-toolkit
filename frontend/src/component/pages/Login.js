import '../../App.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import loginBGimg from '../../img/loginBGimg.avif'
import { useDispatch } from 'react-redux';
import { initialState, setLogin } from '../../redux/reducers/apiSlice';

function Login() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState(initialState.email);
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const EMAIL = (e) => {
        setEmail(e.target.value);
    };
    const NAME = (e) => {
        setName(e.target.value);
    };
    const PASSWORD = (e) => {
        setPassword(e.target.value);
    };

    const submitForm = async (data) => {
        data.preventDefault();
        const obj = {
            name: name,
            email: email,
            password: password,
        };

        try {
            const response = await axios({
                method: "POST",
                url: "http://localhost:3000/login",
                data: obj,
            });
            dispatch(setLogin({ name: name, email: email, token: response.data.token }));
            navigate('/dashboard');
            alert('Login Successfully');
        } catch (error) {
            navigate('/login');
            alert('Not login');
            console.log("error", error);
        }
    };

    return (
        <>
            <div style={{ "background-color": "black", height:"100vh"}}>
                <div className="card mx-auto pt-5" style={{ "width": "60%", "background": "black" }}>
                    <img src={loginBGimg} className="card-img newLogin" alt="LoginBackgroungImage" />
                    <div className="card-img-overlay mt-5">
                        <h5 className="card-title text-center mb-3" style={{ "fontSize": "25px", "color": "white" }}>LOGIN YOUR-SELF</h5>
                        <p className="card-text text-center" style={{ "fontSize": "15px", "color": "yellow" }}>If you don't have account, then go to the<Link to="/register" style={{ color: 'yellow' }} ><p > register page</p></Link></p>
                        <div className="card text-bg-dark mx-auto mt-5" style={{ "width": "100%" }}>
                            <div className="card-img-overlay row mt-3">
                                <form onSubmit={submitForm}>
                                    <div className="col-md-12">
                                        <label htmlFor="validationDefaultUsername" className="form-label">Name</label>
                                        <div className="input-group">
                                            <input type="name" value={name} onChange={NAME} className="form-control" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required />
                                        </div>
                                        <label htmlFor="validationDefaultUsername" className="form-label mt-3">Email Address</label>
                                        <div className="input-group">
                                            <span className="input-group-text" id="inputGroupPrepend2">@</span>
                                            <input type="email" value={email} onChange={EMAIL} className="form-control" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required />
                                        </div>
                                        <label htmlFor="validationDefaultUsername" className="form-label mt-3">Password</label>
                                        <div className="input-group">
                                            <input type="password" value={password} onChange={PASSWORD} className="form-control" id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required />
                                        </div>
                                        <div className="d-grid gap-2 col-6 mx-auto mt-3">
                                            <button className="btn btn-primary" type="login" >
                                                Login
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
