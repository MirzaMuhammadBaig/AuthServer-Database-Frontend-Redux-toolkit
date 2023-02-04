import '../../App.css';
import React, { useEffect } from 'react';
import mainCardEmoji from "../../img/mainCardEmoji.png";
import main_couresal_first from "../../img/card_main_img.avif";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { initialState } from '../../redux/reducers/apiSlice';

function Main() {
    const name = useSelector((state) => state.auth. name);
    const email = useSelector((state) => state.auth.email);
    const navigate = useNavigate();

    useEffect(() => {
        if (name === initialState.name && email === initialState.email) {
                navigate('/');
            };
    }, []);

    return (
        <div style={{ "background": "black", height: "100vh" }}>

            <div
                className="card mx-auto"
                style={{ width: "50%", "background": "black" }}
            >
                <img
                    src={main_couresal_first}
                    className="card-img newCard mt-5"
                    alt="First Couresal"
                />
                <div className="card-img-overlay text-center mt-5">
                    <h5
                        className="card-title"
                        style={{ fontSize: "30px", fontWeight: "bolder", color: "white" }}
                    >
                        WELCOME <span style={{ fontSize: "30px", fontWeight: "bold", color: "white" }}>"{name}"</span>
                    </h5>
                    <p className="card-text" style={{ fontSize: "22px", fontWeight: "bold", color: "white" }}>
                        WE ARE GLAD, YOU ARE HERE
                    </p>
                    <p className="card-text" style={{ fontSize: "22px", fontWeight: "bold", color: "white" }}>
                        Your email address is: '{email}'
                    </p>
                    {/* /////////// */}
                    <div className="card text-bg-dark mx-auto mt-5" style={{ "width": "20%" }}>
                        <img
                            src={mainCardEmoji}
                            className="card-img newCard"
                            alt="FirstCouresalImage"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main
