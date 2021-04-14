import React, { useState } from "react";
import CategoryCard from "./CategoryCard";
import CategoryPlus from "./CategoryPlus";

const CategoryList = ({ categories, fetchCategories }) => {
  const [colors] = useState([
    "#F2BA22",
    "#DA4A4A",
    "#0066CC",
    "#00CCCC",
    "#0066CC",
    "#DA4A4A",
    "#F2BA22",
  ]);

  const addSubCategory = (newSubcategory) => {
    const { name, categoryId } = newSubcategory;

    fetch("https://webhomebudget.azurewebsites.net/api/category/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        categoryId: categoryId,
      }),
    })
      .then(() => {
        fetchCategories();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addCategory = (name) => {
    fetch("https://webhomebudget.azurewebsites.net/api/category/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
      }),
    })
      .then(() => {
        fetchCategories();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteHandler = (id) => {
    fetch(`https://webhomebudget.azurewebsites.net/api/category/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchCategories();
    });
  };

  const categoryList = [];
  for (let i = 0; i < categories.length; i++) {
    categoryList.push(
      <CategoryCard
        key={categories[i].id}
        category={categories[i]}
        color={colors[i % colors.length]}
        addSubCategory={addSubCategory}
        deleteHandler={deleteHandler}
      />
    );
  }

  return (
    <div className="category-list">
      <CategoryPlus categories={categories} addCategory={addCategory} />
      {categoryList}
    </div>
  );
};

export default CategoryList;
