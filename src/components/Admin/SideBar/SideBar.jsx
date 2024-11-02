import { Link } from "react-router-dom";

import Menu from "../Menu/Menu";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Link to="/admin" className="sidebar__header-link">
          Admin
        </Link>
      </div>
      <Menu />
    </div>
  );
}

export default SideBar;
