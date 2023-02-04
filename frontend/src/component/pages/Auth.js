import "../../App.css"
import React from "react";
import { Link } from "react-router-dom";
import main_couresal_first from "../../img/main_couresal_first.avif";

function Auth() {
  return (
    <div style={{"background":"black", maxheight:"100%", maxWidth:"100vw"}}>
      <div
        class="card mx-auto"
        style={{ width: "60%", background:"black", color:"white" }}
      >
        <img
          src={main_couresal_first}
          class="card-img new mt-5"
          alt="FirstCouresalImage"
        />
        <div class="card-img-overlay text-center mt-5">
          <h5
            class="card-title mt-5"
            style={{ fontSize: "30px", fontWeight: "bolder" }}
          >
            BASIC AUTHENTICATION WEBSITE
          </h5>
          <p class="card-text" style={{ fontSize: "22px", fontWeight: "bold" }}>
            PLEASE GO AND VERIFY YOUR-SELF
          </p>
          {/* /////////// */}
          <div class="card text-bg-dark mx-auto mt-5" style={{ width: "60%"}}>
            <div class="card-img-overlay text-center">
              <h5
                class="card-title mt-5"
                style={{ fontSize: "20px", fontWeight: "bolder" }}
              >
                Login Yourself:
                <div class="d-grid gap-2 col-6 mx-auto ">
                  <Link class="btn btn-primary" type="button" to="/login">
                    Login
                  </Link>
                </div>
              </h5>
              <h5
                class="card-title mt-5"
                style={{ fontSize: "20px", fontWeight: "bolder" }}
              >
                Register Yourself:
                <div class="d-grid gap-2 col-6 mx-auto">
                  <Link class="btn btn-primary" type="button" to="/register">
                    Register
                  </Link>
                </div>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
