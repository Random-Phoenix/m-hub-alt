import React from 'react';

interface SpecCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
}

export const SpecCard: React.FC<SpecCardProps> = ({ icon: Icon, title, value }) => (
  <div className="bg-white p-3 sm:p-4 rounded-xl border border-gray-100">
    <div className="flex items-start gap-2 sm:gap-3">
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
      </div>
      <div>
        <h3 className="text-xs sm:text-sm font-medium text-gray-500 mb-0.5 sm:mb-1">{title}</h3>
        <p className="text-xs sm:text-sm font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);