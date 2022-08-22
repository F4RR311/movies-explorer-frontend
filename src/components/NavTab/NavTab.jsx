
import "./NavTab.css";
import { Link} from "react-router-dom";
import React from "react";

export const NavTab = () => {
  return (
    <nav className="nav-tab">
      <div className="nav-tab__wrapper">
        <Link to="/#project" className="nav-tab__link">
          О проекте
        </Link>
      </div>
      <div className="nav-tab__wrapper">
        <Link to="/#techs" className="nav-tab__link">
          Технологии
        </Link>
      </div>
      <div className="nav-tab__wrapper">
        <Link to="/#about" className="nav-tab__link">
          Студент
        </Link>
      </div>
    </nav>
  );
};
