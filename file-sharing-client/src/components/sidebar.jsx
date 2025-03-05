import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <div>
        <ul>
          <li>
            <NavLink to="/dashboard">Home</NavLink>
          </li>
          <li><NavLink to="/dashboard/files">Files</NavLink></li>
          <li><NavLink to="/dashboard/shared">Shared</NavLink></li>
          <li><NavLink to="/dashboard/transfer">Transfer</NavLink></li>
          <li><NavLink to="/dashboard/bin">Bin</NavLink></li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
