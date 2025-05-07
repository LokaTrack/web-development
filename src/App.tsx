import { BrowserRouter, useRoutes, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import DashboardLayout from './components/DashboardLayout';
import routes from './utils/routes';
import { useEffect, useState } from 'react';

// Component that renders the current route with conditional layout
const AppRoutes = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/' || location.pathname === '/login';
  const element = useRoutes(routes);

  return isLoginPage ? element : (
    <DashboardLayout>
      {element}
    </DashboardLayout>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalize CSS */}
      <BrowserRouter>
        {isLoading ? (
          <div className="min-h-screen flex items-center justify-center bg-lokatrack-50">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-3 relative">
                <div className="w-16 h-16 rounded-full border-4 border-lokatrack-100 border-t-lokatrack-primary animate-spin"></div>
              </div>
              <p className="text-lokatrack-primary font-medium text-lg mt-4">Loading LokaTrack...</p>
            </div>
          </div>
        ) : (
          <AppRoutes />
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
