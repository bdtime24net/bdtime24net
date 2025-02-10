import React from "react";
import { useArticlesCount } from "@/hooks/article/useArticlesCount"; // আপনার হুকের পথে আপডেট করুন

const BlockCount: React.FC<{ title: string }> = ({ title }) => {
  const { count, loading, error } = useArticlesCount();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{`Error: ${error.message}`}</div>;

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{count}</p>
    </div>
  );
};

export default BlockCount;
