import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-scroll";

import PlanningNavItem from "./PlanningNavItem";

const PlanningNav = ({ plans, monthNames, addMonthPlan }) => {
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
        scrollY > 56
          ? { position: "fixed", top: "0" }
          : { position: "absolute", top: "56px" }
      }
    >
      <div
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

        <div className="nav-list">
          {plans.map((plan) => (
            <PlanningNavItem
              key={plan.date}
              planId={plan.date}
              setActiveForMobile={setActiveForMobile}
              year={new Date(plan.date).getFullYear()}
              name={monthNames[new Date(plan.date).getMonth()]}
            />
          ))}
        </div>
        <div
          className="new-plan"
          onClick={() => {
            addMonthPlan();
          }}
        >
          <>
            <h5>Plan another month</h5>
            <AddIcon />
          </>
        </div>
        <Link to={0} smooth>
          <div className="archive-nav">
            <p>ARCHIVE</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PlanningNav;
