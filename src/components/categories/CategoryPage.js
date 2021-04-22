import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import CategoryList from "./CategoryList";
import useFetch from "use-http";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  const { get, loading, response } = useFetch(
    `https://webhomebudget.azurewebsites.net/api/category`,
    {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("userToken"),
      },
      cachePolicy: "no-cache",
    }
  );

  const categoryGet = async () => {
    const categories = await get("/over");
    if (response.ok) {
      let newCategoriesData = [];
      for (let cat of categories) {
        const subcategories = await get(`/sub/${cat.id}`);
        if (response.ok) {
          newCategoriesData.push({ ...cat, subcategories });
        }
      }
      setCategories(newCategoriesData);
    }
  };

  useEffect(() => {
    categoryGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="category-page">
      {loading ? (
        <Spinner animation="border" variant="light" />
      ) : (
        <CategoryList categories={categories} categoryGet={categoryGet} />
      )}
    </div>
  );
};

export default CategoryPage;
