import React from "react";

import ArchiveListItem from "./ArchiveListItem";

const ArchiveList = ({ plan, monthNames }) => {
  return (
    <div className="planning-list">
      <div className="item-header">
        <h2>{monthNames[new Date(plan.date).getMonth()]}</h2>
        <h2>{new Date(plan.date).getFullYear()}</h2>
      </div>
      <div className="list-body">
        {plan.plans.map((categoryPlan) => (
          <ArchiveListItem key={categoryPlan.id} categoryPlan={categoryPlan} />
        ))}
      </div>
    </div>
  );
};

export default ArchiveList;
