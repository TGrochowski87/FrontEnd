import React from "react";

import PlanningNavItem from "./PlanningNavItem";

const PlanningNav = ({ categories }) => {
  return (
    <div className="planning-nav">
      <div className="planning-nav-header">
        <>
          <h3>Expense planning</h3>
          <hr />
        </>
      </div>

      {categories.map((cat) => (
        <PlanningNavItem key={cat.id} name={cat.name} amount="1000" />
      ))}
    </div>
  );
};

export default PlanningNav;
