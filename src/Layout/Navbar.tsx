/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Avatar } from "rsuite";
import { Routes } from "../constant";
import logo from "./../assets/logo.svg";
import "./Navbar.css";
import { TokenKey, ShipmentId } from "../constant";
import { RxHamburgerMenu } from "react-icons/rx";

const CustomNavbar = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleAvatarClick = () => setDropdownVisible((prev) => !prev);
  const handleLogout = () => {
    setDropdownVisible(false);
    localStorage.removeItem(TokenKey);
    sessionStorage.removeItem(ShipmentId);
    window.location.href = `/`;
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-main">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="Amiinu" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <RxHamburgerMenu color="white" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link active"
                aria-current="page"
                to={Routes.DASHBOARD}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Quote
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink className="dropdown-item" to={Routes.GET_QUOTE}>
                    Quote
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to={Routes.QUOTE_DASHBOARD}
                  >
                    Quotation dashboard
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                {" "}
                Team
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                {" "}
                Contact
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                {" "}
                Book
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                {" "}
                Track
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                {" "}
                Report
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                {" "}
                Support
              </a>
            </li>
          </ul>
          <form className="d-flex avatar-form">
            <Avatar
              size="sm"
              circle
              src="https://avatars.githubusercontent.com/u/1203827"
              alt="@simonguo"
              style={{ marginLeft: 8, cursor: "pointer" }}
              onClick={handleAvatarClick}
            />
            {isDropdownVisible && (
              <div className="dropdown-contentss" ref={dropdownRef}>
                <p onClick={() => setDropdownVisible(false)}>Profile</p>
                <p onClick={() => setDropdownVisible(false)}>Settings</p>
                <p onClick={handleLogout}>Logout</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default CustomNavbar;
