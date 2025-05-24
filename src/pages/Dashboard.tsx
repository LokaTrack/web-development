import { useEffect, useState } from "react";
import {
  PackageListProps,
  TrackerListProps,
  UserListProps,
} from "../props/props";
import {
  fetchPackageList,
  fetchTrackerList,
  fetchUserList,
} from "../hooks/hooks";
import { Box, Grid, Paper, Typography } from "@mui/material";
import DashboardStatus from "../components/dashboard/dashboard-status";
import DashboardDriverList from "../components/dashboard/dashboard-driver-list";
import DashboardTrackerList from "../components/dashboard/dashboard-tracker-list";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trackerList, setTrackerList] = useState<TrackerListProps[]>([]);
  const [userList, setUserList] = useState<UserListProps[]>([]);
  const [packageList, setPackageList] = useState<PackageListProps[]>([]);

  useEffect(() => {
    fetchTrackerList(setTrackerList, setIsLoading, setError);
    fetchUserList(setUserList, setIsLoading, setError);
    fetchPackageList(setPackageList, setIsLoading, setError);
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
            Package Management
          </Typography>
          <Typography>
            Packages monitoring and management system for your trackers.
          </Typography>
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
      {/* Dashboard Status */}
      <Box>
        <DashboardStatus
          error={error}
          isLoading={isLoading}
          userList={userList}
          trackerList={trackerList}
          packageList={packageList}
        />
      </Box>
      {/* Dashboard Driver List */}
      <Box>
        <Grid container spacing={2} direction={"row"}>
          <Grid size={8} container>
            <DashboardDriverList
              packageList={packageList}
              userList={userList}
            />
          </Grid>
          <Grid size={4} container>
            <DashboardTrackerList
              trackerList={trackerList}
              userList={userList}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
