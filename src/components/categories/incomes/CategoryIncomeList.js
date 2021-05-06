import React, { useState, useEffect } from "react";
import useFetch from "use-http";

import CategoryIncomeCard from "./CategoryIncomeCard";
import CategoryPlus from "../CategoryPlus";

const CategoryIncomeList = () => {
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
    `https://webhomebudget.azurewebsites.net/api/category/incomes`,
    {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("userToken"),
      },
      cachePolicy: "no-cache",
    }
  );

  const categoryGet = async () => {
    const categories = await get("/notarchived");
    if (response.ok) {
      console.log(categories);
      setCategories(categories);
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
        <h2>Incomes</h2>
      </div>
      <CategoryPlus categories={categories} categoryPost={categoryPost} />
      {categories.map((cat, index) => (
        <CategoryIncomeCard
          key={cat.id}
          category={cat}
          color={colors[index % colors.length]}
          categoryDelete={categoryDelete}
        />
      ))}
    </div>
  );
};

export default CategoryIncomeList;
