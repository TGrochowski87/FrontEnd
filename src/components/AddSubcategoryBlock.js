import React, { useState } from "react";
import { Button } from "react-bootstrap";

const AddSubcategoryBlock = ({ fetchCategories, setAddActive, parentId }) => {
  const [textInput, setTextInput] = useState("");

  const postHandler = async (event) => {
    event.preventDefault();

    fetch("https://webhomebudget.azurewebsites.net/api/category/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: textInput,
        categoryId: parentId,
      }),
    })
      .then(() => {
        fetchCategories();
        setAddActive(false);
      })
      .catch((error) => {
        console.log(error);
        setAddActive(false);
      });
  };

  return (
    <button
      className={`subcategory-block flex`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setTextInput("");
          setAddActive(false);
        }
      }}
    >
      <div className="flex">
        <input
          type="text"
          value={textInput}
          onChange={(event) => {
            setTextInput(event.target.value);
          }}
          autoFocus
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
    </button>
  );
};

export default AddSubcategoryBlock;
