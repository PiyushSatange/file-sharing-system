import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { userLoginCheckThunk } from "../Redux/Slice/userAuthSlice";

const ProtectFromAuthenticatedUser = ({ children }) => {
  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(userLoginCheckThunk());
  }, []);

  return isAuthenticated === false ? children : <Navigate to="/dashboard" />;
};

export default ProtectFromAuthenticatedUser;
