import React from "react";
import { Link } from "react-scroll";

const PlanningNavItem = ({ name, planId }) => {
  return (
    <Link to={planId} smooth={true}>
      <div className="planning-nav-item">
        <h4>{name}</h4>
      </div>
    </Link>
  );
};

export default PlanningNavItem;
