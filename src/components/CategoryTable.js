import React, { useEffect, useState } from "react";
import AddCategoryBlock from "./AddCategoryBlock";
import { Spinner } from "react-bootstrap";
import CategoryStack from "./CategoryStack";

const CategoryTable = () => {
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

  const deleteHandler = async (id) => {
    fetch(`https://webhomebudget.azurewebsites.net/api/category/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchCategories();
    });
  };

  // const postSubHandler = async (event) => {
  //   //event.preventDefault();

  //   fetch("https://webhomebudget.azurewebsites.net/api/category/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       name: textInput,
  //     }),
  //   })
  //     .then(() => {
  //       fetchCategories();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className="category-table">
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        categories.map((c) => {
          return (
            <CategoryStack
              key={c.id}
              category={c}
              categories={categories}
              setCategories={setCategories}
              deleteHandler={deleteHandler}
              fetchCategories={fetchCategories}
            />
          );
        })
      )}
      <AddCategoryBlock
        categories={categories}
        setCategories={setCategories}
        fetchCategories={fetchCategories}
      />
    </div>
  );
};

export default CategoryTable;
