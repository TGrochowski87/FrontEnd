import React, { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";

const CategoryPlan = ({ plan, editPlan }) => {
  const [editActive, setEditActive] = useState(false);
  const [inputPrice, setInputPrice] = useState(0);

  useEffect(() => {
    setInputPrice(plan.price);
  }, [plan]);

  const submitHandler = async () => {
    await editPlan(plan.id, inputPrice);
    setEditActive(false);
  };

  return (
    <Badge
      pill
      onClick={() => {
        setEditActive(true);
      }}
    >
      <p>{plan.category}</p>
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
        <p>{plan.price}</p>
      )}
    </Badge>
  );
};

export default CategoryPlan;
