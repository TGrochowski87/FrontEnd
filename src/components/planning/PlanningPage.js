import React, { useState, useEffect } from "react";
import useFetch from "use-http";

import PlanningNav from "./PlanningNav";

const PlanningPage = () => {
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
      setCategories(categories);
    }
  };

  useEffect(() => {
    categoryGet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PlanningNav categories={categories} />
      <h1>siema</h1>
    </>
  );
};

export default PlanningPage;
