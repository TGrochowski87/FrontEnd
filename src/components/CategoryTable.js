import React, { useState } from "react";
import CategoryBlock from "./CategoryBlock";

const CategoryTable = () => {
  const [categories, setCategories] = useState([
    "Jedzenie",
    "Na mieście",
    "Ubrania",
  ]);

  return (
    <div className="category-table">
      <CategoryBlock />
      <CategoryBlock />
    </div>
  );
};

export default CategoryTable;
