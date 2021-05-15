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
  //const [plans, setPlans] = useState([]);

  // const { get } = useFetch(
  //   `https://webhomebudget.azurewebsites.net/api/plannedexpenses`,
  //   {
  //     headers: {
  //       Authorization: "Bearer " + sessionStorage.getItem("userToken"),
  //     },
  //     cachePolicy: "no-cache",
  //   }
  // );

  // const plansGet = async () => {
  //   await get("").then((res) => {
  //     console.log(res);
  //     setPlans(res);
  //   });
  // };

  // useEffect(() => {
  //   plansGet();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="planning-list" id={PlanId}>
      <div className="item-header">
        <h2>{monthNames[new Date(plan.date).getMonth()]}</h2>
        <DropdownButton
          //as={ButtonGroup}
          id={`dropdown-button-drop-down`}
          drop="down"
          variant="secondary"
          title="Copy from"
        >
          <Dropdown.Item eventKey="1">Previous</Dropdown.Item>
          <Dropdown.Divider />
          {archivedPlans.map((archived) => (
            <Dropdown.Item
              key={archived.date}
              onClick={() => {
                copyPlan(archived.date, plan.date);
              }}
            >
              {monthNames[new Date(archived.date).getMonth()]}
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
