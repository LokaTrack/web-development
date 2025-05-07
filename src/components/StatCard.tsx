import React from 'react';
import { Tooltip, useTheme } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface TrendProps {
  value: number;
  isPositive: boolean;
}

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string; 
  trend?: TrendProps;
  description?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  color,
  trend,
  description
}) => {
  const theme = useTheme();

  return (
    <div className="card-lokatrack h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lokatrack-hover">
      <div className="p-5">
        <div className="flex items-start space-x-4">
          <div 
            className="flex items-center justify-center w-16 h-16 rounded-xl animate-pulse-slow"
            style={{ backgroundColor: `${color}15`, color: color }}
          >
            {icon}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="text-gray-600 font-medium text-sm">
                {title}
              </h3>
              
              {description && (
                <Tooltip title={description} arrow placement="top">
                  <InfoOutlinedIcon 
                    className="ml-2 text-gray-400 cursor-help"
                    fontSize="small"
                  />
                </Tooltip>
              )}
            </div>
            
            <div className="flex items-baseline mt-2">
              <span className="text-2xl font-bold text-gray-800">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </span>
              
              {trend && (
                <div
                  className={`flex items-center ml-3 px-2 py-1 rounded-md text-xs font-semibold
                    ${trend.isPositive 
                      ? 'bg-green-50 text-green-600' 
                      : 'bg-red-50 text-red-600'
                    }`}
                >
                  {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;