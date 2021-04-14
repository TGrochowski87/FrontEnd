import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import CategoryList from "./CategoryList";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    const supCategories = await fetch(
      "https://webhomebudget.azurewebsites.net/api/category/base/over"
    ).then((response) => response.json());

    const fetchSubcategories = async () => {
      const newCategoriesData = [];
      for (const sup of supCategories) {
        const subcategories = await fetch(
          `https://webhomebudget.azurewebsites.net/api/category/base/sub/${sup.id}`
        ).then((response) => response.json());
        const dataItem = { ...sup, subcategories };
        newCategoriesData.push(dataItem);
      }

      setCategories(newCategoriesData);
      setIsLoading(false);
    };
    await fetchSubcategories();
  };

  useEffect(() => {
    setIsLoading(true);
    fetchCategories();
  }, []);

  return (
    <div className="category-page">
      {isLoading ? (
        <Spinner animation="border" />
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
