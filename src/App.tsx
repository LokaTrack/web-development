import { BrowserRouter, useRoutes, useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import DashboardLayout from "./components/DashboardLayout";
import routes from "./utils/routes";

// Component that renders the current route with conditional layout
const AppRoutes = () => {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/" || location.pathname === "/login";
  const element = useRoutes(routes);

  return isLoginPage ? element : <DashboardLayout>{element}</DashboardLayout>;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
