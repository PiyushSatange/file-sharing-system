import React, { useEffect, useState } from "react";
import { NavLink } from "react-router"

export function Register(){
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

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
        fetch("http://localhost:8000/api/auth/login",
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(payload),
                credentials: "include"
            }
        ).then(response => console.log(response));
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