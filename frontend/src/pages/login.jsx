import React, { useState } from "react";
import api from "../api/config";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const loginSubmit = async (e) => {
    e.preventDefault();
    const response = await api.post("book/auth/", { email, password });
    console.log(response);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      navigate("/");
    }
  };
  const fetchUsers = async () => {
    const response = await api.get("book/userlist", {
      headers: { token: localStorage.getItem("token") },
    });
    console.log(response);
  };

  return (
    <div
      className="login"
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
            onSubmit={loginSubmit}
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
      <input type="button" value="Fetch Users" onClick={fetchUsers} />
      <input
        type="button"
        value="Logout"
        onClick={() => localStorage.removeItem("token")}
      />
    </div>
  );
};

export default Login;
