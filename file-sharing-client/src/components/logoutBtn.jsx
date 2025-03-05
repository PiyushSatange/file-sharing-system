import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { userLogoutThunk } from "../Redux/Slice/userAuthSlice";
import Swal from "sweetalert2";

const LogoutBtn = () => {
  const [authenticated, setAuthenticated] = useState(null);
  const dispatch = useDispatch();

  function handleLogout() {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, LogOut!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(userLogoutThunk());
      }
    });
  }

  return (
    <button className="w-full h-full" onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default LogoutBtn;
