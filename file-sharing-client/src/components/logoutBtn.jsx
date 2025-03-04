import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { userLogoutThunk } from "../Redux/Slice/userAuthSlice";

const LogoutBtn = () => {
  const [authenticated, setAuthenticated] = useState(null);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(userLogoutThunk());
  }

  return <button onClick={handleLogout}>Log Out</button>;
};

export default LogoutBtn;
