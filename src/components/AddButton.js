import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";

const AddButton = ({ addHandler }) => {
  return (
    <div className="add-button">
      <FontAwesomeIcon
        className="add-icon"
        onClick={() => {
          addHandler();
        }}
        icon={faPlusSquare}
      />
      <div className="underlay"></div>
    </div>
  );
};

export default AddButton;
