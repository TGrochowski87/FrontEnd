import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
//import { faEdit } from "@fortawesome/free-solid-svg-icons";

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
  // return (
  //   <button
  //     className="add-button"
  //     onClick={() => {
  //       addHandler();
  //     }}
  //   >
  //     <FontAwesomeIcon className="add-icon" icon={faPlusSquare} />
  //     {/* </div><div className="underlay"></div> */}
  //   </button>
  // );
};

export default AddButton;
