import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Drawer,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  LocalShipping as LocalShippingIcon,
  LocationOn as LocationOnIcon,
  People as PeopleIcon,
  MapOutlined,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

// Import the LokaTrack logo
import logoImage from "./assets/images/lokatrack_logo_small.png";

const drawerWidth = 240;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const profileMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    // Add logout logic here
    console.log("Logout clicked");
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    {
      text: "Package Tracking",
      icon: <LocalShippingIcon />,
      path: "/packages",
    },
    { text: "Live Tracking", icon: <LocationOnIcon />, path: "/tracking" },
    { text: "Tracker Management", icon: <MapOutlined />, path: "/trackers" },
    { text: "Drivers", icon: <PeopleIcon />, path: "/drivers" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: "100%",
          backgroundColor: "white",
          color: "text.primary",
          boxShadow: 1,
          zIndex: (theme) => theme.zIndex.drawer - 1,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            sx={{
              mr: 2,
              opacity: { sm: open ? 0 : 1 },
              transform: { sm: open ? "scale(0.8)" : "scale(1)" },
              transition: (theme) =>
                theme.transitions.create(["opacity", "transform"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
              pointerEvents: { sm: open ? "none" : "auto" },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
              ml: { sm: open ? `${drawerWidth}px` : 0 },
              transition: (theme) =>
                theme.transitions.create(["margin-left"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.leavingScreen,
                }),
            }}
          >
            <Box
              component="img"
              src={logoImage}
              alt="LokaTrack Logo"
              sx={{ height: 32, width: 32, mr: 2 }}
            />
            <Typography variant="h6" noWrap component="div" color="primary">
              LokaTrack
            </Typography>
          </Box>

          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={handleProfileMenuOpen}
            aria-controls={profileMenuOpen ? "profile-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={profileMenuOpen ? "true" : undefined}
          >
            <AccountCircleIcon />
          </IconButton>

          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={profileMenuOpen}
            onClose={handleProfileMenuClose}
            MenuListProps={{
              "aria-labelledby": "profile-button",
            }}
            sx={{
              mt: 1.5,
              "& .MuiPaper-root": {
                borderRadius: 2,
                minWidth: 180,
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
          disableScrollLock: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={logoImage}
              alt="LokaTrack Logo"
              sx={{ height: 32, width: 32, mr: 1 }}
            />
            <Typography variant="h6" color="primary">
              LokaTrack
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>

        <Divider />

        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={isActive}
                  sx={{
                    mx: 1,
                    borderRadius: 1,
                    minHeight: 56,
                    alignItems: "center",
                    "&.Mui-selected": {
                      backgroundColor: "primary.main",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "white" : "primary.main",
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={logoImage}
              alt="LokaTrack Logo"
              sx={{ height: 32, width: 32, mr: 1 }}
            />
            <Typography variant="h6" color="primary">
              LokaTrack
            </Typography>
          </Box>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>

        <Divider />

        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={isActive}
                  sx={{
                    mx: 1,
                    borderRadius: 1,
                    minHeight: 56,
                    alignItems: "center",
                    "&.Mui-selected": {
                      backgroundColor: "primary.main",
                      color: "white",
                      "&:hover": {
                        backgroundColor: "primary.dark",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "white" : "primary.main",
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          ml: { sm: `${open ? drawerWidth : 0}px` },
          mt: 8,
          transition: (theme) =>
            theme.transitions.create(["margin-left"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        }}
      >
        <Box
          sx={{
            maxWidth: "80rem", // 7xl equivalent
            mx: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
