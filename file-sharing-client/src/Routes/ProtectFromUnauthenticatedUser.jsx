import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { userLoginCheckThunk, userLoginThunk } from "../Redux/Slice/userAuthSlice";

const ProtectFromUnauthenticatedUser = ({ children }) => {
  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(userLoginCheckThunk());
  }, [])

  return isAuthenticated === true ? children : <Navigate to="/login" />;
};

export default ProtectFromUnauthenticatedUser;
