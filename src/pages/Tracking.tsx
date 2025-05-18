import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  TextField,
  InputAdornment,
  Alert,
  Button,
  Tooltip,
} from "@mui/material";
import {
  MyLocation,
  DirectionsCar,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon,
} from "@mui/icons-material";
import { mockTrackers } from "../utils/mockData";
import StatusIndicator from "../components/StatusIndicator";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { TrackerApiResponse } from "../types/api";
import L from "leaflet";
import { styled } from "@mui/material/styles";

// Fix Leaflet marker icon issue
// This is needed because Leaflet's default icon path is broken in React builds
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom Leaflet marker icon
const customIcon = L.divIcon({
  className: "custom-marker-icon",
  html: `<div style="background-color: #1976d2; border-radius: 50%; width: 24px; height: 24px; border: 3px solid white; box-shadow: 0 0 8px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; color: white;"><span>📍</span></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

// Component to automatically center and zoom the map when the tracked point changes
function MapUpdater({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (center[0] !== 0 && center[1] !== 0) {
      map.flyTo(center, zoom, {
        duration: 1.5,
      });
    }
  }, [center, zoom, map]);

  return null;
}

// Styled ListItem dengan warna background yang lebih cocok untuk item yang dipilih
const TrackerItem = styled(ListItem)<{ selected: boolean }>(
  ({ theme, selected }) => ({
    borderRadius: theme.shape.borderRadius * 2,
    marginBottom: theme.spacing(1),
    backgroundColor: selected ? "#2e7d32" : "transparent", // Warna hijau yang lebih gelap dan cocok
    color: selected ? "white" : "inherit",
    "&:hover": {
      backgroundColor: selected ? "#1b5e20" : theme.palette.action.hover, // Hover color yang lebih gelap
    },
    "& .MuiListItemText-primary": {
      color: selected ? "white" : theme.palette.text.primary,
    },
    "& .MuiListItemText-secondary": {
      color: selected
        ? "rgba(255, 255, 255, 0.85)"
        : theme.palette.text.secondary,
    },
    transition: "background-color 0.3s ease", // Transisi halus saat perubahan warna
  }),
);

const Tracking = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTrackerId, setSelectedTrackerId] = useState("lokatrack-gps-1"); // Set default tracker ID
  const [filteredTrackers, setFilteredTrackers] = useState(mockTrackers);
  const [trackerLocation, setTrackerLocation] = useState<{
    latitude: number;
    longitude: number;
    lastUpdate: string;
    trackerName: string;
    username: string;
    phoneNumber: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-6.2, 106.8]); // Default: Jakarta
  const [mapZoom, setMapZoom] = useState(12);

  const apiUrl = import.meta.env.VITE_API_URL;
  const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
  const fetchIntervalRef = useRef<number | null>(null);

  const fetchTrackerLocation = async (trackerId: string) => {
    setError(null);
    setIsLoading(true);

    try {
      // Use real backend API
      const response = await fetch(`${apiUrl}/trackers/${trackerId}`, {
        method: "GET",
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data: TrackerApiResponse = await response.json();

      if (data.status === "success" && data.data) {
        setTrackerLocation({
          latitude: data.data.location.latitude,
          longitude: data.data.location.longitude,
          lastUpdate: data.data.lastUpdate,
          trackerName: data.data.trackerName,
          username: data.data.username,
          phoneNumber: data.data.phoneNumber,
        });

        // Update map center and zoom level
        setMapCenter([
          data.data.location.latitude,
          data.data.location.longitude,
        ]);
        setMapZoom(15); // Zoom in when tracking
      } else {
        throw new Error(data.message || "Failed to get tracker data");
      }
    } catch (err) {
      console.error("Error fetching tracker location:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch tracker location",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Load data when component mounts
    const timer = setTimeout(() => {
      if (mockTrackers.length > 0) {
        fetchTrackerLocation(selectedTrackerId);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Set up periodic fetching for the selected tracker
    if (selectedTrackerId) {
      // Fetch immediately when selected
      fetchTrackerLocation(selectedTrackerId);

      // Then set up interval
      if (fetchIntervalRef.current) {
        window.clearInterval(fetchIntervalRef.current);
      }

      fetchIntervalRef.current = window.setInterval(() => {
        fetchTrackerLocation(selectedTrackerId);
      }, 30000); // Fetch every 30 seconds
    }

    return () => {
      if (fetchIntervalRef.current) {
        window.clearInterval(fetchIntervalRef.current);
        fetchIntervalRef.current = null;
      }
    };
  }, [selectedTrackerId]);

  useEffect(() => {
    // Filter trackers based on search term
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      const filtered = mockTrackers.filter(
        (tracker) =>
          tracker.name.toLowerCase().includes(term) ||
          tracker.deviceId.toLowerCase().includes(term) ||
          (tracker.assignedTo &&
            tracker.assignedTo.driverName.toLowerCase().includes(term)),
      );
      setFilteredTrackers(filtered);
    } else {
      setFilteredTrackers(mockTrackers);
    }
  }, [searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleTrackerSelect = (trackerId: string) => {
    setSelectedTrackerId(trackerId);
  };

  const getSelectedTracker = () => {
    return mockTrackers.find((tracker) => tracker.id === selectedTrackerId);
  };

  const handleRefreshLocation = () => {
    if (selectedTrackerId) {
      fetchTrackerLocation(selectedTrackerId);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
  };

  const selectedTracker = getSelectedTracker();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Live Tracking
      </Typography>

      <Grid container spacing={3}>
        {/* Tracker list sidebar */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 3,
              height: "78vh",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              Trackers
            </Typography>

            <TextField
              fullWidth
              placeholder="Search trackers..."
              size="small"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ flexGrow: 1, overflow: "auto" }}>
              <List disablePadding>
                <Box>
                  <TrackerItem
                    button
                    selected={selectedTrackerId === "lokatrack-gps-1"}
                    onClick={() => handleTrackerSelect("lokatrack-gps-1")}
                  >
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          bgcolor:
                            selectedTrackerId === "lokatrack-gps-1"
                              ? "white"
                              : "primary.main",
                          color:
                            selectedTrackerId === "lokatrack-gps-1"
                              ? "success.main"
                              : "white",
                        }}
                      >
                        <MyLocation />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        trackerLocation?.trackerName ||
                        "GPS Tracker lokatrack-gps-1"
                      }
                      secondary={
                        <Box
                          sx={{
                            mt: 0.5,
                            display: "flex",
                            flexDirection: "column",
                            gap: 0.5,
                          }}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: "inherit",
                              fontWeight:
                                selectedTrackerId === "lokatrack-gps-1"
                                  ? "medium"
                                  : "normal",
                            }}
                          >
                            ID: lokatrack-gps-1
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "inherit",
                              fontWeight:
                                selectedTrackerId === "lokatrack-gps-1"
                                  ? "medium"
                                  : "normal",
                            }}
                          >
                            Driver:{" "}
                            {trackerLocation?.username || "Budi Lokatrack"}
                          </Typography>
                          <Box
                            sx={{
                              mt: 0.5,
                              backgroundColor:
                                selectedTrackerId === "lokatrack-gps-1"
                                  ? "rgba(255,255,255,0.2)"
                                  : "transparent",
                              borderRadius: 1,
                              display: "inline-block",
                              px: 0.5,
                            }}
                          >
                            <StatusIndicator status={"active"} />
                          </Box>
                        </Box>
                      }
                    />
                  </TrackerItem>
                  <Divider variant="inset" component="li" />
                </Box>
                {filteredTrackers.map((tracker) => (
                  <Box key={tracker.id}>
                    <TrackerItem
                      button
                      selected={selectedTrackerId === tracker.id}
                      onClick={() => handleTrackerSelect(tracker.id)}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            bgcolor:
                              selectedTrackerId === tracker.id
                                ? "white"
                                : "primary.main",
                            color:
                              selectedTrackerId === tracker.id
                                ? "success.main"
                                : "white",
                          }}
                        >
                          <MyLocation />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={tracker.name}
                        secondary={
                          <Box
                            sx={{
                              mt: 0.5,
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.5,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: "inherit",
                                fontWeight:
                                  selectedTrackerId === tracker.id
                                    ? "medium"
                                    : "normal",
                              }}
                            >
                              ID: {tracker.deviceId}
                            </Typography>
                            {tracker.assignedTo ? (
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "inherit",
                                  fontWeight:
                                    selectedTrackerId === tracker.id
                                      ? "medium"
                                      : "normal",
                                }}
                              >
                                Driver: {tracker.assignedTo.driverName}
                              </Typography>
                            ) : (
                              <Typography
                                variant="body2"
                                sx={{
                                  color:
                                    selectedTrackerId === tracker.id
                                      ? "rgba(255, 255, 255, 0.8)"
                                      : "error.main",
                                  fontWeight:
                                    selectedTrackerId === tracker.id
                                      ? "medium"
                                      : "normal",
                                }}
                              >
                                Not assigned
                              </Typography>
                            )}
                            <Box
                              sx={{
                                mt: 0.5,
                                backgroundColor:
                                  selectedTrackerId === tracker.id
                                    ? "rgba(255,255,255,0.2)"
                                    : "transparent",
                                borderRadius: 1,
                                display: "inline-block",
                                px: 0.5,
                              }}
                            >
                              <StatusIndicator status={tracker.status} />
                            </Box>
                          </Box>
                        }
                      />
                    </TrackerItem>
                    <Divider variant="inset" component="li" />
                  </Box>
                ))}
              </List>
            </Box>
          </Paper>
        </Grid>

        {/* Map area */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 0,
              borderRadius: 3,
              height: "78vh",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Error message if API fetch fails */}
            {error && (
              <Alert
                severity="error"
                sx={{ m: 2 }}
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={handleRefreshLocation}
                  >
                    Retry
                  </Button>
                }
              >
                {error}
              </Alert>
            )}

            {/* Loading indicator */}
            {isLoading && (
              <LinearProgress
                color="primary"
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 1001,
                }}
              />
            )}

            {/* Refresh button and last updated info */}
            <Box
              sx={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 1000,
                backgroundColor: "white",
                borderRadius: 2,
                boxShadow: 3,
                p: 1,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {trackerLocation
                  ? `Last update: ${formatTimestamp(
                      trackerLocation.lastUpdate,
                    )}`
                  : "No data"}
              </Typography>
              <Tooltip title="Refresh location data">
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handleRefreshLocation}
                  startIcon={<RefreshIcon />}
                  disabled={isLoading}
                >
                  Refresh
                </Button>
              </Tooltip>
            </Box>

            {/* Interactive Map */}
            <Box sx={{ flexGrow: 1, position: "relative", zIndex: 0 }}>
              <MapContainer
                center={mapCenter}
                zoom={mapZoom}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapUpdater center={mapCenter} zoom={mapZoom} />

                {trackerLocation && (
                  <Marker
                    position={[
                      trackerLocation.latitude,
                      trackerLocation.longitude,
                    ]}
                    icon={customIcon}
                  >
                    <Popup>
                      <div
                        style={{
                          fontFamily: "Arial, sans-serif",
                          padding: "8px 0",
                        }}
                      >
                        <h3 style={{ margin: "0 0 8px 0", color: "#1976d2" }}>
                          {trackerLocation.trackerName}
                        </h3>
                        <div
                          style={{
                            padding: "8px",
                            backgroundColor: "#f5f5f5",
                            borderRadius: "4px",
                            marginBottom: "8px",
                          }}
                        >
                          <p style={{ margin: "4px 0", fontSize: "14px" }}>
                            <strong>Driver:</strong> {trackerLocation.username}
                          </p>
                          <p style={{ margin: "4px 0", fontSize: "14px" }}>
                            <strong>Phone:</strong>{" "}
                            {trackerLocation.phoneNumber}
                          </p>
                        </div>
                        <p style={{ margin: "4px 0", fontSize: "14px" }}>
                          <strong>Last Update:</strong>
                          <br />
                          {formatTimestamp(trackerLocation.lastUpdate)}
                        </p>
                        <p style={{ margin: "4px 0", fontSize: "14px" }}>
                          <strong>Coordinates:</strong>
                          <br />
                          {Math.abs(trackerLocation.latitude).toFixed(6)}°{" "}
                          {trackerLocation.latitude < 0 ? "S" : "N"},
                          {Math.abs(trackerLocation.longitude).toFixed(6)}°{" "}
                          {trackerLocation.longitude < 0 ? "W" : "E"}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                )}
              </MapContainer>
            </Box>

            {/* Tracker info panel */}
            {selectedTrackerId && trackerLocation && (
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "background.paper",
                  borderTop: 1,
                  borderColor: "divider",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <DirectionsCar color="primary" />
                      <Typography variant="subtitle1" fontWeight="medium">
                        {trackerLocation.trackerName}
                      </Typography>
                      <StatusIndicator status={"active"} />
                    </Box>
                    <Box
                      sx={{
                        mt: 1,
                        p: 1.5,
                        bgcolor: "background.default",
                        borderRadius: 2,
                        border: "1px solid rgba(0,0,0,0.1)",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 1,
                        }}
                      >
                        <span>Driver:</span>{" "}
                        <strong style={{ color: "#2e7d32" }}>
                          {trackerLocation.username || "Not assigned"}
                        </strong>
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>Phone:</span>{" "}
                        <strong style={{ color: "#2e7d32" }}>
                          {trackerLocation.phoneNumber || "No phone number"}
                        </strong>
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Registration Date:{" "}
                      <strong>
                        {formatTimestamp(trackerLocation.lastUpdate)}
                      </strong>
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <InfoIcon fontSize="small" color="action" />
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Location Info
                            </Typography>
                            <Typography variant="body1" fontWeight="medium">
                              {Math.abs(trackerLocation.latitude).toFixed(6)}°{" "}
                              {trackerLocation.latitude < 0 ? "S" : "N"},
                              {Math.abs(trackerLocation.longitude).toFixed(6)}°{" "}
                              {trackerLocation.longitude < 0 ? "W" : "E"}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Last updated{" "}
                              {formatTimestamp(trackerLocation.lastUpdate)}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Tracking;
