import React from "react";
import "./SideBar.css";
import {
  IoStorefrontOutline,
  IoLogOutOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { FiTruck } from "react-icons/fi";
import { SiCoffeescript } from "react-icons/si";
import { useHistory } from "react-router-dom";

function SideBar() {
  let history = useHistory();
  const HandleLogOut = () => {
    localStorage.clear();
    history.push("/login");
  };

  return (
    <div className="body">
      <div className="l-navbar" id="nav-bar">
        <nav className="nav">
          <p className="nav__logo">
            <SiCoffeescript className="nav__logo-icon" />
          </p>
          <div>
            <div className="container_nav">
              <a href="/cashier" className="nav__link ">
                <IoStorefrontOutline className="nav__icon" />
              </a>
              <a href="/storehouse" className="nav__link">
                <FiTruck className="nav__icon" />
              </a>
              <a href="/dashboard" className="nav__link">
                <IoPersonCircleOutline className="nav__icon" />
              </a>
            </div>
          </div>
          <p onClick={HandleLogOut} className="nav__link">
            <IoLogOutOutline className="nav__icon" />
          </p>
        </nav>
      </div>
    </div>
  );
}

export default SideBar;
