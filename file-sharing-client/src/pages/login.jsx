import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router";
import toast, { Toaster } from "react-hot-toast";

export function Login(){
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();

    function handleEmail(e){
        console.log(e.target.value);
        setEmail(e.target.value);
    }
    function handlePassword(e){
        console.log(e.target.value);
        setPassword(e.target.value)
    }
    async function handleSubmit(){
        const payload = {
            email:email,
            password:password
        };
        await fetch("http://localhost:8000/api/auth/login",
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(payload),
                credentials: "include"
            }
        ).then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.success == true){
                console.log("inside success")
                toast.success("login success");
                navigate("/dashboard");
                
            }
            else{
                toast.error("login failed");
                console.log("inside else")
            }
        })
    }

    function handleTest(){
        fetch("http://localhost:8000/api/auth/checkToken",
            {
                credentials: "include"
            }
        ).then(response => console.log(response));
        toast('Here is your toast.');
    }



        return(
        <div>
            <h3>Login Page</h3>
            <input type="email" onChange={handleEmail} />
            <input type="password" onChange={handlePassword} />
            <button onClick={handleSubmit}>Submit</button>
            <NavLink to="/register">Create new account</NavLink>
            <button onClick={handleTest}>Test</button>
            
        </div>
        )
    
        
    
}

export default Login;