import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const EditButton = ({ record, editHandler }) => {
  return (
    <button
      className="edit-button"
      onClick={() => {
        editHandler(record);
      }}
    >
      <FontAwesomeIcon icon={faEdit} />
      <span>Edit</span>
    </button>
  );
};

export default EditButton;
