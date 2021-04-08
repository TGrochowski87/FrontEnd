import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-regular-svg-icons";

const SubcategoryBlock = ({ subcategory, deleteHandler }) => {
  return (
    <button className="subcategory-block">
      {subcategory === null ? (
        <h1>tak</h1>
      ) : (
        <>
          <FontAwesomeIcon
            icon={faWindowClose}
            className="delete-category"
            onClick={() => {
              deleteHandler(subcategory.id);
            }}
          />
          <p>{subcategory.name}</p>
        </>
      )}
    </button>
  );
};

export default SubcategoryBlock;
