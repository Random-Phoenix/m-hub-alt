import React from 'react';

interface SpecTableProps {
  title: string;
  specs: Record<string, string>;
}

export const SpecTable: React.FC<SpecTableProps> = ({ title, specs }) => (
  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
    <div className="px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-blue-50 to-transparent border-b border-gray-100">
      <h3 className="font-semibold text-[13px] sm:text-sm text-gray-900">{title}</h3>
    </div>
    <div className="divide-y divide-gray-100">
      {Object.entries(specs).map(([key, value]) => (
        <div key={key} className="px-3 py-2.5 sm:px-4 sm:py-3.5 flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-0">
          <span className="text-xs sm:text-sm text-gray-500 sm:w-1/3">{key}</span>
          <span className="text-xs sm:text-sm text-gray-900 font-medium flex-1">{value}</span>
        </div>
      ))}
    </div>
  </div>
);