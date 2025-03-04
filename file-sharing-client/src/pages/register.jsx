import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router"
// import { fetchApi } from "../Redux/Slice/userLoginSlice";
import { userRegisterThunk } from "../Redux/Slice/userAuthSlice";

export function Register(){
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const {isAuthenticated, isLoading} = useSelector((state) => state.userAuth);
    const dispatch = useDispatch();

    function handleEmail(e){
        setEmail(e.target.value);
    }
    function handlePassword(e){
        setPassword(e.target.value)
    }
    function handleSubmit(){
        const payload = {
            email:email,
            password:password
        };
        dispatch(userRegisterThunk(payload));
    }


    return(
        <>
            <div>
                <h3>Register Page</h3>
                <input type="email" onChange={handleEmail} />
                <input type="password" onChange={handlePassword} />
                <button onClick={handleSubmit} disabled={isLoading}>Submit</button>
                <NavLink to="/login">Already have account?</NavLink>
            </div>
        </>
    )
}

export default Register;