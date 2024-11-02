import Cookies from "js-cookie";
import { FaSearch, FaBell, FaUser, FaRunning, FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const cookiesUser = Cookies.get("user");
  const user = cookiesUser && JSON.parse(cookiesUser);

  const handleClickLogOut = (event) => {
    event.preventDefault();
    Cookies.remove("user");
    Cookies.remove("access_token");
    navigate("/admin/login");
  };

  return (
    <div className="header-admin">
      <div className="col-2"></div>
      <div className="header__search">
        <span className="search-icon">
          <FaSearch />
        </span>
        <input type="text" className="form-search" placeholder="Search" />
      </div>

      <div className="header__user">
        <div className="header__notifi">
          <FaBell />
        </div>

        <div className="header__user-avatar">
          <FaUserAlt />
          <div className="header__user-profile">
            <div className="user-profile-name">
              <h4>{user && user.lastName + " " + user.firstName}</h4>
            </div>

            <ul className="profile-list">
              <li className="profile-item">
                <a href="" className="profile-item-link">
                  <FaUser />
                  Thông tin cá nhân
                </a>
              </li>
            </ul>

            <div className="user-logout">
              <FaRunning />
              <a
                onClick={(event) => handleClickLogOut(event)}
                href=""
                className="profile-item-link"
              >
                Đăng xuất
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
