import React from "react";

interface BlockCountProps {
  title: string;
  count: number;
}

const BlockCount: React.FC<BlockCountProps> = ({ title, count }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{count}</p>
    </div>
  );
};

export default BlockCount;
