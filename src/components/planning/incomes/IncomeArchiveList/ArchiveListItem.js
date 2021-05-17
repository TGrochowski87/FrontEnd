import React from "react";

const ArchiveListItem = ({ categoryPlan }) => {
  return (
    <div className="planning-card">
      <div className="card-header archive">
        <h3>{categoryPlan.category}</h3>
        <h3>{categoryPlan.price}</h3>
      </div>

      <div className="card-body"></div>
    </div>
  );
};

export default ArchiveListItem;
