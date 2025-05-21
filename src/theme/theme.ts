import { createTheme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";

// Color scheme matching the mobile app's colors.dart file with enhanced gradients
const colors = {
  primary: {
    main: "#1B5E20", // AppColors.primary
    light: "#4C8C3D",
    dark: "#0F4A16",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#3498DB", // AppColors.info
    light: "#5DADE2",
    dark: "#2980B9",
    contrastText: "#FFFFFF",
  },
  success: {
    main: "#2ECC71", // AppColors.success
    light: "#55D98D",
    dark: "#27AE60",
    contrastText: "#FFFFFF",
  },
  warning: {
    main: "#E67E22", // AppColors.warning
    light: "#F39C12",
    dark: "#D35400",
    contrastText: "#FFFFFF",
  },
  error: {
    main: "#E74C3C", // AppColors.error
    light: "#EC7063",
    dark: "#C0392B",
    contrastText: "#FFFFFF",
  },
  background: {
    default: "#F8FAF5", // Light green-tinted background similar to mobile app
    paper: "#FFFFFF",
  },
  text: {
    primary: "#2D3748",
    secondary: "#718096",
  },
};

// Create the theme with the color palette and typography matching LokaTrack's style
const theme = createTheme({
  palette: {
    primary: colors.primary,
    secondary: colors.secondary,
    success: {
      main: colors.success.main,
      light: colors.success.light,
      dark: colors.success.dark,
      contrastText: colors.success.contrastText,
    },
    warning: {
      main: colors.warning.main,
      light: colors.warning.light,
      dark: colors.warning.dark,
      contrastText: colors.warning.contrastText,
    },
    error: {
      main: colors.error.main,
      light: colors.error.light,
      dark: colors.error.dark,
      contrastText: colors.error.contrastText,
    },
    background: colors.background,
    text: colors.text,
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
    },
    h2: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
      lineHeight: 1.4,
      letterSpacing: "-0.01em",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: 1.4,
      letterSpacing: "-0.01em",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
      lineHeight: 1.4,
      letterSpacing: "-0.01em",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.4,
      letterSpacing: "-0.01em",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
    button: {
      fontWeight: 600,
      fontSize: "0.875rem",
      textTransform: "none",
      letterSpacing: "0.02em",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0px 2px 3px rgba(0, 0, 0, 0.05)",
    "0px 4px 6px rgba(0, 0, 0, 0.05)",
    "0px 6px 8px rgba(0, 0, 0, 0.05)",
    "0px 8px 12px rgba(0, 0, 0, 0.06)",
    "0px 10px 16px rgba(0, 0, 0, 0.06)",
    "0px 12px 20px rgba(0, 0, 0, 0.07)",
    "0px 14px 24px rgba(0, 0, 0, 0.07)",
    "0px 16px 32px rgba(0, 0, 0, 0.08)",
    "0px 18px 36px rgba(0, 0, 0, 0.08)",
    "0px 20px 40px rgba(0, 0, 0, 0.09)",
    "0px 22px 44px rgba(0, 0, 0, 0.09)",
    "0px 24px 48px rgba(0, 0, 0, 0.1)",
    "0px 26px 52px rgba(0, 0, 0, 0.1)",
    "0px 28px 56px rgba(0, 0, 0, 0.1)",
    "0px 30px 60px rgba(0, 0, 0, 0.1)",
    "0px 32px 64px rgba(0, 0, 0, 0.1)",
    "0px 34px 68px rgba(0, 0, 0, 0.1)",
    "0px 36px 72px rgba(0, 0, 0, 0.1)",
    "0px 38px 76px rgba(0, 0, 0, 0.1)",
    "0px 40px 80px rgba(0, 0, 0, 0.1)",
    "0px 42px 84px rgba(0, 0, 0, 0.1)",
    "0px 44px 88px rgba(0, 0, 0, 0.1)",
    "0px 46px 92px rgba(0, 0, 0, 0.1)",
    "0px 48px 96px rgba(0, 0, 0, 0.1)", // Added shadow for elevation 24
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          scrollBehavior: "smooth",
        },
        body: {
          transition: "background-color 0.2s ease",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 20,
          paddingRight: 20,
          boxShadow: "0px 4px 10px rgba(27, 94, 32, 0.15)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0px 6px 15px rgba(27, 94, 32, 0.2)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        },
        contained: {
          "&.Mui-disabled": {
            backgroundColor: alpha(colors.primary.main, 0.4),
            color: "white",
          },
        },
        outlined: {
          borderWidth: 2,
          "&:hover": {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.1)",
            transform: "translateY(-5px)",
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
          "&:last-child": {
            paddingBottom: 24,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
        elevation1: {
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)",
        },
        elevation2: {
          boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.07)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 10,
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderWidth: 2,
            },
            "& .MuiOutlinedInput-input": {
              padding: "14px 16px",
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&.Mui-selected": {
            backgroundColor: alpha(colors.primary.main, 0.12),
          },
          "&:hover": {
            backgroundColor: alpha(colors.primary.main, 0.08),
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          borderRadius: "8px 8px 0 0",
          transition: "all 0.2s",
          "&.Mui-selected": {
            fontWeight: 600,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "12px 20px",
        },
        head: {
          fontWeight: 600,
          backgroundColor: alpha(colors.primary.main, 0.05),
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          height: 6,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: alpha(colors.text.primary, 0.9),
          borderRadius: 8,
          fontSize: "0.75rem",
          padding: "8px 12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        },
        arrow: {
          color: alpha(colors.text.primary, 0.9),
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: alpha(colors.text.primary, 0.1),
        },
      },
    },
  },
});

export default theme;
