import axios from 'axios';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// custom import 
import '../../App.css'
import { setRegister } from '../../redux/reducers/apiSlice';
import registerBGimg from '../../img/registerBGimg.avif';
import { initialState } from '../../redux/reducers/apiSlice';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState(initialState.email);
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const NAME = (e) => {
        setName(e.target.value);
    };
    const EMAIL = (e) => {
        setEmail(e.target.value);
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
                url: "http://localhost:3000/register",
                data: obj,
            });
            dispatch(setRegister({ name: name, email: email, token: response.data.token }));
            navigate('/dashboard');
            alert("Registered");
            console.log("Response",response);
        } catch (error) {
            navigate('/register');
            alert('Not registered');
            console.log("error", error, obj);

        }
    };

    return (
        <div style={{ height:"100vh", "background-color":"black" }}>
            <div className="card mx-auto pt-5 pb-1 " style={{ "width": "60%", "background-color": "black" }}>
                <img src={registerBGimg} className="card-img newLogin" alt="LoginBackgroungImage" />
                <div className="card-img-overlay mt-5">
                    <h5 className="card-title text-center mb-3" style={{ "fontSize": "25px", "color": "white" }}>REGISTER YOUR-SELF</h5>
                    <p className="card-text text-center" style={{ "fontSize": "15px", "color": "yellow" }}>If you already have account, then go to the<Link to="/login" style={{ color: 'yellow' }} ><p> login page</p></Link></p>
                    <div className="card text-bg-dark mx-auto mt-5" style={{ "width": "100%" }}>
                        <div className="card-img-overlay row mt-3">
                            <form onSubmit={submitForm}>
                                <div className="col-md-12">
                                    <label htmlFor="validationDefaultUsername" className="form-label">Name</label>
                                    <div className="input-group">
                                        <input type="name" value={name} className="form-control" onChange={NAME} id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required />
                                    </div>
                                    <label htmlFor="validationDefaultUsername" className="form-label mt-3">Email Address</label>
                                    <div className="input-group">
                                        <span className="input-group-text" id="inputGroupPrepend2">@</span>
                                        <input type="email" value={email} className="form-control" onChange={EMAIL} id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required />
                                    </div>
                                    <label htmlFor="validationDefaultUsername" className="form-label mt-3">Password</label>
                                    <div className="input-group">
                                        <input type="password" value={password} className="form-control" onChange={PASSWORD} id="validationDefaultUsername" aria-describedby="inputGroupPrepend2" required />
                                    </div>
                                    <div className="d-grid gap-2 col-6 mx-auto mt-3">
                                        <button className="btn btn-primary" type="register" >
                                            Register
                                        </button>
                                    </div>
                                    {/* <h3>userName:{userName}</h3> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register
