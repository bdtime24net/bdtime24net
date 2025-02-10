import React from "react";
import { useCategoryCount } from "@/hooks/article/useCategoryCount"; // Update path as needed

const CategoryCount: React.FC = () => {
  const { categoryCount, loading, error } = useCategoryCount();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error: ${error.message}`}</div>;

  return (
    <div>
      <h3 className="text-lg font-semibold">Total Categories: {categoryCount}</h3>
    </div>
  );
};

export default CategoryCount;
