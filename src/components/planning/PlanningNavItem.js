import React from "react";

const PlanningNavItem = ({ name, amount }) => {
  return (
    <div className="planning-nav-item">
      <h4>{name}</h4>
      <h5>{amount}</h5>
    </div>
  );
};

export default PlanningNavItem;
