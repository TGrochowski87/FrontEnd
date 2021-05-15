import React from "react";

import PlanningList from "./PlanningList";

const PlanningListSpace = ({
  plans,
  monthNames,
  archivedPlans,
  copyPlan,
  editPlan,
}) => {
  return (
    <div className="planning-space">
      {plans.map((plan) => (
        <PlanningList
          key={plan.date}
          PlanId={plan.date}
          plan={plan}
          monthNames={monthNames}
          archivedPlans={archivedPlans}
          copyPlan={copyPlan}
          editPlan={editPlan}
        />
      ))}
    </div>
  );
};

export default PlanningListSpace;
