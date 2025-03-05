import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router"
// import { fetchApi } from "../Redux/Slice/userLoginSlice";
import { userRegisterThunk } from "../Redux/Slice/userAuthSlice";

export function Register(){
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const {isAuthenticated, isLoading} = useSelector((state) => state.userAuth);
    const dispatch = useDispatch();


    function handleFirstName(e){
        setFirstName(e.target.value);
    }
    function handleLastName(e){
        setLastName(e.target.value);
    }
    function handleEmail(e){
        setEmail(e.target.value);
    }
    function handlePassword(e){
        setPassword(e.target.value)
    }
    function handleSubmit(){
        const payload = {
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:password
        };
        dispatch(userRegisterThunk(payload));
    }


    return(
        <>
            <div>
                <h3>Register Page</h3>
                <label>First Name</label>
                <input type="text" onChange={handleFirstName} />
                <label>Last Name</label>
                <input type="text" onChange={handleLastName} />
                <input type="email" onChange={handleEmail} />
                <input type="password" onChange={handlePassword} />
                <button onClick={handleSubmit} disabled={isLoading}>Submit</button>
                <NavLink to="/login">Already have account?</NavLink>
            </div>
        </>
    )
}

export default Register;