import React, { useState, useEffect } from "react";
import useFetch from "use-http";

import PlanningNav from "./planningNav/PlanningNav";
import PlanningListSpace from "./planningList/PlanningListSpace";

const PlanningPage = () => {
  const [plans, setPlans] = useState([]);
  const [archivedPlans, setArchivedPlans] = useState([]);
  const [monthNames] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  //const [monthPlans, setMonthPlans] = useState([]);

  const { get, post, put } = useFetch(
    `https://webhomebudget.azurewebsites.net/api/plannedexpenses`,
    {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("userToken"),
      },
      cachePolicy: "no-cache",
    }
  );

  const plansGet = async () => {
    await get("").then((res) => {
      setArchivedPlans(res.filter((plan) => plan.archived === true));
      setPlans(res.filter((plan) => plan.archived === false));
    });
  };

  const addMonthPlan = async () => {
    await post("").then(() => {
      plansGet();
    });
  };

  const editPlan = async (id, price) => {
    const data = {
      id: id,
      price: price,
    };

    await put("", data).then(() => {
      plansGet();
    });
  };

  const copyPlan = async (from, to) => {
    //console.log("==> " + from.toISOString());
    const data = {
      planningMonth: to,
      copyFromMonth: from,
    };

    await post("/copy", data).then(() => {
      plansGet();
    });
  };

  useEffect(() => {
    plansGet();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="planning-page">
      <PlanningNav
        plans={plans}
        monthNames={monthNames}
        addMonthPlan={addMonthPlan}
      />
      <PlanningListSpace
        plans={plans}
        monthNames={monthNames}
        archivedPlans={archivedPlans}
        copyPlan={copyPlan}
        editPlan={editPlan}
      />
    </div>
  );
};

export default PlanningPage;
