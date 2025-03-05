import { Outlet } from "react-router";
import LogoutBtn from "../components/logoutBtn";
import SideBar from "../components/sidebar";
import { useSelector } from "react-redux";

const Dashboard = () => {
  return (
    <>
      <div className="h-screen flex">
        <div className="bg-purple-500 w-1/6">
          <SideBar />
        </div>
        <div className="bg-amber-200 w-5/6">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
