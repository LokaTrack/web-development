import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  LinearProgress,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Snackbar,
  Alert,
  Avatar,
  Chip,
  Tooltip,
  CircularProgress,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  BatteryChargingFull as BatteryFullIcon,
  BatteryAlert as BatteryAlertIcon,
  SignalCellularAlt as SignalIcon,
  SignalCellularConnectedNoInternet0Bar as NoSignalIcon,
  PersonAdd as PersonAddIcon,
  Check as CheckIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Tune as TuneIcon,
  MoreVert as MoreVertIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
  Download as DownloadIcon,
  SwitchAccessShortcut as SwitchIcon,
  Close as CloseIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { mockTrackers, mockDrivers } from '../utils/mockData';
import TrackerCard from '../components/TrackerCard';
import { Tracker } from '../types';
import { motion } from 'framer-motion';

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
      id={`tracker-tabpanel-${index}`}
      aria-labelledby={`tracker-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tracker-tab-${index}`,
    'aria-controls': `tracker-tabpanel-${index}`,
  };
}

const Trackers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [trackers, setTrackers] = useState<Tracker[]>([]);
  const [filteredTrackers, setFilteredTrackers] = useState<Tracker[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTracker, setEditingTracker] = useState<Tracker | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Form state
  const [formValues, setFormValues] = useState({
    name: '',
    deviceId: '',
    assignedDriverId: '',
    batteryLevel: 100,
    status: 'active' as 'active' | 'inactive'
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    deviceId: '',
  });

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setTrackers(mockTrackers);
      setFilteredTrackers(mockTrackers);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter trackers based on tab and search term
    let filtered = [...trackers];
    
    // Apply tab filter
    if (tabValue === 1) { // Active
      filtered = filtered.filter(tracker => tracker.status === 'active');
    } else if (tabValue === 2) { // Inactive
      filtered = filtered.filter(tracker => tracker.status === 'inactive');
    } else if (tabValue === 3) { // Unassigned
      filtered = filtered.filter(tracker => !tracker.assignedTo);
    }
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(tracker => 
        tracker.name.toLowerCase().includes(term) || 
        tracker.deviceId.toLowerCase().includes(term) ||
        (tracker.assignedTo && tracker.assignedTo.driverName.toLowerCase().includes(term))
      );
    }
    
    setFilteredTrackers(filtered);
  }, [tabValue, searchTerm, trackers]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenDialog = (tracker?: Tracker) => {
    if (tracker) {
      // Edit mode
      setEditingTracker(tracker);
      setFormValues({
        name: tracker.name,
        deviceId: tracker.deviceId,
        assignedDriverId: tracker.assignedTo?.driverId || '',
        batteryLevel: tracker.batteryLevel,
        status: tracker.status
      });
    } else {
      // Create mode
      setEditingTracker(null);
      setFormValues({
        name: '',
        deviceId: '',
        assignedDriverId: '',
        batteryLevel: 100,
        status: 'active'
      });
    }
    setFormErrors({ name: '', deviceId: '' });
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const validateForm = () => {
    const errors = {
      name: '',
      deviceId: ''
    };
    let isValid = true;

    if (!formValues.name.trim()) {
      errors.name = 'Tracker name is required';
      isValid = false;
    }

    if (!formValues.deviceId.trim()) {
      errors.deviceId = 'Device ID is required';
      isValid = false;
    } else if (
      !editingTracker && 
      trackers.some(t => t.deviceId === formValues.deviceId)
    ) {
      errors.deviceId = 'Device ID must be unique';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSaveTracker = () => {
    if (!validateForm()) return;

    // Find the assigned driver if an ID is selected
    const assignedDriver = formValues.assignedDriverId 
      ? mockDrivers.find(d => d.id === formValues.assignedDriverId)
      : undefined;

    if (editingTracker) {
      // Update existing tracker
      const updatedTrackers = trackers.map(tracker => 
        tracker.id === editingTracker.id
          ? {
              ...tracker,
              name: formValues.name,
              deviceId: formValues.deviceId,
              status: formValues.status,
              batteryLevel: formValues.batteryLevel,
              assignedTo: assignedDriver
                ? {
                    driverId: assignedDriver.id,
                    driverName: assignedDriver.name
                  }
                : undefined
            }
          : tracker
      );
      setTrackers(updatedTrackers);
      setSnackbarMessage('Tracker updated successfully!');
    } else {
      // Create new tracker
      const newTracker: Tracker = {
        id: `TRK-${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`,
        name: formValues.name,
        deviceId: formValues.deviceId,
        status: formValues.status,
        batteryLevel: formValues.batteryLevel,
        assignedTo: assignedDriver
          ? {
              driverId: assignedDriver.id,
              driverName: assignedDriver.name
            }
          : undefined,
        lastPing: assignedDriver ? new Date().toISOString() : undefined
      };
      setTrackers([...trackers, newTracker]);
      setSnackbarMessage('Tracker created successfully!');
    }
    
    setSnackbarOpen(true);
    handleCloseDialog();
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    if (name) {
      setFormValues({
        ...formValues,
        [name]: value
      });
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate fetching fresh data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <Box className="w-full p-6">
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <CircularProgress color="primary" size={60} thickness={4} />
          <Typography variant="h6" className="text-gray-600 font-medium">
            Loading trackers data...
          </Typography>
        </div>
      </Box>
    );
  }

  return (
    <div className="p-4">
      {/* Header Section with gradient background */}
      <div className="relative mb-8 p-6 bg-gradient-to-r from-lokatrack-50 to-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-800">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-lokatrack-dark to-lokatrack-primary">
                Tracker Management
              </span>
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Monitor and manage all your tracking devices from a single dashboard. Assign trackers to drivers and monitor their status in real-time.
            </p>
            <div className="flex items-center mt-3 text-sm">
              <Chip 
                icon={<SignalIcon className="text-lokatrack-primary" />} 
                label={`${trackers.filter(t => t.status === 'active').length} Active`}
                size="small"
                className="mr-3 bg-lokatrack-50 text-lokatrack-primary font-medium" 
              />
              <Chip 
                icon={<PersonAddIcon className="text-blue-600" />} 
                label={`${trackers.filter(t => !t.assignedTo).length} Unassigned`}
                size="small"
                className="bg-blue-50 text-blue-600 font-medium" 
              />
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3">
            <Button 
              variant="contained" 
              color="primary"
              startIcon={<DownloadIcon />}
              className="px-4 py-2 bg-white text-lokatrack-primary border border-lokatrack-100 hover:bg-lokatrack-50"
            >
              Export Data
            </Button>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={() => handleOpenDialog()}
              className="px-5 py-2 rounded-xl bg-lokatrack-primary hover:bg-lokatrack-dark shadow-md hover:shadow-lg transition-all duration-300"
            >
              Add New Tracker
            </Button>
          </div>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute -right-12 -bottom-12 w-40 h-40 rounded-full bg-lokatrack-50/40 blur-sm"></div>
        <div className="absolute right-20 bottom-10 w-20 h-20 rounded-full bg-lokatrack-50/60 blur-sm"></div>
        <div className="absolute -left-8 -top-8 w-28 h-28 rounded-full bg-lokatrack-50/30 blur-md"></div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100/80">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <div className="relative">
              <TextField
                fullWidth
                placeholder="Search trackers by name, device ID, or driver..."
                value={searchTerm}
                onChange={handleSearchChange}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                  className: "bg-gray-50/50 rounded-xl",
                  sx: {
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'transparent'
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(0, 0, 0, 0.1)'
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#1B5E20!important',
                      borderWidth: '1px!important'
                    },
                  }
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className="flex justify-start md:justify-end gap-2">
              <Button 
                variant="outlined" 
                startIcon={<TuneIcon />}
                className="px-4 py-2.5 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
              >
                Filter
              </Button>
              <Button 
                variant="outlined"
                startIcon={isLoading ? <CircularProgress size={18} /> : <RefreshIcon />}
                onClick={handleRefresh}
                disabled={isLoading}
                className="px-4 py-2.5 border-2 border-lokatrack-primary text-lokatrack-primary hover:bg-lokatrack-50 rounded-xl"
              >
                {isLoading ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button 
                variant="outlined"
                startIcon={<SwitchIcon />}
                className="px-4 py-2.5 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl"
              >
                Batch Actions
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
      
      {/* Tabs and Stats */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6 border border-gray-100/80">
        <div className="flex flex-col sm:flex-row justify-between items-stretch">
          <div className="p-4 sm:p-6 flex-grow">
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="tracker tabs"
              variant="scrollable"
              scrollButtons="auto"
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
              <Tab 
                label={
                  <div className="flex items-center">
                    <span>All Trackers</span>
                    <Chip 
                      label={trackers.length} 
                      size="small" 
                      className="ml-2 bg-gray-100 text-gray-700 font-medium" 
                    />
                  </div>
                } 
                {...a11yProps(0)} 
              />
              <Tab 
                label={
                  <div className="flex items-center">
                    <span>Active</span>
                    <Chip 
                      label={trackers.filter(t => t.status === 'active').length} 
                      size="small" 
                      className="ml-2 bg-green-100 text-green-700 font-medium" 
                    />
                  </div>
                } 
                {...a11yProps(1)} 
              />
              <Tab 
                label={
                  <div className="flex items-center">
                    <span>Inactive</span>
                    <Chip 
                      label={trackers.filter(t => t.status === 'inactive').length} 
                      size="small" 
                      className="ml-2 bg-red-100 text-red-700 font-medium" 
                    />
                  </div>
                } 
                {...a11yProps(2)} 
              />
              <Tab 
                label={
                  <div className="flex items-center">
                    <span>Unassigned</span>
                    <Chip 
                      label={trackers.filter(t => !t.assignedTo).length} 
                      size="small" 
                      className="ml-2 bg-blue-100 text-blue-700 font-medium" 
                    />
                  </div>
                } 
                {...a11yProps(3)} 
              />
            </Tabs>
          </div>
          
          <Divider orientation="vertical" flexItem className="hidden sm:block" />
          
          <div className="px-6 py-4 flex flex-row sm:flex-col justify-between items-center sm:items-start bg-lokatrack-50/30 min-w-[200px]">
            <div>
              <Typography variant="body2" className="text-gray-500 font-medium mb-1">
                Total Trackers
              </Typography>
              <Typography variant="h5" className="font-bold text-gray-800">
                {trackers.length}
              </Typography>
            </div>
            <div className="text-right sm:text-left sm:mt-4">
              <Typography variant="body2" className="text-gray-500 font-medium mb-1">
                Battery Level Avg
              </Typography>
              <Typography variant="h6" className="font-bold text-gray-800 flex items-center">
                <BatteryFullIcon className="mr-1 text-green-600" />
                {Math.round(trackers.reduce((sum, tracker) => sum + tracker.batteryLevel, 0) / trackers.length)}%
              </Typography>
            </div>
          </div>
        </div>
      </div>

      {/* Tab panels */}
      <TabPanel value={tabValue} index={0}>
        <TrackerList trackers={filteredTrackers} onEdit={handleOpenDialog} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <TrackerList trackers={filteredTrackers} onEdit={handleOpenDialog} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <TrackerList trackers={filteredTrackers} onEdit={handleOpenDialog} />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <TrackerList trackers={filteredTrackers} onEdit={handleOpenDialog} />
      </TabPanel>

      {/* Add/Edit Tracker Dialog - Redesigned with a more modern interface */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          className: "rounded-2xl overflow-hidden"
        }}
      >
        <DialogTitle className="bg-gradient-to-r from-lokatrack-50 to-white px-6 py-4 flex justify-between items-center">
          <div>
            <Typography variant="h6" className="font-bold text-gray-800 flex items-center">
              {editingTracker ? 
                <EditIcon className="mr-2 text-lokatrack-primary" /> : 
                <AddIcon className="mr-2 text-lokatrack-primary" />
              }
              {editingTracker ? 'Edit Tracker' : 'Add New Tracker'}
            </Typography>
            <Typography variant="body2" className="text-gray-500 mt-1">
              {editingTracker ? 'Update tracker information and settings' : 'Configure a new tracking device'}
            </Typography>
          </div>
          <IconButton onClick={handleCloseDialog} size="small" className="text-gray-500">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent className="px-6 py-4">
          <Grid container spacing={3} className="mt-0">
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tracker Name"
                name="name"
                value={formValues.name}
                onChange={handleFormChange}
                error={!!formErrors.name}
                helperText={formErrors.name}
                required
                className="rounded-xl"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationIcon className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Enter a descriptive name (e.g. Truck Alpha)"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Device ID"
                name="deviceId"
                value={formValues.deviceId}
                onChange={handleFormChange}
                error={!!formErrors.deviceId}
                helperText={formErrors.deviceId || "Unique identifier for the tracking device"}
                required
                className="rounded-xl"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <div className="text-xs font-mono bg-gray-100 py-1 px-2 rounded text-gray-600">ID</div>
                    </InputAdornment>
                  ),
                }}
                placeholder="Enter device ID (e.g. TRK-123456)"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  name="status"
                  value={formValues.status}
                  onChange={handleFormChange}
                  label="Status"
                  startAdornment={
                    <InputAdornment position="start">
                      {formValues.status === 'active' ? 
                        <SignalIcon className="text-green-600 ml-2" /> : 
                        <NoSignalIcon className="text-gray-400 ml-2" />
                      }
                    </InputAdornment>
                  }
                >
                  <MenuItem value="active" className="flex items-center">
                    <SignalIcon className="text-green-600 mr-2" />
                    <span>Active</span>
                  </MenuItem>
                  <MenuItem value="inactive" className="flex items-center">
                    <NoSignalIcon className="text-gray-600 mr-2" />
                    <span>Inactive</span>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Battery Level"
                name="batteryLevel"
                type="number"
                value={formValues.batteryLevel}
                onChange={handleFormChange}
                InputProps={{
                  inputProps: { min: 0, max: 100 },
                  startAdornment: (
                    <InputAdornment position="start">
                      <BatteryFullIcon className={
                        formValues.batteryLevel <= 15 ? "text-red-500" :
                        formValues.batteryLevel <= 50 ? "text-amber-500" :
                        "text-green-500"
                      } />
                    </InputAdornment>
                  ),
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="assigned-driver-label">Assigned Driver</InputLabel>
                <Select
                  labelId="assigned-driver-label"
                  name="assignedDriverId"
                  value={formValues.assignedDriverId}
                  onChange={handleFormChange}
                  label="Assigned Driver"
                  startAdornment={
                    <InputAdornment position="start">
                      <PersonIcon className="text-blue-600 ml-2" />
                    </InputAdornment>
                  }
                >
                  <MenuItem value="" className="flex items-center">
                    <em>None (Unassigned)</em>
                  </MenuItem>
                  
                  {mockDrivers.map((driver) => (
                    <MenuItem key={driver.id} value={driver.id} className="flex items-center gap-2">
                      <Avatar 
                        sx={{ width: 24, height: 24 }}
                        className="bg-blue-100 text-blue-600 font-medium text-xs"
                      >
                        {driver.name.charAt(0)}
                      </Avatar>
                      <span>{driver.name}</span>
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Assign this tracker to a driver for operations</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          
          {editingTracker && (
            <Box className="mt-6 p-4 bg-blue-50 rounded-xl">
              <Typography variant="subtitle2" className="text-blue-700 font-medium mb-2">
                Device Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" className="text-gray-500">Last Connection</Typography>
                  <Typography variant="body2" className="font-medium">
                    {editingTracker.lastPing ? new Date(editingTracker.lastPing).toLocaleString() : 'Never'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" className="text-gray-500">Created On</Typography>
                  <Typography variant="body2" className="font-medium">April 25, 2025</Typography>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions className="px-6 py-4 bg-gray-50">
          <Button 
            onClick={handleCloseDialog}
            className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-xl"
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSaveTracker}
            startIcon={editingTracker ? <CheckIcon /> : <AddIcon />}
            className="px-5 py-2 bg-lokatrack-primary hover:bg-lokatrack-dark rounded-xl shadow-md"
          >
            {editingTracker ? 'Update Tracker' : 'Create Tracker'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="success" 
          sx={{ 
            width: '100%',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
          className="bg-green-50 text-green-800 border border-green-200"
          icon={<CheckIcon className="text-green-600" />}
        >
          <Typography variant="subtitle2" className="font-medium">{snackbarMessage}</Typography>
        </Alert>
      </Snackbar>
    </div>
  );
};

const TrackerList = ({ 
  trackers, 
  onEdit 
}: { 
  trackers: Tracker[], 
  onEdit: (tracker: Tracker) => void 
}) => {
  if (trackers.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-sm p-8 text-center border border-gray-100"
      >
        <div className="max-w-md mx-auto py-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <LocationIcon className="text-gray-400" style={{ fontSize: 40 }} />
          </div>
          
          <Typography variant="h5" className="text-gray-800 font-bold mb-2">
            No trackers found
          </Typography>
          
          <Typography variant="body1" className="text-gray-600 mb-6">
            We couldn't find any trackers matching your current filters. Try adjusting your search criteria or add a new tracker.
          </Typography>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              className="px-4 py-2.5 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl"
              onClick={() => {}}
            >
              Clear Filters
            </Button>
            
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              className="px-4 py-2.5 bg-lokatrack-primary hover:bg-lokatrack-dark text-white rounded-xl"
              onClick={() => {}}
            >
              Add New Tracker
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <Grid container spacing={3}>
      {trackers.map((tracker) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={tracker.id}>
          <TrackerCard
            tracker={tracker}
            onEdit={() => onEdit(tracker)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Trackers;