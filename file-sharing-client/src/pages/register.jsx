import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
// import { fetchApi } from "../Redux/Slice/userLoginSlice";
import { userRegisterThunk } from "../Redux/Slice/userAuthSlice";

export function Register() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const { isAuthenticated, isLoading } = useSelector((state) => state.userAuth);
  const dispatch = useDispatch();

  function handleFirstName(e) {
    setFirstName(e.target.value);
  }
  function handleLastName(e) {
    setLastName(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handleSubmit() {
    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    dispatch(userRegisterThunk(payload));
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-white">
          <h3 className="text-2xl font-bold text-lime-600 text-center mb-6">
            Register Page
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                onChange={handleFirstName}
                className="w-full px-3 py-2 border rounded-lg bg-blue-50 text-black focus:outline-none focus:ring-2 focus:ring-lime-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                onChange={handleLastName}
                className="w-full px-3 py-2 border rounded-lg bg-blue-50 text-black focus:outline-none focus:ring-2 focus:ring-lime-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                onChange={handleEmail}
                className="w-full px-3 py-2 border rounded-lg bg-blue-50 text-black focus:outline-none focus:ring-2 focus:ring-lime-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                onChange={handlePassword}
                className="w-full px-3 py-2 border rounded-lg bg-blue-50 text-black focus:outline-none focus:ring-2 focus:ring-lime-600"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-2 bg-lime-600 text-white font-semibold rounded-lg hover:bg-lime-700 transition disabled:opacity-50"
            >
              Submit
            </button>
            <div className="text-center">
              <p>Already have an account?</p>
              <NavLink
                to="/login"
                className="text-lime-400 font-medium hover:underline"
              >
                Sign In
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
