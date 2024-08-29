import React from "react";

interface SummaryCardProps {
  title: string;
  value: string;
  description: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  description,
}) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default SummaryCard;
