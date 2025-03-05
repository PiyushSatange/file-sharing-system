import { NavLink } from "react-router-dom";
import LogoutBtn from "./logoutBtn";
import { useSelector } from "react-redux";

const SideBar = () => {
  const { firstName, lastName } = useSelector(
    (state) => state.userAuth.userData
  );
  return (
    <>
      <div className="bg-gray-800 bg-blend-darken h-screen flex flex-col justify-between">
        <div className=" h-2/10 flex flex-col justify-center items-center">
          <img src="../public/img/image.png" className="w-20" />
          <h3 className="font-extrabold text-2xl text-green-700">ShareVault</h3>
        </div>
        <div className=" h-8/10 ">
          <ul className="h-full flex flex-col justify-evenly">
            <li className="text-center">
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `py-3 w-full block text-white hover:bg-gray-900 ${
                    isActive ? "bg-gray-900 font-bold" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="text-center">
              <NavLink
                to="/dashboard/files"
                className={({ isActive }) =>
                  `py-3 w-full block text-white hover:bg-gray-900 ${
                    isActive ? "bg-gray-900 font-bold" : ""
                  }`
                }
              >
                Files
              </NavLink>
            </li>
            <li className=" text-center">
              <NavLink
                to="/dashboard/shared"
                className={({ isActive }) =>
                  `py-3 w-full block text-white hover:bg-gray-900 ${
                    isActive ? "bg-gray-900 font-bold" : ""
                  }`
                }
              >
                Shared
              </NavLink>
            </li>
            <li className=" text-center">
              <NavLink
                to="/dashboard/transfer"
                className={({ isActive }) =>
                  `py-3 w-full block text-white hover:bg-gray-900 ${
                    isActive ? "bg-gray-900 font-bold" : ""
                  }`
                }
              >
                Transfer
              </NavLink>
            </li>
            <li className=" text-center">
              <NavLink
                to="/dashboard/starred"
                className={({ isActive }) =>
                  `py-3 w-full block text-white hover:bg-gray-900 ${
                    isActive ? "bg-gray-900 font-bold" : ""
                  }`
                }
              >
                Starred
              </NavLink>
            </li>
            <li className=" text-center">
              <NavLink
                to="/dashboard/upload"
                className={({ isActive }) =>
                  `py-3 w-full block text-white hover:bg-gray-900 ${
                    isActive ? "bg-gray-900 font-bold" : ""
                  }`
                }
              >
                Upload
              </NavLink>
            </li>
            <li className=" text-center">
              <NavLink
                to="/dashboard/bin"
                className={({ isActive }) =>
                  `py-3 w-full block text-white hover:bg-gray-900 ${
                    isActive ? "bg-gray-900 font-bold" : ""
                  }`
                }
              >
                Bin
              </NavLink>
            </li>
            <li className=" text-center">
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `py-3 w-full block text-white hover:bg-gray-900 ${
                    isActive ? "bg-gray-900 font-bold" : ""
                  }`
                }
              >
                Profile
              </NavLink>
            </li>
            <li className=" text-center">
              <p className="py-3 text-white hover:bg-gray-900">
                <LogoutBtn />
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
