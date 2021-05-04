import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import useFetch from "use-http";

import PlanningListItem from "./PlanningListItem";

const PlanningList = ({ plan, PlanId }) => {
  const [plans, setPlans] = useState([]);

  const { get, loading, response } = useFetch(
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
      console.log(res);
      setPlans(res);
    });
  };

  useEffect(() => {
    plansGet();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
