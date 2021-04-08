import React, { useState } from "react";
import { Button } from "react-bootstrap";

const AddCategoryBlock = ({ fetchCategories }) => {
  const [formActive, setFormActive] = useState(false);
  const [textInput, setTextInput] = useState("");

  const postHandler = async (event) => {
    //event.preventDefault();

    fetch("https://webhomebudget.azurewebsites.net/api/category/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: textInput,
      }),
    })
      .then(() => {
        fetchCategories();
        setTextInput("");
      })
      .catch((error) => {
        console.log(error);
        setTextInput("");
      });
  };

  return (
    <button
      className={`add-category-block ${formActive ? "" : "flex"}`}
      onFocus={() => {
        setFormActive(true);
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setTextInput("");
          setFormActive(false);
        }
      }}
    >
      {formActive ? (
        <div className="flex">
          <input
            type="text"
            value={textInput}
            onChange={(event) => {
              setTextInput(event.target.value);
            }}
          ></input>
          <Button
            variant="success"
            onClick={(event) => {
              postHandler(event);
            }}
          >
            Save
          </Button>
        </div>
      ) : (
        <p>Add category</p>
      )}
    </button>
  );
};

export default AddCategoryBlock;
