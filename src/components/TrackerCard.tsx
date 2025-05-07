import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  IconButton,
  LinearProgress,
  Divider,
  Tooltip,
  useTheme,
  Chip,
  Avatar,
  ButtonGroup,
  Button,
  Menu,
  MenuItem
} from '@mui/material';
import {
  Edit as EditIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Battery20 as LowBatteryIcon,
  Battery50 as MediumBatteryIcon,
  Battery80 as HighBatteryIcon,
  BatteryAlert as CriticalBatteryIcon,
  MoreVert as MoreVertIcon,
  PersonAdd as PersonAddIcon,
  ToggleOn as ToggleOnIcon,
  ToggleOff as ToggleOffIcon,
  Delete as DeleteIcon,
  Room as RoomIcon,
  CalendarToday as CalendarIcon,
  MyLocation as MyLocationIcon
} from '@mui/icons-material';
import StatusIndicator from './StatusIndicator';
import { Tracker } from '../types';
import { alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';

interface TrackerCardProps {
  tracker: Tracker;
  onEdit: () => void;
}

const TrackerCard: React.FC<TrackerCardProps> = ({ tracker, onEdit }) => {
  const theme = useTheme();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(menuAnchorEl);
  
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  
  const getBatteryIcon = () => {
    if (tracker.batteryLevel <= 15) return <CriticalBatteryIcon sx={{ color: theme.palette.error.main }} />;
    if (tracker.batteryLevel <= 30) return <LowBatteryIcon sx={{ color: theme.palette.error.main }} />;
    if (tracker.batteryLevel <= 70) return <MediumBatteryIcon sx={{ color: theme.palette.warning.main }} />;
    return <HighBatteryIcon sx={{ color: theme.palette.success.main }} />;
  };

  const getBatteryColor = () => {
    if (tracker.batteryLevel <= 15) return theme.palette.error.main;
    if (tracker.batteryLevel <= 30) return theme.palette.error.main;
    if (tracker.batteryLevel <= 70) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  const getFormattedLastPing = () => {
    if (!tracker.lastPing) return 'Never';
    
    const lastPingDate = new Date(tracker.lastPing);
    const now = new Date();
    const diffMs = now.getTime() - lastPingDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return diffMins === 0 ? 'Just now' : `${diffMins} min ago`;
    } else if (diffMins < 1440) {
      const hours = Math.floor(diffMins / 60);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return lastPingDate.toLocaleDateString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    }
  };

  const getStatusColor = () => {
    switch (tracker.status) {
      case 'active':
        return 'bg-gradient-to-r from-green-500 to-green-600';
      case 'inactive':
        return 'bg-gradient-to-r from-gray-400 to-gray-500';
      case 'warning':
        return 'bg-gradient-to-r from-amber-500 to-amber-600';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card 
        className="h-full rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden border border-gray-100"
        sx={{
          '&:hover': {
            transform: 'translateY(-5px)',
          }
        }}
      >
        {/* Status indicator top bar */}
        <div className={`w-full h-2 ${getStatusColor()}`}></div>
        
        <CardContent className="p-5">
          {/* Header with tracker name and actions */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-xl bg-lokatrack-50 flex items-center justify-center text-lokatrack-primary mr-3 shadow-sm">
                <LocationIcon />
              </div>
              <div>
                <Typography variant="h6" className="font-bold text-gray-800">
                  {tracker.name}
                </Typography>
                <Typography variant="body2" className="text-gray-500 flex items-center">
                  <span className="mr-1">ID:</span> 
                  <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">{tracker.deviceId}</code>
                </Typography>
              </div>
            </div>
            
            <div className="flex space-x-1">
              <Tooltip title="Edit Tracker">
                <IconButton 
                  onClick={onEdit}
                  className="text-white bg-lokatrack-primary hover:bg-lokatrack-dark"
                  size="small"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="More Options">
                <IconButton 
                  onClick={handleMenuClick}
                  className="text-gray-600 hover:bg-gray-100"
                  size="small"
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
            
            <Menu
              anchorEl={menuAnchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              PaperProps={{
                className: "mt-1 min-w-[180px] rounded-xl shadow-md"
              }}
            >
              <MenuItem onClick={handleMenuClose} className="flex items-center gap-2">
                <MyLocationIcon fontSize="small" className="text-lokatrack-primary" />
                <span>View Location</span>
              </MenuItem>
              
              <MenuItem onClick={handleMenuClose} className="flex items-center gap-2">
                {tracker.status === 'active' ? (
                  <>
                    <ToggleOffIcon fontSize="small" className="text-gray-600" />
                    <span>Deactivate</span>
                  </>
                ) : (
                  <>
                    <ToggleOnIcon fontSize="small" className="text-green-600" />
                    <span>Activate</span>
                  </>
                )}
              </MenuItem>
              
              <MenuItem onClick={handleMenuClose} className="flex items-center gap-2">
                <PersonAddIcon fontSize="small" className="text-blue-600" />
                <span>Assign Driver</span>
              </MenuItem>
              
              <Divider />
              
              <MenuItem onClick={handleMenuClose} className="flex items-center gap-2 text-red-600">
                <DeleteIcon fontSize="small" />
                <span>Delete</span>
              </MenuItem>
            </Menu>
          </div>
          
          {/* Status indicator */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <StatusIndicator status={tracker.status} withPulse={tracker.status === 'active'} />
            </div>
            
            <Chip 
              size="small"
              className="bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
              label={tracker.status === 'active' ? "View Live Data" : "View History"}
              onClick={() => {}}
              icon={<RoomIcon className={tracker.status === 'active' ? "text-green-600" : "text-gray-600"} />}
            />
          </div>
          
          <Divider className="my-4" />
          
          {/* Driver assignment */}
          <div className="mb-4">
            <Typography 
              variant="subtitle2" 
              className="text-gray-600 flex items-center gap-1 mb-2"
            >
              <PersonIcon fontSize="small" /> Driver Assignment
            </Typography>
            
            {tracker.assignedTo ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar 
                    className="w-8 h-8 bg-blue-100 text-blue-600 font-medium text-sm mr-2 border-2 border-white shadow-sm"
                  >
                    {tracker.assignedTo.driverName.charAt(0)}
                  </Avatar>
                  <div>
                    <Typography className="text-gray-800 font-medium text-sm">
                      {tracker.assignedTo.driverName}
                    </Typography>
                    <Typography className="text-gray-500 text-xs">
                      Driver ID: {tracker.assignedTo.driverId}
                    </Typography>
                  </div>
                </div>
                
                <Tooltip title="Change Driver">
                  <IconButton 
                    size="small" 
                    className="bg-gray-50 hover:bg-gray-100 text-gray-600"
                  >
                    <PersonAddIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500 italic">
                  Not assigned to any driver
                </div>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<PersonAddIcon />}
                  className="text-blue-600 border-blue-600 hover:bg-blue-50 rounded-lg text-xs py-1"
                >
                  Assign
                </Button>
              </div>
            )}
          </div>
          
          <Divider className="my-4" />
          
          {/* Battery status */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <Typography 
                variant="subtitle2" 
                className="text-gray-600 flex items-center gap-1"
              >
                {getBatteryIcon()} Battery Status
              </Typography>
              <Chip
                size="small"
                label={`${tracker.batteryLevel}%`}
                className={`font-medium ${
                  tracker.batteryLevel <= 15 
                    ? 'bg-red-100 text-red-700' 
                    : tracker.batteryLevel <= 30 
                    ? 'bg-amber-100 text-amber-700' 
                    : 'bg-green-100 text-green-700'
                }`}
              />
            </div>
            
            <LinearProgress 
              variant="determinate" 
              value={tracker.batteryLevel} 
              className="h-2 rounded-full bg-gray-100"
              sx={{
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getBatteryColor(),
                  borderRadius: '10px',
                }
              }}
            />
            
            <div className="mt-2 text-xs text-gray-500 flex justify-between">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
          
          <Divider className="my-4" />
          
          {/* Last ping */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1 text-gray-600">
              <CalendarIcon fontSize="small" />
              <Typography variant="subtitle2">
                Last Connection
              </Typography>
            </div>
            
            <Tooltip title={tracker.lastPing ? new Date(tracker.lastPing).toLocaleString() : 'Never connected'}>
              <Chip
                size="small"
                label={getFormattedLastPing()}
                className={`font-medium ${
                  !tracker.lastPing 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}
              />
            </Tooltip>
          </div>
          
          {/* Action buttons */}
          <div className="mt-6 flex space-x-2">
            <Button 
              variant="contained" 
              fullWidth
              size="small"
              className="bg-lokatrack-primary hover:bg-lokatrack-dark rounded-xl py-2 text-sm"
              startIcon={<MyLocationIcon />}
            >
              Track
            </Button>
            
            <Button 
              variant="outlined" 
              fullWidth
              size="small"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl py-2 text-sm"
              startIcon={<EditIcon />}
              onClick={onEdit}
            >
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TrackerCard;