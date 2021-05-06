import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CategoryIncomeCard = ({ category, color, categoryDelete }) => {
  return (
    <div className="category-card" style={{ borderColor: color }}>
      <div className="card-header" style={{ backgroundColor: color }}>
        <h3>{category.name}</h3>
        <FontAwesomeIcon
          icon={faTimes}
          onClick={() => {
            categoryDelete(category.id);
          }}
        />
      </div>

      <div className="card-body"></div>
    </div>
  );
};

export default CategoryIncomeCard;
