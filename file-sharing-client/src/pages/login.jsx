import React, { useEffect, useRef, useState } from "react";
import { userLoginThunk } from "../Redux/Slice/userAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

export function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {isAuthenticated, isLoading} = useSelector(
    (state) => state.userAuth
  );
  const dispatch = useDispatch();

  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handleSubmit() {
    const payload = {
      email: email,
      password: password,
    };
    dispatch(userLoginThunk(payload))
  }

  return (
    <div>
      <h3>Login Page</h3>
      {isAuthenticated ? "authenticated" : "unauthenticated"}
      <br />
      <input type="email" onChange={handleEmail} />
      <input type="password" onChange={handlePassword} />
      <button onClick={handleSubmit} disabled={isLoading}>Submit</button>
      <NavLink to="/register">Create new account</NavLink>
    </div>
  );
}

export default Login;
