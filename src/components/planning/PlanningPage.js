import React, { useState, useEffect } from "react";
import useFetch from "use-http";
import { v4 as uuidv4 } from "uuid";

import PlanningNav from "./planningNav/PlanningNav";
import PlanningListSpace from "./planningList/PlanningListSpace";

const PlanningPage = () => {
  const [plans, setPlans] = useState([]); //TODO: ARCHIVED
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

  const { get } = useFetch(
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
      setPlans(res);
    });
    // if (response.ok) {
    //   setCategories(categories);
    // }
  };

  // const addMonthPlan = () => {
  //   const indexOfLastMonth = monthNames.indexOf(
  //     monthPlans[monthPlans.length - 1].month
  //   );
  //   const nextMonth = monthNames[(indexOfLastMonth + 1) % 12];
  //   setMonthPlans([
  //     ...monthPlans,
  //     {
  //       id: uuidv4(),
  //       month: nextMonth,
  //       categories: plans.map((cat) => cat.name),
  //     },
  //   ]);
  // };

  useEffect(() => {
    console.log(plans);
    const monthArray = [];

    for (const plan of plans) {
      const month = monthNames[new Date(plan.date).getMonth() - 1];
      if (!monthArray.includes(month)) {
        monthArray.push(month);
      }
    }
    console.log(monthArray);

    let mPlans = monthArray.map((month) => {
      return {
        monthName: month,
        categories: [],
      };
    });
    console.log(mPlans);

    mPlans = mPlans.map((mplan) => {
      return {
        id: uuidv4(),
        monthName: mplan.monthName,
        categories: plans
          .filter(
            (plan) =>
              monthNames[new Date(plan.date).getMonth() - 1] === mplan.monthName
          )
          .map((plan) => {
            return {
              id: plan.id,
              name: plan.category,
              price: plan.price,
            };
          }),
      };
    });

    console.log(mPlans);

    setMonthPlans(mPlans);

    // for (let i = 0; i < mPlans.length; i++) {
    //   //const month = monthNames[new Date(plan.date).getMonth() - 1];
    //   mPlans = mPlans.map(mplan => {
    //     return {
    //       monthName: mplan.monthName,
    //       categories:
    //     };
    //   })
    // }

    // await setMonthPlans(
    //   monthArray.map((month) => {
    //     return {
    //       monthName: month,
    //       categories: [],
    //     };
    //   })
    // );

    // setMonthPlans([
    //   {
    //     id: uuidv4(),
    //     month: monthNames[new Date().getMonth()],
    //     categories: plans.map((cat) => cat.name),
    //   },
    // ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plans]);

  useEffect(() => {
    plansGet();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="planning-page">
      <PlanningNav monthPlans={monthPlans} />
      <PlanningListSpace monthPlans={monthPlans} />
    </div>
  );
};

export default PlanningPage;
