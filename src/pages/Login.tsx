import { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  InputAdornment, 
  IconButton, 
  CircularProgress,
  Alert,
  useTheme,
  useMediaQuery,
  Slide,
  Grow,
  Fade
} from '@mui/material';
import { 
  Visibility, 
  VisibilityOff, 
  LockOutlined, 
  EmailOutlined,
  ArrowForwardRounded,
  TrackChangesOutlined,
  SpeedOutlined,
  LocationOnOutlined,
  NavigationOutlined,
  SecurityOutlined,
  LocalShippingOutlined,
  AssessmentOutlined,
  DevicesOutlined,
  PeopleOutlined
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Import logo
import logoImage from '../assets/images/lokatrack_logo.png';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Component to create interactive animated tracking lines
const TrackingLine = ({ delay = 0, duration = 4, color = "#1B5E20", width = 150, vertical = false }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: vertical ? '2px' : width,
        height: vertical ? width : '2px',
        overflow: 'hidden',
        opacity: 0.7,
      }}
    >
      <motion.div
        initial={{ x: vertical ? 0 : -width, y: vertical ? -width : 0 }}
        animate={{ x: vertical ? 0 : width, y: vertical ? width : 0 }}
        transition={{
          repeat: Infinity,
          duration: duration,
          delay: delay,
          ease: "linear"
        }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `linear-gradient(${vertical ? 'to bottom' : 'to right'}, transparent, ${color}, transparent)`,
        }}
      />
    </Box>
  );
};

// Component for animated tracking dots
const TrackingDot = ({ delay = 0, duration = 3, size = 6 }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: [0, 1, 1, 0],
        opacity: [0, 0.8, 0.8, 0],
      }}
      transition={{
        repeat: Infinity,
        duration: duration,
        delay: delay,
        ease: "easeInOut",
        times: [0, 0.1, 0.9, 1]
      }}
      style={{
        position: 'absolute',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: '#2E7D32',
        boxShadow: '0 0 8px 2px rgba(46, 125, 50, 0.4)',
      }}
    />
  );
};

// Component for animated location marker
const PulsatingLocationMarker = ({ delay = 0 }) => {
  return (
    <Box sx={{ position: 'relative' }}>
      {/* Main location icon */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          delay: delay,
          ease: "easeInOut"
        }}
      >
        <NavigationOutlined 
          sx={{ 
            fontSize: 28, 
            color: '#1B5E20', 
            transform: 'rotate(45deg)',
            filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.2))'
          }} 
        />
      </motion.div>
      
      {/* Pulse effect */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.5, opacity: 0.7 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{
            repeat: Infinity,
            duration: 2,
            delay: delay + i * 0.5,
            ease: "easeOut"
          }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 16,
            height: 16,
            borderRadius: '50%',
            backgroundColor: 'rgba(46, 125, 50, 0.4)',
            transform: 'translate(-50%, -50%)',
            zIndex: -1
          }}
        />
      ))}
    </Box>
  );
};

// Component for creating themed gradient text
const GradientText = ({ children, gradient = "45deg, #1B5E20 30%, #4CAF50 90%", variant = "h3", className = "", sx = {} }) => {
  return (
    <Typography 
      variant={variant} 
      className={className}
      sx={{ 
        background: `linear-gradient(${gradient})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        ...sx
      }}
    >
      {children}
    </Typography>
  );
};

// Component for the 3D interactive map background
const InteractiveMapBackground = () => {
  const mapRef = useRef(null);
  
  // Track mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!mapRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const moveX = (clientX - innerWidth / 2) / (innerWidth / 2) * 15;
      const moveY = (clientY - innerHeight / 2) / (innerHeight / 2) * 15;
      
      mapRef.current.style.transform = `perspective(1000px) rotateX(${-moveY}deg) rotateY(${moveX}deg) scale3d(1.05, 1.05, 1.05)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <Box
      ref={mapRef}
      className="absolute inset-0 w-full h-full z-0"
      sx={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3Cpath stroke='%23c8e6c9' stroke-width='0.7' d='M36 16v44M56 36H0'/%3E%3Cpath stroke='%23a5d6a7' stroke-width='0.3' d='M24 16v44M48 36H0'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
        backgroundPosition: 'center',
        opacity: 0.7,
        transition: 'transform 0.3s ease-out',
        transformStyle: 'preserve-3d',
      }}
    />
  );
};

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  
  // Animation control
  const [activeScreen, setActiveScreen] = useState('login'); // 'login' or 'features'
  const controls = useAnimation();
  const [formRef, formInView] = useInView({ threshold: 0.3, triggerOnce: true });
  
  // Form validation states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formTouched, setFormTouched] = useState(false);
  
  // References for animated elements
  const mapElementsRef = useRef([]);
  
  // Generate pseudo-random points for map tracking animations
  const generateTrackingPoints = (count, areaWidth, areaHeight) => {
    const points = [];
    for (let i = 0; i < count; i++) {
      // Create a grid-like pattern rather than completely random
      // to ensure better distribution
      const section = i % 5; // Divide area into 5 sections
      const sectionWidth = areaWidth / 5;
      const x = (section * sectionWidth) + (Math.random() * sectionWidth);
      
      // Height is more random but avoids extremes
      const y = 50 + Math.random() * (areaHeight - 100);
      
      points.push({ x, y });
    }
    return points;
  };
  
  // Features showcase data
  const features = [
    {
      icon: <LocationOnOutlined sx={{ fontSize: 28 }} />,
      title: "Tracking Pengiriman Sayuran",
      description: "Pantau lokasi pengiriman sayuran segar secara real-time dengan akurasi tinggi."
    },
    {
      icon: <SpeedOutlined sx={{ fontSize: 28 }} />,
      title: "Status Pengiriman",
      description: "Monitoring status paket dan hasil pengiriman sayuran dengan detail."
    },
    {
      icon: <SecurityOutlined sx={{ fontSize: 28 }} />,
      title: "Manajemen Alat Tracking",
      description: "Kelola semua perangkat tracking dengan mudah dalam satu platform."
    },
    {
      icon: <TrackChangesOutlined sx={{ fontSize: 28 }} />,
      title: "Manajemen Driver",
      description: "Melihat dan mengelola data driver pengiriman sayuran secara komprehensif."
    }
  ];
  
  // Define coordinates for animated tracking lines and dots
  const trackingLineCoordinates = [
    { x: '10%', y: '20%', width: 120, delay: 0, vertical: false },
    { x: '50%', y: '15%', width: 60, delay: 2, vertical: true },
    { x: '85%', y: '35%', width: 90, delay: 1.5, vertical: false },
    { x: '25%', y: '70%', width: 150, delay: 3, vertical: false },
    { x: '70%', y: '60%', width: 100, delay: 0.5, vertical: true },
  ];
  
  const trackingDotCoordinates = [
    { x: '15%', y: '25%', delay: 0.2, size: 4 },
    { x: '50%', y: '20%', delay: 1.8, size: 6 },
    { x: '80%', y: '30%', delay: 1.2, size: 5 },
    { x: '35%', y: '65%', delay: 3.5, size: 4 },
    { x: '65%', y: '75%', delay: 0.8, size: 7 },
    { x: '90%', y: '15%', delay: 2.5, size: 3 },
    { x: '25%', y: '35%', delay: 1.5, size: 5 },
    { x: '75%', y: '55%', delay: 2.7, size: 4 },
  ];
  
  const markerCoordinates = [
    { x: '20%', y: '40%', delay: 0 },
    { x: '60%', y: '30%', delay: 0.5 },
    { x: '85%', y: '60%', delay: 1 },
  ];

  // Animated path for vehicle tracking demonstration
  const vehiclePath = {
    start: { x: "5%", y: "50%" },
    end: { x: "95%", y: "50%" }
  };
  
  // Start animations when form is in view
  useEffect(() => {
    if (formInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
      });
    }
  }, [controls, formInView]);
  
  // Form handling
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setFormTouched(true);
    
    // Basic validation
    if (name === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setEmailError(value ? (!emailRegex.test(value) ? 'Email tidak valid' : '') : 'Email harus diisi');
    }
    
    if (name === 'password') {
      setPasswordError(value ? (value.length < 6 ? 'Password minimal 6 karakter' : '') : 'Password harus diisi');
    }
  };

  const handleTogglePasswordVisibility = () => setShowPassword(!showPassword);
  
  const handleToggleScreen = () => {
    setActiveScreen(activeScreen === 'login' ? 'features' : 'login');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate form before submitting
    const isEmailValid = !!formValues.email && !emailError;
    const isPasswordValid = !!formValues.password && !passwordError;
    
    if (!isEmailValid || !isPasswordValid) {
      setEmailError(formValues.email ? emailError : 'Email harus diisi');
      setPasswordError(formValues.password ? passwordError : 'Password harus diisi');
      return;
    }
    
    setLoading(true);
    
    try {
      // Call API login endpoint
      const response = await fetch('https://lokatrack.me/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formValues.email,
          password: formValues.password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login gagal');
      }
      
      // Successful login animation
      controls.start({
        opacity: 0,
        y: -30,
        transition: { duration: 0.5 }
      });
      
      // Store user data from response
      const userData = data.data;
      console.log('Login berhasil:', userData);
      
      // Save authentication data to localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
      localStorage.setItem('userId', userData.userId);
      localStorage.setItem('role', userData.role);
      localStorage.setItem('username', userData.username);
      
      // Brief delay before redirecting
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login gagal. Periksa email dan password Anda.';
      setError(errorMessage);
      console.error('Login error:', err);
      setLoading(false);
    }
  };

  return (
    <Box 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      sx={{
        background: `radial-gradient(circle at 30% 20%, rgba(224, 242, 218, 0.9) 0%, rgba(232, 245, 233, 0.9) 30%, rgba(247, 250, 247, 0.9) 70%)`,
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Interactive map background */}
      <InteractiveMapBackground />
      
      {/* Animated tracking lines */}
      {trackingLineCoordinates.map((line, i) => (
        <Box 
          key={`line-${i}`} 
          sx={{ 
            position: 'absolute', 
            top: line.y, 
            left: line.x, 
            zIndex: 0,
            display: { xs: 'none', sm: 'block' }  // Hide on very small screens
          }}
        >
          <TrackingLine 
            delay={line.delay}
            width={line.width} 
            vertical={line.vertical} 
          />
        </Box>
      ))}
      
      {/* Animated tracking dots */}
      {trackingDotCoordinates.map((dot, i) => (
        <Box 
          key={`dot-${i}`}
          sx={{ 
            position: 'absolute',
            top: dot.y,
            left: dot.x,
            zIndex: 1,
            display: { xs: 'none', md: 'block' }
          }}
        >
          <TrackingDot delay={dot.delay} size={dot.size} />
        </Box>
      ))}
      
      {/* Location markers */}
      {markerCoordinates.map((marker, i) => (
        <Box 
          key={`marker-${i}`}
          sx={{ 
            position: 'absolute',
            top: marker.y,
            left: marker.x,
            zIndex: 1,
            display: { xs: 'none', md: 'block' }
          }}
        >
          <PulsatingLocationMarker delay={marker.delay} />
        </Box>
      ))}
      
      {/* Animated vehicle */}
      <motion.div
        initial={{ left: vehiclePath.start.x, top: vehiclePath.start.y, opacity: 0 }}
        animate={{ 
          duration: 15,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "linear",
          opacity: { 
            times: [0, 0.1, 0.9, 1],
            duration: 15
          }
        }}
        style={{
          position: 'absolute',
          zIndex: 1,
          filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.2))',
          display: isMobile ? 'none' : 'block'
        }}
      >
        <Box sx={{ transform: 'rotate(-20deg)' }}>
          <SpeedOutlined sx={{ color: '#1B5E20', fontSize: 24 }} />
        </Box>
      </motion.div>
      
      {/* Main content container */}
      <Box 
        className="relative z-10 w-full max-w-7xl px-4 sm:px-6 py-6 sm:py-12 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12"
        sx={{
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Main interaction card with glass effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl overflow-visible flex flex-col lg:flex-row"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '1000px',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.7)',
            }}
          >
            {/* Left Panel: Logo and Features */}
            <Box
              sx={{
                width: { xs: '100%', lg: '50%' },
                p: { xs: 4, md: 6 },
                position: 'relative',
                background: 'linear-gradient(135deg, rgba(232, 245, 233, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {/* Animated content based on active screen */}
              <AnimatePresence mode="wait">
                {activeScreen === 'login' ? (
                  <motion.div
                    key="login-left-panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col h-full"
                  >
                    <Box className="mb-8 flex flex-col items-center lg:items-start">
                      <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        style={{ marginBottom: '1.5rem' }}
                      >
                        <img
                          src={logoImage}
                          alt="LokaTrack Logo"
                          style={{ 
                            height: isMobile ? '50px' : '70px', 
                            objectFit: 'contain',
                            filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.1))'
                          }}
                          className="mb-6"
                        />
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <GradientText 
                          variant={isMobile ? "h4" : "h3"}
                          className="mb-3 font-bold text-center lg:text-left"
                          gradient="45deg, #0B3816 30%, #1B5E20 90%"
                        >
                          LokaTrack Dashboard
                        </GradientText>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                      >
                        <Typography 
                          variant="body1" 
                          className="text-gray-700 mb-6 text-center lg:text-left"
                          sx={{ fontSize: { xs: '0.9rem', md: '1rem' }, maxWidth: '400px' }}
                        >
                          Sistem pengiriman sayuran terintegrasi untuk monitoring lokasi, status pengiriman, dan pengelolaan driver secara real-time.
                        </Typography>
                      </motion.div>
                      
                      {/* Switch to features view button (only on mobile/tablet) */}
                      <Box className="mt-2 mb-4 block lg:hidden w-full">
                        <Button
                          fullWidth
                          onClick={handleToggleScreen}
                          variant="outlined"
                          color="primary"
                          sx={{
                            borderRadius: '12px',
                            textTransform: 'none',
                            py: 1.5,
                            borderWidth: '1.5px',
                            '&:hover': {
                              borderWidth: '1.5px',
                            }
                          }}
                        >
                          Lihat Fitur LokaTrack
                        </Button>
                      </Box>
                    </Box>
                    
                    {/* Highlighted features - only on larger screens */}
                    <Box 
                      className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-4"
                      sx={{ mt: 'auto' }}
                    >
                      {features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 + (i * 0.1), duration: 0.5 }}
                        >
                          <Box 
                            className="flex items-start p-3"
                            sx={{
                              borderRadius: '12px',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                background: 'rgba(255, 255, 255, 0.7)',
                                transform: 'translateY(-2px)',
                              }
                            }}
                          >
                            <Box 
                              className="mr-3 mt-1"
                              sx={{ 
                                color: '#1B5E20',
                                background: 'rgba(46, 125, 50, 0.1)',
                                borderRadius: '10px',
                                width: 40,
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              {feature.icon}
                            </Box>
                            <Box>
                              <Typography variant="subtitle1" className="font-semibold mb-1" color="primary.dark">
                                {feature.title}
                              </Typography>
                              <Typography variant="body2" className="text-gray-600" sx={{ fontSize: '0.85rem' }}>
                                {feature.description}
                              </Typography>
                            </Box>
                          </Box>
                        </motion.div>
                      ))}
                    </Box>
                  </motion.div>
                ) : (
                  <motion.div
                    key="features-panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col"
                  >
                    <Box className="mb-4 flex items-center">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <img
                          src={logoImage}
                          alt="LokaTrack Logo"
                          style={{ height: '40px', objectFit: 'contain' }}
                          className="mr-3"
                        />
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                      >
                        <GradientText 
                          variant="h5"
                          className="font-bold"
                          gradient="45deg, #0B3816 30%, #1B5E20 90%"
                        >
                          Fitur Unggulan
                        </GradientText>
                      </motion.div>
                    </Box>
                    
                    {/* Full features list */}
                    <Box className="grid grid-cols-1 gap-4 mt-4">
                      {features.concat([
                        {
                          icon: <SpeedOutlined sx={{ fontSize: 28 }} />,
                          title: "Laporan Pengiriman",
                          description: "Laporan detail pengiriman sayuran harian, mingguan, dan bulanan."
                        },
                        {
                          icon: <SpeedOutlined sx={{ fontSize: 28 }} />,
                          title: "Notifikasi Real-time",
                          description: "Dapatkan notifikasi saat status pengiriman berubah atau terjadi keterlambatan."
                        },
                      ]).map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
                        >
                          <Box 
                            className="flex items-start p-3"
                            sx={{
                              borderRadius: '12px',
                              background: i % 2 === 0 ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
                              transition: 'all 0.2s ease',
                              '&:hover': {
                                background: 'rgba(255, 255, 255, 0.7)',
                                transform: 'translateY(-2px)',
                              }
                            }}
                          >
                            <Box 
                              className="mr-3"
                              sx={{ 
                                color: '#1B5E20',
                                background: 'rgba(46, 125, 50, 0.1)',
                                borderRadius: '10px',
                                width: 40,
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                              }}
                            >
                              {feature.icon}
                            </Box>
                            <Box>
                              <Typography variant="subtitle1" className="font-semibold mb-1" color="primary.dark">
                                {feature.title}
                              </Typography>
                              <Typography variant="body2" className="text-gray-600" sx={{ fontSize: '0.85rem' }}>
                                {feature.description}
                              </Typography>
                            </Box>
                          </Box>
                        </motion.div>
                      ))}
                    </Box>
                    
                    {/* Back to login button */}
                    <Box className="mt-6">
                      <Button
                        fullWidth
                        onClick={handleToggleScreen}
                        variant="outlined"
                        color="primary"
                        sx={{
                          borderRadius: '12px',
                          textTransform: 'none',
                          py: 1.5,
                          borderWidth: '1.5px',
                          '&:hover': {
                            borderWidth: '1.5px',
                          }
                        }}
                      >
                        Kembali ke Login
                      </Button>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
            
            {/* Right Panel: Login Form */}
            <AnimatePresence mode="wait">
              {(activeScreen === 'login' || !isMobile) && (
                <motion.div
                  key="login-form-panel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full lg:w-1/2"
                >
                  <Box
                    sx={{
                      height: '100%',
                      p: { xs: 4, md: 6 },
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                    ref={formRef}
                  >
                    {/* Top shape decorations */}
                    <Box 
                      className="absolute top-0 right-0 w-32 h-32 -mt-10 -mr-10 hidden lg:block"
                      sx={{
                        background: 'linear-gradient(135deg, rgba(46, 125, 50, 0.2) 0%, rgba(200, 230, 201, 0.15) 100%)',
                        borderRadius: '0 0 0 100%',
                        zIndex: -1,
                      }}
                    />
                    
                    <Box 
                      className="absolute bottom-0 left-0 w-32 h-32 -mb-10 -ml-10 hidden lg:block"
                      sx={{
                        background: 'linear-gradient(135deg, rgba(200, 230, 201, 0.15) 0%, rgba(46, 125, 50, 0.2) 100%)',
                        borderRadius: '0 100% 0 0',
                        zIndex: -1,
                      }}
                    />
                    
                    {/* Form content */}
                    <motion.div
                      animate={controls}
                      initial={{ opacity: 0, y: 20 }}
                      className="flex flex-col"
                    >
                      {/* Login header */}
                      <Box className="text-center mb-8">
                        <Typography 
                          variant={isMobile ? "h5" : "h4"} 
                          className="font-bold text-gray-800 mb-2"
                        >
                          Selamat Datang Kembali
                        </Typography>
                        <Typography 
                          variant="body2" 
                          className="text-gray-600"
                        >
                          Silakan masuk untuk melanjutkan ke dashboard
                        </Typography>
                      </Box>
                      
                      {/* Error message */}
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="mb-6"
                          >
                            <Alert 
                              severity="error" 
                              sx={{ 
                                borderRadius: '10px',
                                boxShadow: '0 4px 12px rgba(211, 47, 47, 0.1)'
                              }}
                            >
                              {error}
                            </Alert>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      {/* Login form */}
                      <form onSubmit={handleSubmit} noValidate className="space-y-6">
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            variant="outlined"
                            value={formValues.email}
                            onChange={handleChange}
                            error={formTouched && !!emailError}
                            helperText={formTouched && emailError}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EmailOutlined color={formTouched && !!emailError ? "error" : "primary"} />
                                </InputAdornment>
                              ),
                            }}
                            disabled={loading}
                            autoComplete="email"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                borderRadius: '12px',
                                height: '56px',
                                '&.Mui-focused': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                }
                              }
                            }}
                          />
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            value={formValues.password}
                            onChange={handleChange}
                            error={formTouched && !!passwordError}
                            helperText={formTouched && passwordError}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LockOutlined color={formTouched && !!passwordError ? "error" : "primary"} />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleTogglePasswordVisibility}
                                    edge="end"
                                  >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            disabled={loading}
                            autoComplete="current-password"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                borderRadius: '12px',
                                height: '56px',
                                '&.Mui-focused': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                }
                              }
                            }}
                          />
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                          className="flex justify-end"
                        >
                          <Button
                            variant="text"
                            color="primary"
                            sx={{ 
                              textTransform: 'none',
                              fontWeight: 500,
                              p: 0,
                              '&:hover': {
                                background: 'transparent',
                                color: theme.palette.primary.dark
                              }
                            }}
                          >
                            Lupa password?
                          </Button>
                        </motion.div>
                        
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                          className="pt-4"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            sx={{
                              borderRadius: '12px',
                              height: '56px',
                              textTransform: 'none',
                              fontSize: '1rem',
                              fontWeight: 600,
                              boxShadow: '0 8px 16px rgba(27, 94, 32, 0.15)',
                              background: 'linear-gradient(45deg, #1B5E20 30%, #2E7D32 90%)',
                              position: 'relative',
                              overflow: 'hidden',
                              '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: '-100%',
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                                transition: 'all 0.6s ease',
                              },
                              '&:hover': {
                                boxShadow: '0 10px 20px rgba(27, 94, 32, 0.2)',
                                '&::before': {
                                  left: '100%',
                                }
                              }
                            }}
                          >
                            {loading ? (
                              <CircularProgress size={28} sx={{ color: 'white' }} />
                            ) : (
                              <>
                                Masuk
                                <ArrowForwardRounded sx={{ ml: 1 }} />
                              </>
                            )}
                          </Button>
                        </motion.div>
                      </form>
                      
                      {/* Footer */}
                      <Box className="mt-8 text-center">
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6, duration: 0.5 }}
                        >
                          <Typography variant="body2" color="textSecondary">
                            <span className="text-gray-500">LokaTrack © {new Date().getFullYear()} | </span>
                            <span className="text-lokatrack-primary font-medium">GPS Tracking Solution</span>
                          </Typography>
                        </motion.div>
                      </Box>
                    </motion.div>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Login;