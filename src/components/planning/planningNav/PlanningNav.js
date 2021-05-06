import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";

import PlanningNavItem from "./PlanningNavItem";

const PlanningNav = ({ monthPlans }) => {
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [activeForMobile, setActiveForMobile] = useState(false);

  window.addEventListener("scroll", (event) => {
    setScrollY(window.scrollY);
  });

  return (
    <div
      className={`planning-nav-space ${
        activeForMobile ? "mobile-active-panel" : ""
      }`}
      style={
        scrollY > 66.357
          ? { position: "fixed", top: "0" }
          : { position: "absolute", top: "68.359px" }
      }
    >
      <div
        // className="roll-out-button"
        onClick={() => {
          setActiveForMobile(!activeForMobile);
        }}
        className={`roll-out-button ${
          activeForMobile ? "mobile-active-button" : ""
        }`}
      >
        <p>NAVIGATE</p>
      </div>
      <div
        className="planning-nav"

        //style={{ position: window.scrollY < 66.357 ? "fixed" : "absolute" }}
      >
        <div className="planning-nav-header">
          <>
            <h3>Expense planning</h3>
          </>
        </div>

        {monthPlans.map((plan) => (
          <PlanningNavItem
            key={plan.id}
            planId={plan.id}
            name={plan.monthName}
          />
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
    </div>
  );
};

export default PlanningNav;
