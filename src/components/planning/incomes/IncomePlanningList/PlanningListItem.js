import React, { useState, useEffect } from "react";

const PlanningListItem = ({ categoryPlan, editPlan }) => {
  const [editActive, setEditActive] = useState(false);
  const [inputPrice, setInputPrice] = useState(0);

  useEffect(() => {
    setInputPrice(categoryPlan.price);
  }, [categoryPlan]);

  const submitHandler = async () => {
    await editPlan(categoryPlan.id, inputPrice);
    setEditActive(false);
  };

  return (
    <div
      className="income-plan"
      onClick={() => {
        setEditActive(true);
      }}
    >
      <p>{categoryPlan.category}</p>
      {editActive ? (
        <input
          autoFocus
          type="number"
          value={inputPrice}
          onBlur={submitHandler}
          onChange={(event) => setInputPrice(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              submitHandler();
            }
          }}
        ></input>
      ) : (
        <p>{categoryPlan.price}</p>
      )}
    </div>
    // <div className="planning-card">
    //   <div className="card-header">
    //     <h3>{categoryPlan.category}</h3>
    //     <h3>{categoryPlan.price}</h3>
    //   </div>
    // </div>
  );
};

export default PlanningListItem;
