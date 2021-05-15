import React, { useState, useEffect } from "react";
import { Badge } from "react-bootstrap";

const CategoryPlan = ({ plan, editPlan }) => {
  const [editActive, setEditActive] = useState(false);
  const [inputPrice, setInputPrice] = useState(0);

  useEffect(() => {
    setInputPrice(plan.price);
  }, [plan]);

  const submitHandler = async (event) => {
    if (event.key === "Enter") {
      await editPlan(plan.id, inputPrice);
      setEditActive(false);
    }
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
          type="number"
          value={inputPrice}
          onBlur={() => {
            setEditActive(false);
          }}
          onChange={(event) => setInputPrice(event.target.value)}
          onKeyDown={(event) => {
            submitHandler(event);
          }}
        ></input>
      ) : (
        <p>{plan.price}</p>
      )}
    </Badge>
  );
};

export default CategoryPlan;
