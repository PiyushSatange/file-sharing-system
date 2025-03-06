import React, { useEffect, useRef, useState } from "react";
import { userLoginThunk } from "../Redux/Slice/userAuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";

export function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const { isAuthenticated, isLoading } = useSelector((state) => state.userAuth);
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
    dispatch(userLoginThunk(payload));
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br bg-gray-900">
      <div className="bg-gray-800 w-[90%] max-w-md p-8 rounded-lg shadow-xl flex flex-col gap-6 text-white">
        <h3 className="text-2xl font-semibold text-center text-lime-300">
          Welcome Back
        </h3>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Email</label>
          <input
            type="email"
            className="border rounded-lg bg-blue-50 text-black p-2 focus:outline-none focus:ring-2 focus:ring-lime-600"
            onChange={handleEmail}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Password</label>
          <input
            type="password"
            className="border rounded-lg bg-blue-50 text-black p-2 focus:outline-none focus:ring-2 focus:ring-lime-600"
            onChange={handlePassword}
          />
        </div>

        <button
          className="w-full bg-lime-600 text-white font-medium py-2 rounded-md hover:bg-lime-700 hover:cursor-pointer transition duration-300 disabled:opacity-50"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className="text-center">
          <p>Don't have an account?</p>
          <NavLink
            to="/register"
            className="text-lime-400 font-medium hover:underline"
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Login;
