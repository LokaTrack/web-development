import { useEffect, useState } from "react";
import { TrackerListProps, UserListProps } from "../props/props";
import { fetchTrackerList, fetchUserList } from "../hooks/hooks";
import { Box, Paper, Typography } from "@mui/material";
import DriversSearch from "../components/drivers/drivers-search";
import DriversList from "../components/drivers/drivers-list";

export default function Drivers() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trackerList, setTrackerList] = useState<TrackerListProps[]>([]);
  const [userList, setUserList] = useState<UserListProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUserList, setFilteredUserList] = useState<UserListProps[]>([]);

  useEffect(() => {
    fetchTrackerList(setTrackerList, setIsLoading, setError);
    fetchUserList(setUserList, setIsLoading, setError);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - 136px)",
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
            Drivers
          </Typography>
          <Typography>List drivers</Typography>
        </Paper>
      </Box>
      {error && (
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            backgroundColor: "#f8d7da",
            color: "#721c24",
            border: "1px solid #f5c6cb",
            margin: 2,
            borderRadius: 1,
          }}
        >
          <Typography variant="body1">{error}</Typography>
        </Paper>
      )}
      {isLoading && (
        <Paper
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
            backgroundColor: "#e9f6e5",
          }}
        >
          <Typography variant="body1">Loading...</Typography>
        </Paper>
      )}
      {/* Search Input */}
      <Box>
        <DriversSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          userList={userList}
          setFilteredUserList={setFilteredUserList}
        />
      </Box>
      {/* Drivers List */}
      <Box>
        <DriversList trackerList={trackerList} userList={filteredUserList} />
      </Box>
    </Box>
  );
}
