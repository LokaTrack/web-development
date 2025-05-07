import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  LinearProgress,
  Card,
  CardContent,
  Avatar,
  Divider,
  Chip,
  TextField,
  InputAdornment,
  Button,
  IconButton
} from '@mui/material';
import {
  Person,
  Email,
  Phone,
  CalendarToday,
  Search as SearchIcon,
  Add as AddIcon,
  FilterList as FilterListIcon,
  Refresh as RefreshIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { mockDrivers } from '../utils/mockData';
import { Driver } from '../types';

const Drivers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setDrivers(mockDrivers);
      setFilteredDrivers(mockDrivers);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Filter drivers based on search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      const filtered = drivers.filter(driver => 
        driver.name.toLowerCase().includes(term) || 
        driver.email.toLowerCase().includes(term) || 
        driver.phoneNumber.includes(term) ||
        driver.id.toLowerCase().includes(term)
      );
      setFilteredDrivers(filtered);
    } else {
      setFilteredDrivers(drivers);
    }
  }, [searchTerm, drivers]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate fetching fresh data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  if (isLoading) {
    return (
      <Box sx={{ width: '100%', p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>Drivers</Typography>
        <LinearProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Drivers</Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />} 
        >
          Add Driver
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search by name, email, phone, or ID..."
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
            <Button 
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
            >
              Refresh
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {filteredDrivers.length === 0 ? (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No drivers found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try changing your search criteria.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredDrivers.map((driver) => (
            <Grid item xs={12} sm={6} md={4} key={driver.id}>
              <Card sx={{ borderRadius: 3, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar 
                        sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}
                        src={driver.profilePictureUrl}
                      >
                        {driver.name.charAt(0)}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {driver.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {driver.id}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton 
                      sx={{ 
                        bgcolor: 'primary.main', 
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                        }
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>

                  <Divider sx={{ my: 2 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                        <Email fontSize="small" color="action" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Email
                          </Typography>
                          <Typography variant="body1">
                            {driver.email}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                        <Phone fontSize="small" color="action" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Phone
                          </Typography>
                          <Typography variant="body1">
                            {driver.phoneNumber}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                        <CalendarToday fontSize="small" color="action" />
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Registered
                          </Typography>
                          <Typography variant="body1">
                            {formatDate(driver.registrationDate)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Deliveries
                      </Typography>
                      <Chip 
                        label={driver.deliveredCount} 
                        color="success" 
                        size="small" 
                        sx={{ fontWeight: 'bold', width: 80 }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Returns
                      </Typography>
                      <Chip 
                        label={driver.returningCount} 
                        color="error" 
                        size="small" 
                        sx={{ fontWeight: 'bold', width: 80 }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" align="right">
                        Success Rate
                      </Typography>
                      <Chip 
                        label={`${Math.round((driver.deliveredCount / (driver.deliveredCount + driver.returningCount)) * 100)}%`} 
                        color="info" 
                        size="small"
                        sx={{ fontWeight: 'bold', width: 80 }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Drivers;