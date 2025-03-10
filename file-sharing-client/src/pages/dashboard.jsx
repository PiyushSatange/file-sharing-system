import { Outlet } from "react-router";
import LogoutBtn from "../components/logoutBtn";
import SideBar from "../components/sidebar";
import { useSelector } from "react-redux";

const Dashboard = () => {
  return (
    <>
      <div className="h-screen flex">
        {/* Fixed Sidebar */}
        <div className="bg-purple-500 w-1/6 h-screen fixed">
          <SideBar />
        </div>

        {/* Scrollable Content Area (Adjusted Width) */}
        <div className="bg-amber-200 w-5/6 ml-[16.67%] overflow-auto h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
