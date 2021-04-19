import React from "react";
import { Spinner } from "react-bootstrap";
import CategoryList from "./CategoryList";

const CategoryPage = ({ categories, fetchCategories, isLoading }) => {
  return (
    <div className="category-page">
      {isLoading ? (
        <Spinner animation="border" variant="light" />
      ) : (
        <CategoryList
          categories={categories}
          fetchCategories={fetchCategories}
        />
      )}
    </div>
  );
};

export default CategoryPage;
