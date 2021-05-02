import React, { useState, useEffect } from "react";
import useFetch from "use-http";
import { v4 as uuidv4 } from "uuid";

import PlanningNav from "./planningNav/PlanningNav";
import PlanningListSpace from "./planningList/PlanningListSpace";

const PlanningPage = () => {
  const [categories, setCategories] = useState([]);
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
  const [monthPlans, setMonthPlans] = useState([]);

  const { get, loading, response } = useFetch(
    `https://webhomebudget.azurewebsites.net/api/category`,
    {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("userToken"),
      },
      cachePolicy: "no-cache",
    }
  );

  const categoryGet = async () => {
    await get("/over").then((res) => {
      setCategories(res);
    });
    // if (response.ok) {
    //   setCategories(categories);
    // }
  };

  const addMonthPlan = () => {
    const indexOfLastMonth = monthNames.indexOf(
      monthPlans[monthPlans.length - 1].month
    );
    const nextMonth = monthNames[(indexOfLastMonth + 1) % 12];
    setMonthPlans([
      ...monthPlans,
      {
        id: uuidv4(),
        month: nextMonth,
        categories: categories.map((cat) => cat.name),
      },
    ]);
  };

  useEffect(() => {
    setMonthPlans([
      {
        id: uuidv4(),
        month: monthNames[new Date().getMonth()],
        categories: categories.map((cat) => cat.name),
      },
    ]);
  }, [categories]);

  useEffect(() => {
    categoryGet();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="planning-page">
      <PlanningNav monthPlans={monthPlans} addMonthPlan={addMonthPlan} />
      <PlanningListSpace monthPlans={monthPlans} />
    </div>
  );
};

export default PlanningPage;
