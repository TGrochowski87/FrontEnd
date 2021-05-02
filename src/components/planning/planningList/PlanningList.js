import React from "react";
import { v4 as uuidv4 } from "uuid";

import PlanningListItem from "./PlanningListItem";

const PlanningList = ({ plan, PlanId }) => {
  return (
    <div className="planning-list" id={PlanId}>
      <div className="item-header">
        <h2>{plan.month}</h2>
      </div>
      {plan.categories.map((category) => (
        <PlanningListItem key={uuidv4()} category={category} />
      ))}
    </div>
  );
};

export default PlanningList;
