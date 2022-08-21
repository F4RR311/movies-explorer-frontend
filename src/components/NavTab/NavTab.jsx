
import "./NavTab.css";
import { NavLink} from "react-router-dom";
import React from "react";

export const NavTab = () => {
  return (
    <nav className="nav-tab">
      <div className="nav-tab__wrapper">
        <NavLink to="/#project" className="nav-tab__link">
          О проекте
        </NavLink>
      </div>
      <div className="nav-tab__wrapper">
        <NavLink to="/#techs" className="nav-tab__link">
          Технологии
        </NavLink>
      </div>
      <div className="nav-tab__wrapper">
        <NavLink to="/#about" className="nav-tab__link">
          Студент
        </NavLink>
      </div>
    </nav>
  );
};
