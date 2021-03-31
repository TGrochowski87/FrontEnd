import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

const AddButton = ({ addHandler }) => {
  return (
    <button
      id="add-button"
      onClick={() => {
        addHandler();
      }}
    >
      <FontAwesomeIcon id="add-icon" icon={faPlusSquare} />
    </button>
  );
};

export default AddButton;
