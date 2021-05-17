import React from "react";
import CategoryPlan from "./CategoryPlan";

const PlanningListItem = ({ categoryPlan, editPlan }) => {
  return (
    <div className="planning-card">
      <div className="card-header">
        <h3>{categoryPlan.categoryName}</h3>
        <h3>{categoryPlan.summedPlans}</h3>
      </div>

      <div className="card-body">
        {categoryPlan.plannedSubcategories.map((planSub) => (
          <CategoryPlan key={planSub.id} plan={planSub} editPlan={editPlan} />
        ))}
      </div>
    </div>
  );
};

export default PlanningListItem;
