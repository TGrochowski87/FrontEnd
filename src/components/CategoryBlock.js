import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faWindowClose,
} from "@fortawesome/free-regular-svg-icons";

const CategoryBlock = ({
  category,
  deleteHandler,
  postSubHandler,
  setAddActive,
}) => {
  return (
    <button className="category-block">
      <FontAwesomeIcon
        icon={faWindowClose}
        className="delete-category"
        onClick={() => {
          deleteHandler(category.id);
        }}
      />
      <p>{category.name}</p>
      <FontAwesomeIcon
        className="close-icon add-category"
        icon={faPlusSquare}
        onClick={() => {
          setAddActive(true);
        }}
      />
    </button>
  );
};

export default CategoryBlock;
