import React, { useState } from "react";
import useFetch from "use-http";

import CategoryCard from "./CategoryCard";
import CategoryPlus from "./CategoryPlus";

const CategoryList = ({ categories, categoryGet }) => {
  const [colors] = useState([
    "#F2BA22",
    "#DA4A4A",
    "#0066CC",
    "#00CCCC",
    "#0066CC",
    "#DA4A4A",
    "#F2BA22",
  ]);

  const { post, del, response } = useFetch(
    `https://webhomebudget.azurewebsites.net/api/category`,
    {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("userToken"),
      },
      cachePolicy: "no-cache",
    }
  );

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
    await del(`/${id}`);
    if (response.ok) {
      categoryGet();
    }
  };

  return (
    <div className="category-list">
      <CategoryPlus categories={categories} categoryPost={categoryPost} />
      {categories.map((cat, index) => (
        <CategoryCard
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

export default CategoryList;
