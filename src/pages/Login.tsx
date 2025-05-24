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
import LoginDetails from "../components/login/login-details";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event: React.MouseEvent<SVGSVGElement>) => {
    event.preventDefault();
  };

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
            spacing={2}
            sx={{ padding: 4 }}
          >
            <Grid
              container
              direction={"column"}
              alignItems={"center"}
              spacing={0}
            >
              <Typography variant="h4">Selamat Datang Kembali</Typography>
              <Typography variant="body1" gutterBottom>
                Silakan masuk ke akun Anda untuk melanjutkan.{" "}
              </Typography>
            </Grid>
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
            <Button variant="contained" color="primary" fullWidth>
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
