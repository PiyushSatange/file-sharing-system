import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router"
import { fetchApi, makeAuthenticated } from "../Redux/Slice/authenticationSlice";

export function Register(){
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const token = useSelector((state) => state.authentication.isAuthenticated);
    const dispatch = useDispatch();

    function handleEmail(e){
        console.log(e.target.value);
        setEmail(e.target.value);
    }
    function handlePassword(e){
        console.log(e.target.value);
        setPassword(e.target.value)
    }
    function handleSubmit(){
        const payload = {
            email:email,
            password:password
        };
        dispatch(fetchApi(payload));
    }

    function handleTest(){
        fetch("http://localhost:8000/api/auth/test",
            {
                credentials: "include"
            }
        ).then(response => console.log(response));
    }

    return(
        <>
            <div>
                <h3>Register Page</h3>
                {token?"authenticated":"not authenticated"}
                <input type="email" onChange={handleEmail} />
                <input type="password" onChange={handlePassword} />
                <button onClick={handleSubmit}>Submit</button>
                <NavLink to="/login">Already have account?</NavLink>
                <button onClick={handleTest}>Test</button>
            </div>
        </>
    )
}

export default Register;