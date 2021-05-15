import React from "react";
import { Link } from "react-scroll";

const PlanningNavItem = ({ name, planId, year, setActiveForMobile }) => {
  return (
    <Link
      onClick={() => {
        setActiveForMobile(false);
      }}
      to={planId}
      smooth={true}
    >
      <div className="planning-nav-item">
        <h4>{name}</h4>
        <h4 className="year">{year}</h4>
      </div>
    </Link>
  );
};

export default PlanningNavItem;
