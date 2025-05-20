import { Box, Paper } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { TrackerLocation } from "../../props/props";
import { Typography, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

// Handle map updates when the location changes
function MapUpdater({ location }: { location: TrackerLocation }) {
  const map = useMap();

  useEffect(() => {
    if (location) {
      map.setView([location.latitude, location.longitude], map.getZoom(), {
        animate: true,
        duration: 0.5,
      });
    }
  }, [map, location]);

  return null;
}

interface TrackerMapProps {
  error: string | null;
  isLoading: boolean;
  trackerLocation: TrackerLocation | null;
}

export default function TrackerMap({
  error,
  isLoading,
  trackerLocation,
}: TrackerMapProps) {
  return (
    <Paper
      sx={{
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        position: "relative",
      }}
    >
      {error ? (
        <Box
          sx={{
            textAlign: "center",
            p: 3,
            color: "error.main",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <Typography variant="h6" component="div" gutterBottom>
              Error
            </Typography>
            <Typography>{error}</Typography>
          </div>
        </Box>
      ) : isLoading ? (
        <Box
          sx={{
            textAlign: "center",
            p: 3,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <CircularProgress size={40} sx={{ color: "#2e7d32", mb: 2 }} />
            <Typography>Loading tracker location...</Typography>
          </div>
        </Box>
      ) : !trackerLocation ? (
        <Box
          sx={{
            textAlign: "center",
            p: 3,
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>No location data available.</Typography>
        </Box>
      ) : (
        <Box
          sx={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}
        >
          <MapContainer
            center={[trackerLocation.latitude, trackerLocation.longitude]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            {/* MapUpdater component will handle map updates when location changes */}
            <MapUpdater location={trackerLocation} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={[trackerLocation.latitude, trackerLocation.longitude]}
            >
              <Popup>
                Latitude: {trackerLocation.latitude.toFixed(6)}
                <br />
                Longitude: {trackerLocation.longitude.toFixed(6)}
              </Popup>
            </Marker>
          </MapContainer>
        </Box>
      )}
    </Paper>
  );
}
