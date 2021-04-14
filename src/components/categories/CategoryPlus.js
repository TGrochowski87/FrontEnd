import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const CategoryPlus = ({ categories, addCategory }) => {
  const [inputActive, setInputActive] = useState(false);
  const [newCatInput, setNewCatInput] = useState("");

  const submitHandler = (event) => {
    for (const cat of categories) {
      if (cat.name === newCatInput) {
        alert("Category already exists!");
        return;
      }
    }

    if (newCatInput !== "" && event.key === "Enter") {
      setInputActive(false);
      addCategory(newCatInput);
    }
  };

  return (
    <div
      className={`category-card  ${inputActive ? "input-active" : "plus-card"}`}
      style={{ borderColor: "#355F77" }}
      onClick={() => {
        setInputActive(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setInputActive(false);
        }
      }}
    >
      {inputActive ? (
        <>
          <div className="card-header" style={{ backgroundColor: "#355F77" }}>
            <input
              autoFocus
              type="text"
              placeholder="New category"
              value={newCatInput}
              onChange={(event) => {
                setNewCatInput(event.target.value);
              }}
              onKeyDown={submitHandler}
            ></input>
          </div>

          <div className="card-body"></div>
        </>
      ) : (
        <FontAwesomeIcon icon={faPlus} />
      )}
    </div>
  );
};

export default CategoryPlus;
