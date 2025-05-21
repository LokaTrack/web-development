import { useState, useEffect } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { TrackerListProps, UserListProps } from "../props/props";
import { fetchTrackerList, fetchUserList } from "../hooks/hooks";
import TrackerSearch from "../components/tracker/tracker-search";
import TrackerAssign from "../components/tracker/tracker-assign";

function Trackers() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trackerList, setTrackerList] = useState<TrackerListProps[]>([]);
  const [userList, setUserList] = useState<UserListProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTrackerList, setFilteredTrackerList] = useState<
    TrackerListProps[]
  >([]);

  // Fetch data
  useEffect(() => {
    fetchTrackerList(setTrackerList, setIsLoading, setError);
    fetchUserList(setUserList, setIsLoading, setError);
  }, []);

  // Filter trackers based on search term
  useEffect(() => {
    const filtered = trackerList.filter((tracker) =>
      tracker.trackerData.trackerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
    );
    setFilteredTrackerList(filtered);
  }, [searchTerm, trackerList]);


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 136px)",
        overflow: "hidden",
        gap: 4,
      }}
    >
      {/* Header */}
      <Box>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            justifyContent: "space-between",
            alignItems: "left",
            padding: 4,
            backgroundColor: "#e9f6e5",
          }}
        >
          <Typography variant="h2" sx={{ color: "#254e1c" }}>
            Tracker Management
          </Typography>
          <Typography>
            Monitor and manage all your tracking devices from a single
            dashboard. Assign trackers to drivers and monitor their status in
            real-time.
          </Typography>
        </Paper>
      </Box>
      {/* Search Input */}
      <Box>
        <TrackerSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          trackerList={trackerList}
          setFilteredTrackerList={setFilteredTrackerList}
        />
      </Box>
      {/* Tracker List */}
      <Box>
        <TrackerAssign
          trackerList={filteredTrackerList}
          userList={userList}
          setError={setError}
          setIsLoading={setIsLoading}
        />
      </Box>
    </Box>
  );
}

export default Trackers;
