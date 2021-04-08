import React, { useState } from "react";
import CategoryBlock from "./CategoryBlock";
import SubcategoryBlock from "./SubcategoryBlock";
import AddSubcategoryBlock from "./AddSubcategoryBlock";

const CategoryStack = ({
  category,
  categories,
  setCategories,
  deleteHandler,
  fetchCategories,
}) => {
  const [addActive, setAddActive] = useState(false);

  //const addSubcategory = () => {};

  return (
    <>
      <CategoryBlock
        key={category.id}
        category={category}
        categories={categories}
        deleteHandler={deleteHandler}
        setAddActive={setAddActive}
      />
      {category.subcategories.map((s) => {
        return (
          <SubcategoryBlock
            key={s.id}
            subcategory={s}
            deleteHandler={deleteHandler}
          />
        );
      })}
      {addActive ? (
        <AddSubcategoryBlock
          categories={categories}
          setCategories={setCategories}
          fetchCategories={fetchCategories}
          setAddActive={setAddActive}
          parentId={category.id}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default CategoryStack;
