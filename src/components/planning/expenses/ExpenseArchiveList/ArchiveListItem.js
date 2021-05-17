import React from "react";
import ArchiveCategoryPlan from "./ArchiveCategoryPlan";

const ArchiveListItem = ({ categoryPlan }) => {
  return (
    <div className="planning-card">
      <div className="card-header archive">
        <h3>{categoryPlan.categoryName}</h3>
        <h3>{categoryPlan.summedPlans}</h3>
      </div>

      <div className="card-body">
        {categoryPlan.plannedSubcategories.map((planSub) => (
          <ArchiveCategoryPlan key={planSub.id} plan={planSub} />
        ))}
      </div>
    </div>
  );
};

export default ArchiveListItem;
