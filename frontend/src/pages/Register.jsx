import React from "react";
import { useState } from "react-router-dom";
import api from "../api/config";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const RegisterSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post("book//", { email, password });
  };
  return (
    <div
      className="register"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        padding: "20px",
      }}
    >
      <div className="container p-5">
        <center>
          <form
            id="loginform"
            onSubmit={RegisterSubmit}
            style={{
              alignItems: "center",
              padding: "20px",
            }}
          >
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                id="EmailInput"
                name="EmailInput"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <small id="emailHelp" className="text-danger form-text">
                {/* {emailError} */}
              </small>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <small id="passworderror" className="text-danger form-text">
                {/* {passwordError} */}
              </small>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </center>
      </div>
    </div>
  );
};

export default Register;
