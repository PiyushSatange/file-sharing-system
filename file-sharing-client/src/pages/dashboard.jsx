import { Outlet } from "react-router";
import LogoutBtn from "../components/logoutBtn";
import SideBar from "../components/sidebar";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const {firstName, lastName} = useSelector(
    (state) => state.userAuth.userData
  );
  return (
    <>
      <SideBar />
      <p>Dashboard</p>
      <p>
        {firstName}, {lastName}
      </p>
      <LogoutBtn />
      <Outlet></Outlet>
    </>
  );
};

export default Dashboard;
