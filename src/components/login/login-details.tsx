import {
  DirectionsCar,
  LocationOn,
  Security,
  Speed,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

export default function LoginDetails() {
  return (
    <Grid
      size={6}
      container
      direction={"column"}
      alignContent={"center"}
      sx={{ padding: 4, backgroundColor: "#f5f9f5" }}
      spacing={1}
    >
      <Box sx={{ alignItems: "start", mb: 2 }}>
        <img
          src="/src/assets/images/lokatrack_logo.png"
          alt="LokaTrack Logo"
          style={{
            height: "80px",
            marginBottom: "16px",
          }}
        />
        <Typography variant="h4" color="primary" gutterBottom>
          LokaTrack Dashboard
        </Typography>
        <Typography variant="body1">
          Sistem pengiriman sayuran terintegrasi untuk monitoring lokasi, status
          pengiriman, dan pengelolaan driver secara real-time.
        </Typography>
      </Box>

      {/* Features in a column with smaller gap */}
      <Grid container direction="column" spacing={1}>
        <Grid size={12}>
          <Card sx={{ backgroundColor: "#f5f9f5" }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: "#e8f5e9" }}>
                  <LocationOn color="primary" />
                </Avatar>
                <Box>
                  <Typography variant="h6" color="primary">
                    Tracking Pengiriman Sayuran
                  </Typography>
                  <Typography variant="body2">
                    Pantau lokasi pengiriman sayuran segar secara real-time
                    dengan akurasi tinggi.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card sx={{ backgroundColor: "#f5f9f5" }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: "#e8f5e9" }}>
                  <Speed color="primary" />
                </Avatar>
                <Box>
                  <Typography variant="h6" color="primary">
                    Status Pengiriman
                  </Typography>
                  <Typography variant="body2">
                    Monitoring status paket dan hasil pengiriman sayuran dengan
                    detail.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card sx={{ backgroundColor: "#f5f9f5" }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: "#e8f5e9" }}>
                  <Security color="primary" />
                </Avatar>
                <Box>
                  <Typography variant="h6" color="primary">
                    Manajemen Alat Tracking
                  </Typography>
                  <Typography variant="body2">
                    Kelola semua perangkat tracking dengan mudah dalam satu
                    platform.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={12}>
          <Card sx={{ backgroundColor: "#f5f9f5" }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: "#e8f5e9" }}>
                  <DirectionsCar color="primary" />
                </Avatar>
                <Box>
                  <Typography variant="h6" color="primary">
                    Manajemen Driver
                  </Typography>
                  <Typography variant="body2">
                    Melihat dan mengelola data driver pengiriman sayuran secara
                    komprehensif.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
