import React from 'react';
import { Tooltip, Typography } from '@mui/material';
import {
  CheckCircleOutline as ActiveIcon,
  ErrorOutline as WarningIcon,
  Cancel as ErrorIcon,
  HourglassEmpty as InactiveIcon,
  LocalShipping as DeliveryIcon,
  Assignment as CheckInIcon,
  AssignmentTurnedIn as CheckOutIcon,
  AssignmentReturn as ReturnedIcon
} from '@mui/icons-material';

interface StatusIndicatorProps {
  status: 'active' | 'inactive' | 'warning' | 'error' | string;
  withLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
  withPulse?: boolean;
}

const getStatusInfo = (status: string) => {
  const statusMap: Record<string, { 
    color: string; 
    bgColor: string; 
    lightBgColor: string;
    label: string; 
    description: string;
    icon: React.ReactNode;
    gradientClass: string;
  }> = {
    active: { 
      color: 'text-green-600', 
      bgColor: 'bg-green-500',
      lightBgColor: 'bg-green-100',
      label: 'Active', 
      description: 'This item is currently active and operating normally.',
      icon: <ActiveIcon fontSize="small" className="text-green-600" />,
      gradientClass: 'from-green-500 to-green-600'
    },
    inactive: { 
      color: 'text-gray-600', 
      bgColor: 'bg-gray-500',
      lightBgColor: 'bg-gray-100',
      label: 'Inactive', 
      description: 'This item is currently inactive or disabled.',
      icon: <InactiveIcon fontSize="small" className="text-gray-600" />,
      gradientClass: 'from-gray-500 to-gray-600'
    },
    warning: { 
      color: 'text-amber-600', 
      bgColor: 'bg-amber-500',
      lightBgColor: 'bg-amber-100',
      label: 'Warning', 
      description: 'There are some issues that require attention.',
      icon: <WarningIcon fontSize="small" className="text-amber-600" />,
      gradientClass: 'from-amber-500 to-amber-600'
    },
    error: { 
      color: 'text-red-600', 
      bgColor: 'bg-red-500',
      lightBgColor: 'bg-red-100',
      label: 'Error', 
      description: 'There are critical issues that need immediate attention.',
      icon: <ErrorIcon fontSize="small" className="text-red-600" />,
      gradientClass: 'from-red-500 to-red-600'
    },
    'on-delivery': { 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-500',
      lightBgColor: 'bg-blue-100',
      label: 'On Delivery', 
      description: 'This package is currently being delivered.',
      icon: <DeliveryIcon fontSize="small" className="text-blue-600" />,
      gradientClass: 'from-blue-500 to-blue-600'
    },
    checkin: { 
      color: 'text-amber-600', 
      bgColor: 'bg-amber-500',
      lightBgColor: 'bg-amber-100',
      label: 'Check-in', 
      description: 'This package has been checked in for delivery.',
      icon: <CheckInIcon fontSize="small" className="text-amber-600" />,
      gradientClass: 'from-amber-500 to-amber-600'
    },
    checkout: { 
      color: 'text-green-600', 
      bgColor: 'bg-green-500',
      lightBgColor: 'bg-green-100',
      label: 'Check-out', 
      description: 'This package has been checked out for delivery.',
      icon: <CheckOutIcon fontSize="small" className="text-green-600" />,
      gradientClass: 'from-green-500 to-green-600'
    },
    returned: { 
      color: 'text-red-600', 
      bgColor: 'bg-red-500',
      lightBgColor: 'bg-red-100',
      label: 'Returned', 
      description: 'This package has been returned to sender.',
      icon: <ReturnedIcon fontSize="small" className="text-red-600" />,
      gradientClass: 'from-red-500 to-red-600'
    },
  };

  // Handle package statuses
  if (status === 'on_delivery') return statusMap['on-delivery'];
  if (status === 'checkout') return statusMap['checkout'];
  if (status === 'checkin') return statusMap['checkin'];
  if (status === 'returned') return statusMap['returned'];

  // Default or unknown status
  return statusMap[status.toLowerCase()] || { 
    color: 'text-gray-400', 
    bgColor: 'bg-gray-400',
    lightBgColor: 'bg-gray-100',
    label: status.charAt(0).toUpperCase() + status.slice(1), 
    description: 'Status information',
    icon: <InactiveIcon fontSize="small" className="text-gray-400" />,
    gradientClass: 'from-gray-400 to-gray-500'
  };
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status, 
  withLabel = true, 
  size = 'medium',
  withPulse = false
}) => {
  const { color, bgColor, lightBgColor, label, description, icon, gradientClass } = getStatusInfo(status);
  
  // Apply pulsing animation only to active statuses
  const isActive = status.toLowerCase() === 'active' || status.toLowerCase() === 'on_delivery';
  const shouldPulse = withPulse && isActive;
  
  // Determine styles based on size
  const getSizeStyles = () => {
    switch(size) {
      case 'small':
        return {
          chipPadding: 'py-0.5 px-1.5',
          textSize: 'text-xs',
          dotSize: 'w-1.5 h-1.5',
          iconSize: '14px'
        };
      case 'large':
        return {
          chipPadding: 'py-1.5 px-3',
          textSize: 'text-sm',
          dotSize: 'w-3 h-3',
          iconSize: '20px'
        };
      default: // medium
        return {
          chipPadding: 'py-1 px-2',
          textSize: 'text-xs',
          dotSize: 'w-2 h-2',
          iconSize: '16px'
        };
    }
  };
  
  const { chipPadding, textSize, dotSize, iconSize } = getSizeStyles();

  if (withLabel) {
    return (
      <Tooltip title={description} arrow placement="top">
        <div className={`
          inline-flex items-center gap-1.5 ${lightBgColor} ${color} ${textSize} font-semibold 
          ${chipPadding} rounded-full shadow-sm border border-${color.split('-')[1]}-200
          hover:shadow-md transition-shadow duration-300
        `}>
          {shouldPulse ? (
            <div className="relative flex-shrink-0">
              <div className={`${dotSize} bg-gradient-to-r ${gradientClass} rounded-full`}></div>
              <div className={`absolute inset-0 bg-gradient-to-r ${gradientClass} rounded-full animate-ping opacity-75`}></div>
            </div>
          ) : (
            <span style={{ fontSize: iconSize }}>{icon}</span>
          )}
          <span>{label}</span>
        </div>
      </Tooltip>
    );
  }

  // Without label - just the dot
  return (
    <Tooltip title={`${label}: ${description}`} arrow placement="top">
      <div className="relative inline-block flex-shrink-0">
        <div className={`${dotSize} bg-gradient-to-r ${gradientClass} rounded-full shadow-sm`}></div>
        {shouldPulse && (
          <div className={`absolute inset-0 bg-gradient-to-r ${gradientClass} rounded-full opacity-75 animate-ping`}></div>
        )}
      </div>
    </Tooltip>
  );
};

export default StatusIndicator;