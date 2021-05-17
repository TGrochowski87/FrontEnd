import React from "react";
import { v4 as uuidv4 } from "uuid";
import { DropdownButton, Dropdown } from "react-bootstrap";

import PlanningListItem from "./PlanningListItem";

const PlanningList = ({
  plan,
  PlanId,
  monthNames,
  archivedPlans,
  copyPlan,
  editPlan,
}) => {
  return (
    <div className="planning-list" id={PlanId}>
      <div className="item-header">
        <h2>{monthNames[new Date(plan.date).getMonth()]}</h2>
        <h2>{new Date(plan.date).getFullYear()}</h2>
        <DropdownButton
          //as={ButtonGroup}
          id={`dropdown-button-drop-down`}
          drop="down"
          variant="secondary"
          title="Copy from"
        >
          {archivedPlans.map((archived) => (
            <Dropdown.Item
              key={archived.date}
              onClick={() => {
                copyPlan(archived.date, plan.date);
              }}
            >
              <p>{monthNames[new Date(archived.date).getMonth()]}</p>
              <p>{new Date(archived.date).getFullYear()}</p>
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      <div className="list-body">
        {plan.plans.map((categoryPlan) => (
          <PlanningListItem
            key={uuidv4()}
            categoryPlan={categoryPlan}
            editPlan={editPlan}
          />
        ))}
      </div>
    </div>
  );
};

export default PlanningList;
