import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  TextField, 
  InputAdornment, 
  Button, 
  Tabs, 
  Tab, 
  Chip,
  LinearProgress,
  Paper
} from '@mui/material';
import { Search as SearchIcon, Add as AddIcon, FilterList as FilterListIcon } from '@mui/icons-material';
import PackageCard from '../components/PackageCard';
import { mockPackages } from '../utils/mockData';
import { Package, PackageStatus } from '../types';

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
      id={`package-tabpanel-${index}`}
      aria-labelledby={`package-tab-${index}`}
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
    id: `package-tab-${index}`,
    'aria-controls': `package-tabpanel-${index}`,
  };
}

const Packages = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [packages, setPackages] = useState<Package[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);

  useEffect(() => {
    // Simulate loading data from API
    const timer = setTimeout(() => {
      setPackages(mockPackages);
      setFilteredPackages(mockPackages);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter packages based on tab and search term
    let filtered = [...packages];
    
    // Apply tab filter
    switch (tabValue) {
      case 1: // On Delivery
        filtered = filtered.filter(pkg => pkg.status === PackageStatus.ON_DELIVERY);
        break;
      case 2: // Check-in
        filtered = filtered.filter(pkg => pkg.status === PackageStatus.CHECKIN);
        break;
      case 3: // Check-out
        filtered = filtered.filter(pkg => pkg.status === PackageStatus.CHECKOUT);
        break;
      case 4: // Returned
        filtered = filtered.filter(pkg => pkg.status === PackageStatus.RETURNED);
        break;
      default: // All
        break;
    }
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(pkg => 
        pkg.id.toLowerCase().includes(term) || 
        pkg.recipient.toLowerCase().includes(term) || 
        pkg.address.toLowerCase().includes(term) || 
        pkg.items.toLowerCase().includes(term) ||
        pkg.driverName.toLowerCase().includes(term)
      );
    }
    
    setFilteredPackages(filtered);
  }, [tabValue, searchTerm, packages]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleViewDetails = (id: string) => {
    console.log(`View details for package ${id}`);
    // In a real app, this would navigate to the package details page
    alert(`View details for package ${id}`);
  };

  const getStatusCount = (status: PackageStatus) => {
    return packages.filter(pkg => pkg.status === status).length;
  };

  if (isLoading) {
    return (
      <Box sx={{ width: '100%', p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Packages</Typography>
        <LinearProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Packages</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
          sx={{ fontWeight: 'bold' }}
        >
          Add Package
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search packages by ID, recipient, address, etc."
              value={searchTerm}
              onChange={handleSearchChange}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Button 
              variant="outlined" 
              startIcon={<FilterListIcon />}
              sx={{ mr: 1 }}
            >
              Filter
            </Button>
            <Button variant="outlined">Export</Button>
          </Grid>
        </Grid>
      </Paper>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="package tabs"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                All
                <Chip 
                  label={packages.length} 
                  size="small" 
                  sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                />
              </Box>
            } 
            {...a11yProps(0)} 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                On Delivery
                <Chip 
                  label={getStatusCount(PackageStatus.ON_DELIVERY)} 
                  size="small" 
                  color="info"
                  sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                />
              </Box>
            } 
            {...a11yProps(1)} 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                Check-in
                <Chip 
                  label={getStatusCount(PackageStatus.CHECKIN)} 
                  size="small" 
                  color="warning"
                  sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                />
              </Box>
            } 
            {...a11yProps(2)} 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                Check-out
                <Chip 
                  label={getStatusCount(PackageStatus.CHECKOUT)} 
                  size="small" 
                  color="success"
                  sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                />
              </Box>
            } 
            {...a11yProps(3)} 
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                Returned
                <Chip 
                  label={getStatusCount(PackageStatus.RETURNED)} 
                  size="small" 
                  color="error"
                  sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                />
              </Box>
            } 
            {...a11yProps(4)} 
          />
        </Tabs>
      </Box>

      {/* Tab panels */}
      <TabPanel value={tabValue} index={0}>
        <PackageList packages={filteredPackages} onViewDetails={handleViewDetails} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <PackageList packages={filteredPackages} onViewDetails={handleViewDetails} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <PackageList packages={filteredPackages} onViewDetails={handleViewDetails} />
      </TabPanel>
      <TabPanel value={tabValue} index={3}>
        <PackageList packages={filteredPackages} onViewDetails={handleViewDetails} />
      </TabPanel>
      <TabPanel value={tabValue} index={4}>
        <PackageList packages={filteredPackages} onViewDetails={handleViewDetails} />
      </TabPanel>
    </Box>
  );
};

const PackageList = ({ 
  packages, 
  onViewDetails 
}: { 
  packages: Package[], 
  onViewDetails: (id: string) => void 
}) => {
  if (packages.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          No packages found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Try changing your search or filter criteria.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {packages.map((pkg) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={pkg.id}>
          <PackageCard
            packageData={pkg}
            onViewDetails={onViewDetails}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Packages;