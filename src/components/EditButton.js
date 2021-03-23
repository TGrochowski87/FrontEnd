import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const EditButton = () => {
  const editHandler = () => {
    console.log("edit");
  };

  return (
    <button
      className="edit-button"
      onClick={() => {
        editHandler();
      }}
    >
      <FontAwesomeIcon icon={faEdit} />
      <span>Edit</span>
    </button>
  );
};

export default EditButton;
