import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";

const CategoryBlock = () => {
  return (
    <div className="category-block">
      <FontAwesomeIcon icon={faTrashAlt} className="delete-category" />
      <p>Placeholder</p>
      <FontAwesomeIcon icon={faPlusSquare} className="add-category" />
    </div>
  );
};

export default CategoryBlock;
