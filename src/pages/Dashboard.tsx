import React, { useState, useEffect } from 'react';
import {
  Button,
  Tabs,
  Tab,
  useTheme,
  Divider,
  IconButton,
  Paper,
  Avatar,
  Tooltip,
  LinearProgress,
  CircularProgress,
  Box
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  LocalShipping as TruckIcon,
  People as PeopleIcon,
  LocationOn as LocationIcon,
  TrendingUp as TrendingUpIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  MoreVert as MoreVertIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
  ShowChart as ShowChartIcon,
  Speed as SpeedIcon,
  QueryStats as QueryStatsIcon,
  BatteryChargingFull as BatteryIcon,
  Route as RouteIcon,
  PlayArrow as PlayArrowIcon,
  AccessTime as AccessTimeIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  DirectionsRun as DirectionsRunIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import StatCard from '../components/StatCard';
import StatusIndicator from '../components/StatusIndicator';

// Import logo image
import logoImage from '../assets/images/lokatrack_logo_small.png';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className="pt-3">
          {children}
        </div>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Dashboard = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshAnimation, setRefreshAnimation] = useState(false);

  // Simulasi refresh data
  const handleRefreshData = () => {
    setRefreshAnimation(true);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setRefreshAnimation(false);
    }, 1200);
  };

  useEffect(() => {
    // Simulasi loading awal
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Mock data for recent deliveries
  const recentDeliveries = [
    {
      id: 'PKT-001-2025',
      recipientName: 'Ahmad Santoso',
      status: 'on_delivery',
      driver: {
        name: 'Budi Setiawan',
        avatar: '',
      },
      date: '2025-04-25T08:30:00',
      location: 'Jakarta Selatan',
    },
    {
      id: 'PKT-002-2025',
      recipientName: 'Siti Rahayu',
      status: 'checkout',
      driver: {
        name: 'Rudi Hermawan',
        avatar: '',
      },
      date: '2025-04-25T09:15:00',
      location: 'Jakarta Pusat',
    },
    {
      id: 'PKT-003-2025',
      recipientName: 'Dewi Lestari',
      status: 'on_delivery',
      driver: {
        name: 'Andi Pratama',
        avatar: '',
      },
      date: '2025-04-24T14:45:00',
      location: 'Jakarta Barat',
    },
    {
      id: 'PKT-004-2025',
      recipientName: 'Hendra Wijaya',
      status: 'checkin',
      driver: {
        name: 'Dimas Surya',
        avatar: '',
      },
      date: '2025-04-24T11:30:00',
      location: 'Jakarta Utara',
    },
    {
      id: 'PKT-005-2025',
      recipientName: 'Maya Indah',
      status: 'returned',
      driver: {
        name: 'Faisal Rahman',
        avatar: '',
      },
      date: '2025-04-23T16:20:00',
      location: 'Jakarta Timur',
    },
  ];

  // Mock data for trackers
  const trackerStatus = [
    {
      name: 'Alpha',
      status: 'active',
      lastPing: '2025-04-28T08:45:00',
      batteryLevel: 85,
      assignedDriver: 'Budi Setiawan',
    },
    {
      name: 'Beta',
      status: 'active',
      lastPing: '2025-04-28T09:15:00',
      batteryLevel: 75,
      assignedDriver: 'Rudi Hermawan',
    },
    {
      name: 'Gamma',
      status: 'inactive',
      lastPing: '2025-04-27T16:30:00',
      batteryLevel: 0,
      assignedDriver: 'Unassigned',
    },
    {
      name: 'Delta',
      status: 'active',
      lastPing: '2025-04-28T07:50:00',
      batteryLevel: 25,
      assignedDriver: 'Andi Pratama',
    },
    {
      name: 'Epsilon',
      status: 'warning',
      lastPing: '2025-04-28T08:10:00',
      batteryLevel: 15,
      assignedDriver: 'Dimas Surya',
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getBatteryColorClass = (level: number) => {
    if (level <= 15) return 'text-red-600 font-semibold';
    if (level <= 30) return 'text-amber-600 font-semibold';
    return 'text-green-600 font-semibold';
  };

  return (
    <div className="p-1">
      {/* Loading indicator for initial load and refresh */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full z-50">
          <LinearProgress 
            color="primary" 
            sx={{ height: 4, bgcolor: 'rgba(233, 246, 229, 0.5)' }} 
          />
        </div>
      )}
      
      {/* Header Section - Enhanced with gradient background and better typography */}
      <div className="relative mb-8 p-6 bg-gradient-to-r from-lokatrack-50 to-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-800 flex items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-lokatrack-dark to-lokatrack-primary">
                Good Morning, Admin
              </span>
              <div className="ml-3 w-2 h-2 rounded-full bg-lokatrack-primary animate-pulse"></div>
            </h1>
            <p className="text-gray-600 max-w-lg">
              Here's what's happening with your delivery operations today. Track and manage your deliveries efficiently.
            </p>
            <div className="flex items-center mt-3 text-sm text-lokatrack-primary">
              <AccessTimeIcon sx={{ fontSize: 18 }} className="mr-1" />
              <span>{new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <Button 
              variant="outlined" 
              color="primary"
              startIcon={<AddIcon />}
              className="px-4 py-2 rounded-xl border-2 border-lokatrack-primary text-lokatrack-primary font-semibold hover:bg-lokatrack-50"
            >
              New Delivery
            </Button>
            <Button 
              variant="contained" 
              startIcon={refreshAnimation ? <CircularProgress size={18} color="inherit" /> : <RefreshIcon />}
              onClick={handleRefreshData}
              disabled={refreshAnimation}
              className="px-5 py-2 rounded-xl bg-lokatrack-primary hover:bg-lokatrack-dark shadow-md hover:shadow-lg transition-all duration-300"
            >
              {refreshAnimation ? 'Refreshing...' : 'Refresh Data'}
            </Button>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute -right-12 -bottom-12 w-40 h-40 rounded-full bg-lokatrack-50/40 blur-sm"></div>
        <div className="absolute right-20 bottom-10 w-20 h-20 rounded-full bg-lokatrack-50/60 blur-sm"></div>
        <div className="absolute -left-8 -top-8 w-28 h-28 rounded-full bg-lokatrack-50/30 blur-md"></div>
      </div>

      {/* Stats Overview - Modernized with better card design, animations and hover effects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Packages Stat */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
          <div className="p-6 relative">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-gray-500 text-sm mb-1 font-medium">Total Packages</p>
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-lokatrack-primary transition-colors">358</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-200 transition-colors duration-300">
                <TruckIcon />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="inline-flex items-center text-green-600 font-medium">
                <ArrowUpIcon fontSize="small" className="mr-1" />
                12.5%
              </span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div>
            
            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-gray-500">Current Progress</span>
                <span className="font-medium text-indigo-600">78%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-indigo-500"></div>
        </div>

        {/* Active Deliveries Stat */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
          <div className="p-6 relative">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-gray-500 text-sm mb-1 font-medium">Active Deliveries</p>
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-lokatrack-primary transition-colors">42</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-200 transition-colors duration-300">
                <LocationIcon />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="inline-flex items-center text-green-600 font-medium">
                <ArrowUpIcon fontSize="small" className="mr-1" />
                8.2%
              </span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div>
            
            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-gray-500">Delivery Completion</span>
                <span className="font-medium text-green-600">65%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-green-500"></div>
        </div>

        {/* Active Trackers Stat */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
          <div className="p-6 relative">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-gray-500 text-sm mb-1 font-medium">Active Trackers</p>
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-lokatrack-primary transition-colors">18</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-lokatrack-100 flex items-center justify-center text-lokatrack-primary group-hover:bg-lokatrack-200 transition-colors duration-300">
                <TrendingUpIcon />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="inline-flex items-center text-red-600 font-medium">
                <ArrowDownIcon fontSize="small" className="mr-1" />
                5.0%
              </span>
              <span className="text-gray-500 ml-2">from last month</span>
            </div>
            
            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-gray-500">Online Rate</span>
                <span className="font-medium text-lokatrack-primary">90%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-lokatrack-primary rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-lokatrack-primary"></div>
        </div>

        {/* Total Drivers Stat */}
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
          <div className="p-6 relative">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-gray-500 text-sm mb-1 font-medium">Total Drivers</p>
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-lokatrack-primary transition-colors">24</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-200 transition-colors duration-300">
                <PeopleIcon />
              </div>
            </div>
            <div className="flex items-center text-sm">
              <span className="text-gray-500">No change from last month</span>
            </div>
            
            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-gray-500">Active Status</span>
                <span className="font-medium text-blue-600">96%</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
          </div>
          <div className="h-1 w-full bg-blue-500"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - spans 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Activity Card */}
          <div className="card-lokatrack p-0 overflow-hidden">
            <div className="px-6 pt-6 pb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                Delivery Activity
              </h2>
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                sx={{
                  '& .MuiTab-root': {
                    minWidth: 'auto',
                    px: 3,
                    py: 1.5,
                    mr: 1,
                    borderRadius: '0.5rem',
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    '&.Mui-selected': {
                      color: '#306424',
                      fontWeight: 600,
                    }
                  },
                  '& .MuiTabs-indicator': {
                    height: 3,
                    borderRadius: '2px 2px 0 0',
                    backgroundColor: '#306424'
                  }
                }}
              >
                <Tab label="All Deliveries" {...a11yProps(0)} />
                <Tab label="On Delivery" {...a11yProps(1)} />
                <Tab label="Check-in" {...a11yProps(2)} />
                <Tab label="Check-out" {...a11yProps(3)} />
              </Tabs>
            </div>
            
            <Divider />
            
            <TabPanel value={tabValue} index={0}>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="pl-6 pr-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Package ID
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recipient
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Driver
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentDeliveries.map((delivery) => (
                      <tr key={delivery.id} className="hover:bg-gray-50">
                        <td className="pl-6 pr-3 py-4 whitespace-nowrap text-sm font-medium text-lokatrack-primary">
                          {delivery.id}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                          {delivery.recipientName}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <StatusIndicator 
                            status={delivery.status} 
                            withPulse={delivery.status === 'on_delivery'} 
                            size="small" 
                          />
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-lokatrack-100 text-lokatrack-primary flex items-center justify-center">
                              {delivery.driver.name.charAt(0)}
                            </div>
                            <span className="ml-2 text-sm text-gray-700">
                              {delivery.driver.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                          {formatDate(delivery.date)}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                          {delivery.location}
                        </td>
                        <td className="px-3 py-4 whitespace-nowrap text-right">
                          <button
                            className="p-1.5 bg-lokatrack-50 text-lokatrack-primary rounded-full hover:bg-lokatrack-100 transition-colors"
                          >
                            <VisibilityIcon fontSize="small" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabPanel>
            
            <TabPanel value={tabValue} index={1}>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="pl-6 pr-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Package ID
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recipient
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Driver
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentDeliveries
                      .filter(delivery => delivery.status === 'on_delivery')
                      .map((delivery) => (
                        <tr key={delivery.id} className="hover:bg-gray-50">
                          <td className="pl-6 pr-3 py-4 whitespace-nowrap text-sm font-medium text-lokatrack-primary">
                            {delivery.id}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                            {delivery.recipientName}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-lokatrack-100 text-lokatrack-primary flex items-center justify-center">
                                {delivery.driver.name.charAt(0)}
                              </div>
                              <span className="ml-2 text-sm text-gray-700">
                                {delivery.driver.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                            {formatDate(delivery.date)}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                            {delivery.location}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-right">
                            <button
                              className="p-1.5 bg-lokatrack-50 text-lokatrack-primary rounded-full hover:bg-lokatrack-100 transition-colors"
                            >
                              <VisibilityIcon fontSize="small" />
                            </button>
                          </td>
                        </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </TabPanel>
            
            <TabPanel value={tabValue} index={2}>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="pl-6 pr-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Package ID
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recipient
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Driver
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentDeliveries
                      .filter(delivery => delivery.status === 'checkin')
                      .map((delivery) => (
                        <tr key={delivery.id} className="hover:bg-gray-50">
                          <td className="pl-6 pr-3 py-4 whitespace-nowrap text-sm font-medium text-lokatrack-primary">
                            {delivery.id}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                            {delivery.recipientName}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-lokatrack-100 text-lokatrack-primary flex items-center justify-center">
                                {delivery.driver.name.charAt(0)}
                              </div>
                              <span className="ml-2 text-sm text-gray-700">
                                {delivery.driver.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                            {formatDate(delivery.date)}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                            {delivery.location}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-right">
                            <button
                              className="p-1.5 bg-lokatrack-50 text-lokatrack-primary rounded-full hover:bg-lokatrack-100 transition-colors"
                            >
                              <VisibilityIcon fontSize="small" />
                            </button>
                          </td>
                        </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </TabPanel>
            
            <TabPanel value={tabValue} index={3}>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="pl-6 pr-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Package ID
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recipient
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Driver
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentDeliveries
                      .filter(delivery => delivery.status === 'checkout')
                      .map((delivery) => (
                        <tr key={delivery.id} className="hover:bg-gray-50">
                          <td className="pl-6 pr-3 py-4 whitespace-nowrap text-sm font-medium text-lokatrack-primary">
                            {delivery.id}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                            {delivery.recipientName}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-lokatrack-100 text-lokatrack-primary flex items-center justify-center">
                                {delivery.driver.name.charAt(0)}
                              </div>
                              <span className="ml-2 text-sm text-gray-700">
                                {delivery.driver.name}
                              </span>
                            </div>
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                            {formatDate(delivery.date)}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-700">
                            {delivery.location}
                          </td>
                          <td className="px-3 py-4 whitespace-nowrap text-right">
                            <button
                              className="p-1.5 bg-lokatrack-50 text-lokatrack-primary rounded-full hover:bg-lokatrack-100 transition-colors"
                            >
                              <VisibilityIcon fontSize="small" />
                            </button>
                          </td>
                        </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </TabPanel>
            
            <div className="p-4 text-center">
              <button className="btn-lokatrack-outline px-6">
                View All Deliveries
              </button>
            </div>
          </div>
          
          {/* Delivery Performance Card - Enhanced with better visualization */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <ShowChartIcon className="mr-2 text-lokatrack-primary" />
                    Delivery Performance
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Monthly performance metrics</p>
                </div>
                <div className="flex items-center space-x-2">
                  <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-lokatrack-primary">
                    <option>April 2025</option>
                    <option>March 2025</option>
                    <option>February 2025</option>
                  </select>
                  <Tooltip title="More options">
                    <IconButton size="small" className="text-gray-500 hover:bg-gray-100">
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="relative bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl text-center overflow-hidden">
                  <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-green-200/30 blur-md"></div>
                  <div className="absolute bottom-4 -left-4 w-16 h-16 rounded-full bg-green-200/40 blur-md"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4">
                      <CheckCircleOutlineIcon className="text-green-600 mr-2" />
                      <p className="text-green-700 font-medium">
                        On-time Deliveries
                      </p>
                    </div>
                    
                    <div className="relative w-28 h-28 mx-auto mb-3">
                      <CircularProgress
                        variant="determinate"
                        value={94.8}
                        size={112}
                        thickness={3}
                        sx={{
                          color: '#22c55e',
                          '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                          },
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-gray-800">94.8%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center text-xs text-green-600 font-medium">
                      <ArrowUpIcon fontSize="small" className="mr-1" />
                      3.2% from last month
                    </div>
                  </div>
                </div>
                
                <div className="relative bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl text-center overflow-hidden">
                  <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-red-200/30 blur-md"></div>
                  <div className="absolute bottom-4 -left-4 w-16 h-16 rounded-full bg-red-200/40 blur-md"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4">
                      <CloseIcon className="text-red-600 mr-2" />
                      <p className="text-red-700 font-medium">
                        Delayed Deliveries
                      </p>
                    </div>
                    
                    <div className="relative w-28 h-28 mx-auto mb-3">
                      <CircularProgress
                        variant="determinate"
                        value={5.2}
                        size={112}
                        thickness={3}
                        sx={{
                          color: '#ef4444',
                          '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                          },
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-gray-800">5.2%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center text-xs text-red-600 font-medium">
                      <ArrowDownIcon fontSize="small" className="mr-1" />
                      3.2% from last month
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center">
                  <DirectionsRunIcon className="mr-2 text-lokatrack-primary text-sm" />
                  Current Month Key Metrics
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border border-gray-200 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:border-lokatrack-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <TruckIcon fontSize="small" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Total Deliveries
                        </p>
                        <p className="text-xl font-bold mt-1 text-gray-800">
                          248
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:border-lokatrack-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                        <AccessTimeIcon fontSize="small" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Avg. Delivery Time
                        </p>
                        <p className="text-xl font-bold mt-1 text-gray-800">
                          2.5 days
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:border-lokatrack-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <RouteIcon fontSize="small" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Returns
                        </p>
                        <p className="text-xl font-bold mt-1 text-gray-800">
                          12 <span className="text-sm font-normal text-gray-500">(4.8%)</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {/* Tracker Status Card */}
          <div className="card-lokatrack overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Tracker Status
              </h2>
              <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                <MoreVertIcon />
              </button>
            </div>
            
            <Divider className="mb-4" />
            
            <div className="space-y-0">
              {trackerStatus.map((tracker, index) => (
                <React.Fragment key={tracker.name}>
                  <div className="py-3 flex justify-between items-center hover:bg-lokatrack-50/30 px-3 rounded-lg transition-colors duration-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lokatrack-100 to-lokatrack-200 text-lokatrack-primary flex items-center justify-center mr-3 shadow-sm">
                        {tracker.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          Tracker {tracker.name}
                        </p>
                        <div className="flex items-center mt-1">
                          <StatusIndicator 
                            status={tracker.status} 
                            size="small" 
                            withPulse={tracker.status === 'active'} 
                          />
                          <span className="ml-3 text-xs text-gray-500 flex items-center">
                            <BatteryIcon fontSize="small" className="mr-1" /> 
                            <span className={getBatteryColorClass(tracker.batteryLevel)}>
                              {tracker.batteryLevel}%
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-700 font-medium">
                        {tracker.assignedDriver}
                      </p>
                      <p className="text-xs text-gray-400 mt-1 flex items-center justify-end">
                        <AccessTimeIcon sx={{ fontSize: 12 }} className="mr-1" />
                        {formatDate(tracker.lastPing)}
                      </p>
                    </div>
                  </div>
                  {index < trackerStatus.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <button className="btn-lokatrack-outline px-6">
                View All Trackers
              </button>
            </div>
          </div>
          
          {/* Quick Actions Card - Enhanced with better UI/UX */}
          <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <PlayArrowIcon className="mr-2 text-lokatrack-primary" />
                    Quick Actions
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Commonly used operations</p>
                </div>
                <Tooltip title="More actions">
                  <IconButton size="small" className="text-gray-500 hover:bg-gray-100">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  className="bg-gradient-to-br from-lokatrack-primary to-lokatrack-dark text-white py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Add New Package
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<LocationIcon />}
                  className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Track Package
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<PeopleIcon />}
                  className="border-2 border-lokatrack-primary text-lokatrack-primary py-3 rounded-xl hover:bg-lokatrack-50 transition-all duration-300"
                >
                  Register Driver
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<SpeedIcon />}
                  className="border-2 border-blue-600 text-blue-600 py-3 rounded-xl hover:bg-blue-50 transition-all duration-300"
                >
                  Register Tracker
                </Button>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-semibold text-gray-700 flex items-center">
                    <QueryStatsIcon sx={{ fontSize: 18 }} className="mr-2 text-amber-500" />
                    System Alerts
                  </h3>
                  <span className="text-xs bg-amber-100 text-amber-800 font-medium px-2 py-1 rounded-full">2 New</span>
                </div>
                
                <div className="space-y-3">
                  <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100/70 border border-amber-200 rounded-xl overflow-hidden relative">
                    <div className="flex items-start">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600 mr-3">
                        <BatteryIcon />
                      </div>
                      <div>
                        <p className="font-medium text-amber-800 mb-1">Low Battery Alert</p>
                        <p className="text-sm text-amber-700">
                          Tracker Epsilon has low battery (15%). Please recharge soon.
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-2 justify-end space-x-2">
                      <button className="text-xs font-medium text-amber-800 hover:text-amber-700 bg-white px-3 py-1 rounded-lg shadow-sm hover:shadow flex items-center">
                        <span className="mr-1">Snooze</span>
                        <AccessTimeIcon sx={{ fontSize: 12 }} />
                      </button>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-amber-200/20 rounded-full -mt-10 -mr-10 blur-md"></div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-red-50 to-red-100/70 border border-red-200 rounded-xl overflow-hidden relative">
                    <div className="flex items-start">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-red-100 border border-red-200 flex items-center justify-center text-red-600 mr-3">
                        <RouteIcon />
                      </div>
                      <div>
                        <p className="font-medium text-red-800 mb-1">Offline Tracker</p>
                        <p className="text-sm text-red-700">
                          Tracker Gamma is offline. Last ping 16 hours ago.
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-2 justify-end space-x-2">
                      <button className="text-xs font-medium text-red-800 hover:text-red-700 bg-white px-3 py-1 rounded-lg shadow-sm hover:shadow flex items-center">
                        <span className="mr-1">Troubleshoot</span>
                        <TrendingUpIcon sx={{ fontSize: 12 }} />
                      </button>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-red-200/20 rounded-full -mt-10 -mr-10 blur-md"></div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <button className="w-full px-4 py-2.5 text-sm font-medium text-lokatrack-primary hover:text-lokatrack-dark hover:bg-lokatrack-50/50 rounded-xl transition-colors duration-300 flex items-center justify-center">
                  <RefreshIcon fontSize="small" className="mr-2" />
                  Check System Status
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;