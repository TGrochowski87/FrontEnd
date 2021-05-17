import React from "react";
import { v4 as uuidv4 } from "uuid";

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
          <ArchiveListItem key={uuidv4()} categoryPlan={categoryPlan} />
        ))}
      </div>
    </div>
  );
};

export default ArchiveList;
