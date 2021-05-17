import React from "react";

import PlanningList from "./ExpensePlanningList/PlanningList";
import ArchiveList from "./ExpenseArchiveList/ArchiveList";

const PlanningListSpace = ({
  plans,
  monthNames,
  archivedPlans,
  copyPlan,
  editPlan,
}) => {
  return (
    <>
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
        <div className="separator" id={0}>
          <p>ARCHIVE</p>
        </div>

        {archivedPlans.map((archivedPlan) => (
          <ArchiveList
            key={archivedPlan.date}
            plan={archivedPlan}
            monthNames={monthNames}
          />
        ))}
      </div>
    </>
  );
};

export default PlanningListSpace;
