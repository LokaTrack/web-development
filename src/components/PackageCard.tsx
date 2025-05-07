import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Divider,
  Avatar,
  useTheme,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  LocalShipping as TruckIcon,
  MoreVert as MoreIcon,
  ArrowForward as ArrowIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import StatusIndicator from './StatusIndicator';
import { Package } from '../types';
import { alpha } from '@mui/material/styles';

interface PackageCardProps {
  packageData: Package;
  onClick?: () => void;
}

const PackageCard: React.FC<PackageCardProps> = ({ packageData, onClick }) => {
  const theme = useTheme();
  
  const getStatusColor = () => {
    switch (packageData.status) {
      case 'on_delivery': return theme.palette.info.main;
      case 'checkout': return theme.palette.success.main;
      case 'checkin': return theme.palette.warning.main;
      case 'returned': return theme.palette.error.main;
      default: return theme.palette.grey[500];
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Card 
      onClick={onClick}
      sx={{ 
        height: '100%',
        borderRadius: 3,
        position: 'relative',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
          '& .package-arrow': {
            transform: 'translateX(4px)',
          }
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '5px',
          backgroundColor: getStatusColor(),
          borderRadius: '8px 8px 0 0',
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar
              variant="rounded"
              sx={{
                bgcolor: alpha(theme.palette.secondary.main, 0.1),
                color: theme.palette.secondary.main,
                width: 50,
                height: 50,
                borderRadius: 2,
                mr: 2,
              }}
            >
              <TruckIcon fontSize="large" />
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 0.5 }}>
                {packageData.trackingNumber}
              </Typography>
              <StatusIndicator status={packageData.status} withPulse={packageData.status === 'on_delivery'} />
            </Box>
          </Box>
          
          <Tooltip title="More options">
            <IconButton>
              <MoreIcon />
            </IconButton>
          </Tooltip>
        </Box>
        
        <Divider sx={{ my: 2 }} />
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Package Details
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Weight
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {packageData.weight} kg
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Dimensions
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {packageData.dimensions}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">
              Date Added
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {formatDate(packageData.createdAt)}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />
        
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Recipient
          </Typography>
          <Typography variant="body2" fontWeight="medium" gutterBottom>
            {packageData.recipientName}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              display: 'flex', 
              alignItems: 'flex-start',
              gap: 0.5,
              mb: 1
            }}
          >
            <LocationIcon 
              fontSize="small" 
              sx={{ 
                color: theme.palette.text.secondary, 
                mt: 0.3,
                fontSize: '1rem' 
              }} 
            />
            <span>{packageData.destinationAddress}</span>
          </Typography>
        </Box>
        
        {packageData.status === 'on_delivery' && packageData.driver && (
          <>
            <Divider sx={{ my: 2 }} />
            
            <Box>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Delivery Driver
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={packageData.driver.profilePictureUrl}
                    sx={{ width: 36, height: 36, mr: 1 }}
                  >
                    {packageData.driver.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      {packageData.driver.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: {packageData.driver.id}
                    </Typography>
                  </Box>
                </Box>
                <IconButton 
                  sx={{ 
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.2),
                    }
                  }}
                >
                  <ArrowIcon className="package-arrow" sx={{ transition: 'transform 0.3s ease' }} />
                </IconButton>
              </Box>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PackageCard;