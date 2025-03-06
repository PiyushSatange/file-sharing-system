import { NavLink } from "react-router-dom";
import LogoutBtn from "./logoutBtn";
import { useSelector } from "react-redux";

const SideBar = () => {
  const { firstName, lastName } = useSelector(
    (state) => state.userAuth.userData
  );
  return (
    <>
      <div className="bg-gray-900 text-white h-screen flex flex-col justify-between shadow-lg">
        {/* Logo & Branding */}
        <div className="flex flex-col items-center py-6">
          <img src="../public/img/image.png" className="w-16 mb-2" alt="Logo" />
          <h3 className="font-extrabold text-2xl text-lime-600 tracking-wide">
            ShareVault
          </h3>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1">
          <ul className="flex flex-col gap-2">
            {[
              { to: "/dashboard", label: "Home", icon: "🏠" },
              { to: "/dashboard/files", label: "Files", icon: "📁" },
              { to: "/dashboard/shared", label: "Shared", icon: "🔗" },
              { to: "/dashboard/transfer", label: "Transfer", icon: "📤" },
              { to: "/dashboard/starred", label: "Starred", icon: "⭐" },
              { to: "/dashboard/upload", label: "Upload", icon: "⬆️" },
              { to: "/dashboard/bin", label: "Bin", icon: "🗑️" },
              { to: "/dashboard/profile", label: "Profile", icon: "👤" },
            ].map(({ to, label, icon }) => (
              <li key={to} className="text-center">
                <NavLink
                  to={to}
                  end
                  className={({ isActive }) =>
                    `py-3 flex items-center gap-3  w-full rounded-lg transition-all duration-300 pl-5    ${
                      isActive ? "bg-lime-600 font-bold" : "hover:bg-gray-800"
                    }`
                  }
                >
                  <span className="text-lg">{icon}</span>
                  <span className="hidden md:inline">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="text-center pb-4">
          <button className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-lg transition duration-300">
            <LogoutBtn />
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
