import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "react-bootstrap";

const CategoryCard = ({ category, color, subcategoryPost, categoryDelete }) => {
  const [newSubInput, setNewSubInput] = useState("");

  const submitHandler = (event) => {
    if (event.key === "Enter") {
      for (const sub of category.subcategories) {
        if (sub.name === newSubInput) {
          alert("Subcategory already exists!");
          return;
        }
      }

      if (newSubInput !== "") {
        const newCategory = {
          name: newSubInput,
          categoryId: category.id,
        };
        setNewSubInput("");
        subcategoryPost(newCategory);
      }
    }
  };

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

      <div className="card-body">
        <input
          type="text"
          placeholder="New subcategory"
          value={newSubInput}
          onBlur={() => {
            setNewSubInput("");
          }}
          onChange={(event) => {
            setNewSubInput(event.target.value);
          }}
          onKeyDown={submitHandler}
        ></input>
        <h5>Subcategories:</h5>
        {category.subcategories.map((sub) => (
          <Badge key={sub.id} pill style={{ backgroundColor: color }}>
            {sub.name}{" "}
            <FontAwesomeIcon
              icon={faTimes}
              onClick={() => {
                categoryDelete(sub.id);
              }}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
