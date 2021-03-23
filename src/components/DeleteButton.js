import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const DeleteButton = ({ deleteHandler, id }) => {
  return (
    <button
      className="delete-button"
      onClick={() => {
        deleteHandler(id);
      }}
    >
      <FontAwesomeIcon icon={faTrashAlt} />
      <span>Delete</span>
    </button>
  );
};

export default DeleteButton;
