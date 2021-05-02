import React from "react";

import PlanningList from "./PlanningList";

const PlanningListSpace = ({ monthPlans }) => {
  return (
    <div className="planning-space">
      {monthPlans.map((plan) => (
        <PlanningList key={plan.id} PlanId={plan.id} plan={plan} />
      ))}
    </div>
  );
};

export default PlanningListSpace;
