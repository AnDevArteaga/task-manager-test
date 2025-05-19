import React from "react";

interface IndicatorCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export const IndicatorCard: React.FC<IndicatorCardProps> = ({ title, value, icon }) => {
  return (
    <div
      className="bg-white p-4 rounded-lg shadow border border-gray-100 dark:bg-gray-900 dark:border-gray-800"
      role="region"
      aria-label={`Indicador de ${title}`}
    >
      <div className="flex items-center mb-2 text-gray-600">
        <span aria-hidden="true">{icon}</span>
        <h3 className="ml-2 text-sm font-medium dark:text-white">{title}</h3>
      </div>
      <p className="text-xl font-semibold text-gray-800 dark:text-white" aria-live="polite">
        {value}
      </p>
    </div>
  );
};
