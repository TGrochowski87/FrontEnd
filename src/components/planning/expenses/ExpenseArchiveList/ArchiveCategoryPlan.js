import React from "react";
import { Badge } from "react-bootstrap";

const ArchiveCategoryPlan = ({ plan }) => {
  return (
    <Badge pill className="archive">
      <p>{plan.category}</p>
      <p>{plan.price}</p>
    </Badge>
  );
};

export default ArchiveCategoryPlan;
