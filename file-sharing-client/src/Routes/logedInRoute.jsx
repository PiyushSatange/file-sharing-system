import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const ProtectedLogedInRoute = ({children}) => {

    const[isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        async function checkToken(){
            await fetch("http://localhost:8000/api/auth/checkToken",
                {
                    method: "GET",
                    credentials: "include"
                }
            ).then((result) => result.json())
            .then((data) => {
                console.log(data);
                if(data.success == true){
                    setIsAuthenticated(true);
                }
                else{
                    setIsAuthenticated(false);
                }
            }).catch(err => console.log(err));
        }
    checkToken();
    }, [])

    if (isAuthenticated === null) return <div>Loading...</div>;

    return isAuthenticated ? children : <Navigate to="/login" />;   
}

export default ProtectedLogedInRoute;