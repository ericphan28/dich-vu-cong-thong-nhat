'use client';

import { ReactNode } from 'react';

interface MobileTableProps {
  desktopTable: ReactNode;
  mobileCards: ReactNode;
  className?: string;
}

export function MobileTable({ desktopTable, mobileCards, className = "" }: MobileTableProps) {
  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        {desktopTable}
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-gray-200">
        {mobileCards}
      </div>
    </div>
  );
}

interface AdminHeaderProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function AdminHeader({ title, description, action }: AdminHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-1 lg:mb-2">{title}</h1>
          <p className="text-sm lg:text-base text-gray-600">{description}</p>
        </div>
        {action && (
          <div className="flex-shrink-0">
            {action}
          </div>
        )}
      </div>
    </div>
  );
}

interface AdminStatsProps {
  stats: Array<{
    label: string;
    value: string | number;
    icon: string;
    color: 'blue' | 'green' | 'purple' | 'red' | 'orange' | 'gray';
  }>;
}

export function AdminStats({ stats }: AdminStatsProps) {
  const colorClasses = {
    blue: 'text-blue-500',
    green: 'text-green-500', 
    purple: 'text-purple-500',
    red: 'text-red-500',
    orange: 'text-orange-500',
    gray: 'text-gray-500'
  };

  const valueColorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600', 
    red: 'text-red-600',
    orange: 'text-orange-600',
    gray: 'text-gray-900'
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs lg:text-sm font-medium text-gray-600">{stat.label}</p>
              <p className={`text-lg lg:text-2xl font-bold ${valueColorClasses[stat.color]}`}>
                {stat.value}
              </p>
            </div>
            <div className={`text-xl lg:text-2xl ${colorClasses[stat.color]}`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}