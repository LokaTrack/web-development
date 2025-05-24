import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchTrackerList } from "../hooks/hooks";
import { TrackerListProps, TrackerLocation } from "../props/props";
import TrackingList from "../components/tracking/tracking-list";
import TrackingMap from "../components/tracking/tracking-map";
import {
  connectSocket,
  disconnectSocket,
  subscribeToTracker,
  unsubscribeFromTracker,
} from "../socket";
import { useAuthGuard } from "../hooks/useAuth";

export default function Tracking() {
  // Authentication guard - redirects to login if not authenticated
  useAuthGuard();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trackerList, setTrackerList] = useState<TrackerListProps[]>([]);
  const [selectedTrackerId, setSelectedTrackerId] = useState<string | null>(
    null,
  );

  // Fetch data
  useEffect(() => {
    fetchTrackerList(setTrackerList, setIsLoading, setError);
  }, []);

  // Set default selected tracker
  useEffect(() => {
    if (trackerList.length > 0 && !selectedTrackerId) {
      setSelectedTrackerId(trackerList[0].trackerId);
    }
  }, [trackerList, selectedTrackerId]);

  // Socket connection effect
  useEffect(() => {
    // Handler for location updates received via socket
    const handleLocationUpdate = (
      trackerId: string,
      location: TrackerLocation,
    ) => {
      setTrackerList((currentList) =>
        currentList.map((tracker) =>
          tracker.trackerId === trackerId ? { ...tracker, location } : tracker,
        ),
      );
    };

    // Connect to socket
    connectSocket(handleLocationUpdate);

    // Cleanup: disconnect from socket when component unmounts
    return () => {
      disconnectSocket();
    };
  }, []);

  // Subscribe to selected tracker
  useEffect(() => {
    // Only subscribe if we have a selected tracker
    if (selectedTrackerId) {
      // Unsubscribe from all trackers first (optional, depends on your backend implementation)
      trackerList.forEach((tracker) => {
        unsubscribeFromTracker(tracker.trackerId);
      });

      // Subscribe to the selected tracker
      subscribeToTracker(selectedTrackerId);
    }
  }, [selectedTrackerId, trackerList]);

  // Handle tracker selection
  function handleTrackerSelect(trackerId: string) {
    setSelectedTrackerId(trackerId);
  }

  // Find the selected tracker's location
  const selectedTracker = trackerList.find(
    (tracker) => tracker.trackerId === selectedTrackerId,
  );
  const trackerLocation = selectedTracker?.trackerData.location || null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 136px)", // Adjust height to leave space for header/footer
        overflow: "hidden", // Prevent scrolling in the main container
        p: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Live Tracking
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{
          flexGrow: 1,
          height: "calc(100% - 48px)", // Subtract the space used by the Typography + gutterBottom
          overflow: "hidden", // Prevent scrolling in the Grid container
        }}
      >
        <Grid size={4} sx={{ height: "100%", paddingTop: "12px" }}>
          <TrackingList
            isLoading={isLoading}
            error={error}
            trackerList={trackerList}
            selectedTrackerId={selectedTrackerId}
            onTrackerSelect={handleTrackerSelect}
          />
        </Grid>
        <Grid size={8} sx={{ height: "100%", paddingTop: "12px" }}>
          <TrackingMap
            isLoading={isLoading}
            error={error}
            trackerLocation={trackerLocation}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
