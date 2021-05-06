import React, { useState, useEffect } from "react";
import useFetch from "use-http";

import CategoryExpenseCard from "./CategoryExpenseCard";
import CategoryPlus from "../CategoryPlus";

const CategoryExpenseList = () => {
  const [categories, setCategories] = useState([]);
  const [colors] = useState([
    "#F2BA22",
    "#DA4A4A",
    "#0066CC",
    "#00CCCC",
    "#0066CC",
    "#DA4A4A",
    "#F2BA22",
  ]);

  const { get, post, del, response } = useFetch(
    `https://webhomebudget.azurewebsites.net/api/category/expense`,
    {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("userToken"),
      },
      cachePolicy: "no-cache",
    }
  );

  const categoryGet = async () => {
    const categories = await get("/over/notarchived");
    if (response.ok) {
      let newCategoriesData = [];
      for (let cat of categories) {
        const subcategories = await get(`/sub/notarchived/${cat.id}`);
        if (response.ok) {
          newCategoriesData.push({ ...cat, subcategories });
        }
      }
      setCategories(newCategoriesData);
    }
  };

  const subcategoryPost = async (newSubcategory) => {
    await post("", newSubcategory);
    if (response.ok) {
      categoryGet();
    }
  };

  const categoryPost = async (name) => {
    await post("", { name: name });
    if (response.ok) {
      categoryGet();
    }
  };

  const categoryDelete = async (id) => {
    console.log(id);
    await del(`/${id}`);
    if (response.ok) {
      categoryGet();
    }
  };

  useEffect(() => {
    categoryGet();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="category-list">
      <div className="list-header">
        <h2>Expense</h2>
      </div>
      <CategoryPlus categories={categories} categoryPost={categoryPost} />
      {categories.map((cat, index) => (
        <CategoryExpenseCard
          key={cat.id}
          category={cat}
          color={colors[index % colors.length]}
          subcategoryPost={subcategoryPost}
          categoryDelete={categoryDelete}
        />
      ))}
    </div>
  );
};

export default CategoryExpenseList;
