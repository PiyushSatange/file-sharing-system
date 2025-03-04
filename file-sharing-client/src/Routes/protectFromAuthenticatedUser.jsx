import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectFromAuthenticatedUser = ({ children }) => {
  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );

  return isAuthenticated === false ? children : <Navigate to="/dashboard" />;
};

export default ProtectFromAuthenticatedUser;
