import React from "react";
import { useTagCount } from "@/hooks/article/getTagCount"; // Update path as needed



const TagCount: React.FC = () => {
    const { tagCount, loading, error } = useTagCount();
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>{`Error: ${error.message}`}</div>;
  
    return (
      <div>
        <h3 className="text-lg font-semibold">Total Tags: {tagCount}</h3>
      </div>
    );
  };
  
  export default TagCount;