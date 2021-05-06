import React from "react";

const PlanningListItem = ({ categoryPlan }) => {
  return (
    <div className="planning-list-item">
      <h4>{categoryPlan.name}</h4>
      <h4>{categoryPlan.price}</h4>
    </div>
  );
};

export default PlanningListItem;
