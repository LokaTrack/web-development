import {
  ArrowForward,
  LockOutline,
  MailOutline,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginDetails from "../components/login/login-details";
import { sendLogin } from "../hooks/hooks";
import { useLoginRedirect } from "../hooks/useAuth";

export default function Login() {
  // Redirect authenticated users to dashboard
  useLoginRedirect();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
  };

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check if form is valid
  const isFormValid = isValidEmail(email) && password.length > 0;

  async function handleSubmit() {
    const loginResult = await sendLogin(
      email,
      password,
      setIsLoading,
      setError,
    );

    if (loginResult && loginResult.token) {
      localStorage.setItem("token", loginResult.token);
      navigate("/");
    }
  }

  return (
    <Box
      sx={{
        maxWidth: "64rem",
        margin: "auto",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ width: "100%" }}>
        <Grid container spacing={2} alignItems="center">
          <LoginDetails />
          <Grid
            size={6}
            container
            direction={"column"}
            alignContent={"center"}
            alignItems={"center"}
            spacing={3}
            sx={{ padding: 4 }}
          >
            <Grid
              container
              direction={"column"}
              alignItems={"center"}
              spacing={1}
            >
              <Typography variant="h4">Selamat Datang Kembali</Typography>
              <Typography variant="body1" gutterBottom>
                Silakan masuk ke akun Anda untuk melanjutkan.{" "}
              </Typography>
            </Grid>

            {error && (
              <Box
                sx={{
                  width: "100%",
                  padding: 1.5,
                  backgroundColor: "#ffeaa7",
                  color: "#d63031",
                  borderRadius: 1,
                  border: 1,
                  borderColor: "#fdcb6e",
                  textAlign: "center",
                }}
              >
                <Typography variant="body2">{error}</Typography>
              </Box>
            )}
            {isLoading && (
              <Box
                sx={{
                  width: "100%",
                  padding: 1.5,
                  backgroundColor: "#e8f5e8",
                  color: "#2e7d32",
                  borderRadius: 1,
                  border: 1,
                  borderColor: "#4caf50",
                  textAlign: "center",
                }}
              >
                <Typography variant="body2">Sedang memproses...</Typography>
              </Box>
            )}

            <TextField
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutline />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutline />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPassword ? (
                        <VisibilityOff
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <Visibility
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
              disabled={isLoading || !isFormValid}
            >
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                spacing={1}
              >
                <Typography variant="button" color="white">
                  Masuk
                </Typography>
                <ArrowForward />
              </Grid>
            </Button>
            <Typography variant="body2" color="textSecondary">
              LokaTrack &copy; 2025 | GPS Tracking Solution
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
