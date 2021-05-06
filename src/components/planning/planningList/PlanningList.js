import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import useFetch from "use-http";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";

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

  const createContainer = () => {
    let contents = [];

    for (let i = 0; i < plan.categories.length; i++) {
      contents.push(<Row></Row>);
    }
  };

  return (
    <div className="planning-list" id={PlanId}>
      <div
        className="item-header"
        onClick={() => {
          console.log(new Date(plan.date).getMonth());
          console.log(plan.date);
        }}
      >
        <h2>{plan.monthName}</h2>
      </div>
      <div className="list-body">
        {plan.categories.map((categoryPlan) => (
          <PlanningListItem key={categoryPlan.id} categoryPlan={categoryPlan} />
        ))}
      </div>
    </div>
  );
};

export default PlanningList;
