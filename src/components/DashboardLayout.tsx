import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Drawer,
  AppBar,
  Toolbar,
  Divider,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Badge,
  InputBase,
  Backdrop,
  CircularProgress,
  Tooltip as MuiTooltip,
  Avatar,
  Box,
  Typography,
  Button,
  Collapse,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Dashboard as DashboardIcon,
  LocalShipping as LocalShippingIcon,
  LocationOn as LocationOnIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
  Notifications as NotificationsIcon,
  Search as SearchIcon,
  Help as HelpIcon,
  Tune as TuneIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
  LiveTv as LiveTvIcon,
  Analytics as AnalyticsIcon,
  Construction as ConstructionIcon,
  ReportProblem as ReportProblemIcon,
  Close as CloseIcon,
  BusinessCenter as BusinessCenterIcon,
  MapOutlined
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Import the LokaTrack logo
import logoImage from '../assets/images/lokatrack_logo_small.png';

const drawerWidth = 280;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();

  useEffect(() => {
    // Set loading state whenever location changes (simulates page transition)
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Close drawer on mobile view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check on initial render
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseNotifications = () => {
    setNotificationAnchorEl(null);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Package Tracking', icon: <LocalShippingIcon />, path: '/packages' },
    { text: 'Live Tracking', icon: <LocationOnIcon />, path: '/tracking' },
    { text: 'Tracker Management', icon: <MapOutlined />, path: '/trackers' },
    { text: 'Drivers', icon: <PeopleIcon />, path: '/drivers' },
  ];

  const notifications = [
    { id: 1, title: 'New Package', message: 'Package PKT-007-2025 has been added', time: '10 minutes ago' },
    { id: 2, title: 'Delivery Update', message: 'Budi Santoso completed a delivery', time: '25 minutes ago' },
    { id: 3, title: 'System Alert', message: 'Tracker Epsilon has low battery', time: '1 hour ago' },
  ];

  // Background decoration circles for the sidebar
  const decorationCircles = [
    { size: 'w-32 h-32', top: 'top-[20%]', left: 'left-[-10%]' },
    { size: 'w-24 h-24', top: 'top-[60%]', left: 'left-[70%]' },
    { size: 'w-16 h-16', top: 'top-[40%]', left: 'left-[20%]' },
    { size: 'w-12 h-12', top: 'top-[80%]', left: 'left-[10%]' },
  ];

  return (
    <div className="min-h-screen bg-lokatrack-50/50">
      {/* AppBar - Changed to lighter green background for better contrast */}
      <AppBar 
        position="fixed" 
        className={`bg-green-50 transition-all duration-300 ease-in-out border-b border-green-100 shadow-sm
          ${open ? `lg:ml-[${drawerWidth}px] lg:w-[calc(100%-${drawerWidth}px)]` : 'w-full'}`}
        sx={{ 
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
          borderRadius: '0 0 12px 12px' 
        }}
      >
        <Toolbar className="flex items-center">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={`mr-2 text-white bg-green-400 hover:bg-green-500 ${open ? 'hidden lg:hidden' : 'block'}`}
          >
            <MenuIcon />
          </IconButton>
          
          <div className="flex items-center mr-4 hidden sm:flex">
            <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center p-1 mr-3">
              <img src={logoImage} alt="LokaTrack Logo" className="w-7 h-7 object-contain" />
            </div>
            <h6 className="text-xl font-bold">
              <span className="text-white">Loka</span><span className="text-white">Track</span>
            </h6>
          </div>
          
          {/* Search Bar - Improved contrast */}
          <div className="relative ml-3 mr-2 bg-gray-100 rounded-full hover:bg-gray-200/80 transition-all border border-gray-200">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="text-gray-500" />
            </div>
            <InputBase
              placeholder="Search anything..."
              inputProps={{ 'aria-label': 'search' }}
              className="py-2 pl-10 pr-4 text-gray-800 w-full focus:outline-none"
              sx={{
                width: {
                  xs: '100%',
                  sm: '20ch',
                  md: '30ch',
                },
                '&:focus-within': {
                  width: {
                    md: '40ch',
                  }
                }
              }}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
              <MuiTooltip title="Advanced filters">
                <IconButton size="small" className="text-gray-600">
                  <TuneIcon fontSize="small" />
                </IconButton>
              </MuiTooltip>
            </div>
          </div>
          
          <div className="flex-grow" />
          
          <div className="flex items-center gap-1">
            {/* Help Button - Improved visibility */}
            <MuiTooltip title="Help & Documentation">
              <IconButton
                size="large"
                color="inherit"
                className="w-10 h-10 text-gray-700 hover:bg-gray-100"
              >
                <HelpIcon />
              </IconButton>
            </MuiTooltip>
            
            {/* Notifications - Improved visibility */}
            <MuiTooltip title="Notifications">
              <IconButton
                size="large"
                aria-label="show new notifications"
                aria-controls="menu-notifications"
                aria-haspopup="true"
                onClick={handleNotificationsMenu}
                color="inherit"
                className="w-10 h-10 text-gray-700 hover:bg-gray-100 ml-1"
              >
                <Badge badgeContent={3} color="error" className="animate-pulse">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </MuiTooltip>
            
            {/* User Menu - Enhanced */}
            <MuiTooltip title="Account">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                className="ml-1"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lokatrack-primary to-lokatrack-600 flex items-center justify-center shadow-sm border-2 border-white">
                  <AccountCircleIcon className="text-white" />
                </div>
              </IconButton>
            </MuiTooltip>
          </div>
          
          {/* User Dropdown Menu */}
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              className: "mt-2 min-w-[240px] rounded-xl shadow-card"
            }}
          >
            <div className="px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lokatrack-primary to-lokatrack-600 flex items-center justify-center text-white shadow-md">
                  <AccountCircleIcon />
                </div>
                <div>
                  <h6 className="text-base font-bold">Admin User</h6>
                  <p className="text-sm text-gray-600">admin@lokatrack.id</p>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-gray-100">
                <span className="text-xs font-medium text-gray-500">System Administrator</span>
              </div>
            </div>
            <Divider />
            <div className="py-1">
              <MenuItem onClick={handleClose} className="py-2 px-4 flex items-center gap-3 hover:bg-lokatrack-50">
                <div className="w-8 h-8 rounded-full bg-lokatrack-50 flex items-center justify-center text-lokatrack-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>My Profile</span>
              </MenuItem>
              <MenuItem onClick={handleClose} className="py-2 px-4 flex items-center gap-3 hover:bg-lokatrack-50">
                <div className="w-8 h-8 rounded-full bg-lokatrack-50 flex items-center justify-center text-lokatrack-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Settings</span>
              </MenuItem>
            </div>
            <Divider />
            <MenuItem onClick={handleClose} className="py-2 px-4 flex items-center gap-3 text-red-600 hover:bg-red-50">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <LogoutIcon fontSize="small" />
              </div>
              <span>Logout</span>
            </MenuItem>
          </Menu>
          
          {/* Notifications Dropdown */}
          <Menu
            id="menu-notifications"
            anchorEl={notificationAnchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(notificationAnchorEl)}
            onClose={handleCloseNotifications}
            PaperProps={{
              className: "mt-2 min-w-[360px] max-w-[360px] rounded-xl shadow-card"
            }}
          >
            <div className="p-4 flex justify-between items-center">
              <h6 className="text-lg font-bold">Notifications</h6>
              <button className="text-xs text-lokatrack-primary hover:text-lokatrack-600 font-medium">
                Mark all as read
              </button>
            </div>
            <Divider />
            
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.map((notification, index) => (
                <div 
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 hover:bg-lokatrack-50/50 transition-colors ${notification.id === 1 ? 'bg-lokatrack-50/30' : ''}`}
                >
                  <div className="flex">
                    <div className={`w-10 h-10 rounded-full mr-3 flex-shrink-0 flex items-center justify-center
                      ${index === 0 ? 'bg-blue-100 text-blue-600' : 
                        index === 1 ? 'bg-green-100 text-green-600' : 
                        'bg-amber-100 text-amber-600'}`}

                    >
                      {index === 0 && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2v5a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1V8h-2V5a1 1 0 00-1-1H3z" />
                        </svg>
                      )}
                      {index === 1 && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      {index === 2 && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-gray-900">{notification.title}</span>
                        <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{notification.time}</span>
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-3 text-center bg-gray-50">
              <button className="text-sm text-lokatrack-primary hover:text-lokatrack-600 font-medium">
                View All Notifications
              </button>
            </div>
          </Menu>
        </Toolbar>
      </AppBar>
      
      {/* Sidebar Drawer - Improved border radius and width */}
      <Drawer
        variant={window.innerWidth >= 1024 ? "persistent" : "temporary"}
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: 'none',
            backgroundColor: '#FFFFFF',
            backgroundImage: 'linear-gradient(135deg, rgba(233, 246, 229, 0.8) 0%, rgba(255, 255, 255, 0.9) 50%, rgba(233, 246, 229, 0.7) 100%)',
            borderRadius: '0 12px 12px 0',
            overflowX: 'hidden'
          },
        }}
        className="shadow-md"
      >
        {/* Drawer Header with Logo */}
        <div className="flex justify-between items-center p-5 relative">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-white shadow-md flex items-center justify-center p-1">
              <img src={logoImage} alt="LokaTrack Logo" className="w-9 h-9 object-contain" />
            </div>
            <div>
              <h6 className="text-lokatrack-primary text-xl font-bold">
                LokaTrack
              </h6>
              <p className="text-xs text-gray-500">Executive Dashboard</p>
            </div>
          </div>
          <IconButton 
            onClick={handleDrawerClose} 
            className="text-lokatrack-primary bg-white hover:bg-lokatrack-50 shadow-sm"
            size="small"
          >
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          
          {/* Background decoration circles */}
          {decorationCircles.map((circle, index) => (
            <div 
              key={index}
              className={`absolute ${circle.size} ${circle.top} ${circle.left} bg-lokatrack-primary/5 rounded-full -z-10 animate-pulse-slow`}
              style={{ animationDelay: `${index * 0.5}s` }}
            />
          ))}
        </div>
        
        <Divider />
        
        {/* Main Navigation */}
        <div className="p-5 relative">
          <h6 className="px-3 mb-3 text-xs uppercase text-gray-500 font-medium tracking-wider">
            Main Navigation
          </h6>
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.text} 
                  to={item.path} 
                  className={`flex items-center gap-3 p-3 rounded-xl w-full transition-all duration-300 group
                    ${isActive 
                      ? 'bg-lokatrack-primary text-white font-medium shadow-md' 
                      : 'text-gray-700 hover:bg-white hover:shadow-sm'
                    }`}
                >
                  <span className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300
                    ${isActive 
                      ? 'bg-white/20' 
                      : 'bg-lokatrack-50 text-lokatrack-primary group-hover:bg-lokatrack-100'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.text}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        
        <Divider className="mx-5 bg-lokatrack-200/30" />
        
        {/* System Menu */}
        <div className="p-5 relative mt-auto">
          <h6 className="px-3 mb-3 text-xs uppercase text-gray-500 font-medium tracking-wider">
            System
          </h6>
          <nav className="space-y-1.5">
            <button className="flex items-center gap-3 p-3 rounded-xl w-full text-gray-700 hover:bg-white hover:shadow-sm transition-all duration-300 group">
              <span className="w-9 h-9 rounded-full bg-lokatrack-50 text-lokatrack-primary flex items-center justify-center group-hover:bg-lokatrack-100">
                <SettingsIcon />
              </span>
              <span>Settings</span>
            </button>
            <button className="flex items-center gap-3 p-3 rounded-xl w-full text-gray-700 hover:bg-white hover:shadow-sm transition-all duration-300 group">
              <span className="w-9 h-9 rounded-full bg-lokatrack-50 text-lokatrack-primary flex items-center justify-center group-hover:bg-lokatrack-100">
                <HelpIcon />
              </span>
              <span>Help & Support</span>
            </button>
          </nav>
        </div>
        
        <Divider className="mx-5 bg-lokatrack-200/30" />
        
        {/* User Profile */}
        <div className="p-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lokatrack-primary to-lokatrack-600 flex items-center justify-center text-white shadow-md">
            <AccountCircleIcon />
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-500">
              System Administrator
            </p>
          </div>
          <button className="ml-auto bg-white hover:bg-lokatrack-50 text-lokatrack-primary hover:text-lokatrack-600 rounded-full w-8 h-8 flex items-center justify-center shadow-sm transition-all">
            <LogoutIcon fontSize="small" />
          </button>
        </div>
      </Drawer>
      
      {/* Main Content */}
      <main className={`transition-all duration-300 pt-16 lg:pt-20 pb-8 px-4 sm:px-6 lg:px-8 relative
        ${open ? 'lg:ml-[280px]' : 'ml-0'}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="page-transition-enter-active">
            {children}
          </div>
        </div>
        
        {/* Background decoration elements for the main content - enhanced with more elements */}
        <div className="fixed top-[5%] right-[8%] w-48 h-48 rounded-full bg-gradient-to-br from-lokatrack-primary/5 to-lokatrack-100/20 blur-xl -z-10" />
        <div className="fixed bottom-[8%] left-[5%] w-64 h-64 rounded-full bg-gradient-to-tr from-lokatrack-primary/10 to-lokatrack-50/20 blur-xl -z-10" />
        <div className="fixed top-[40%] left-[15%] w-24 h-24 rounded-full bg-lokatrack-200/20 blur-sm -z-10 animate-pulse-slow" />
        <div className="fixed bottom-[30%] right-[10%] w-20 h-20 rounded-full bg-lokatrack-100/30 blur-sm -z-10 animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </main>

      {/* Loading backdrop for page transitions - enhanced with LokaTrack branding */}
      <Backdrop
        sx={{ 
          color: '#306424', 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)'
        }}
        open={loading}
      >
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 mb-3 relative">
            <CircularProgress color="inherit" size={70} thickness={4} />
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={logoImage} alt="LokaTrack Logo" className="w-10 h-10 object-contain" />
            </div>
          </div>
          <p className="mt-4 text-lokatrack-primary font-medium text-lg">Loading LokaTrack...</p>
        </div>
      </Backdrop>
    </div>
  );
}