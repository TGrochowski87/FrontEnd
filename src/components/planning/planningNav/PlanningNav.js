import React, { useEffect, useState } from "react";
import AddIcon from "@material-ui/icons/Add";

import PlanningNavItem from "./PlanningNavItem";

const PlanningNav = ({ monthPlans }) => {
  const [scrollY, setScrollY] = useState(window.scrollY);

  window.addEventListener("scroll", (event) => {
    setScrollY(window.scrollY);
  });

  return (
    <div
      className="planning-nav"
      style={
        scrollY > 66.357
          ? { position: "fixed", top: "0" }
          : { position: "absolute", top: "66.357px" }
      }
      //style={{ position: window.scrollY < 66.357 ? "fixed" : "absolute" }}
    >
      <div className="planning-nav-header">
        <>
          <h3>Expense planning</h3>
        </>
      </div>

      {monthPlans.map((plan) => (
        <PlanningNavItem key={plan.id} planId={plan.id} name={plan.monthName} />
      ))}
      <div
        className="new-plan"
        onClick={() => {
          //addMonthPlan();
        }}
      >
        <>
          <h5>Plan another month</h5>
          <AddIcon />
        </>
      </div>
    </div>
  );
};

export default PlanningNav;
