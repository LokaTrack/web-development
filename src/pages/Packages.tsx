import { Box, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PackagesList from "../components/package/package-list";
import { PackageListProps, UserListProps } from "../props/props";
import { fetchPackageList, fetchUserList } from "../hooks/hooks";
import { useAuthGuard } from "../hooks/useAuth";

export default function Packages() {
  useAuthGuard();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [packageList, setPackageList] = useState<PackageListProps[]>([]);
  const [userList, setUserList] = useState<UserListProps[]>([]);

  // Fetch data
  useEffect(() => {
    fetchPackageList(setPackageList, setIsLoading, setError);
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
      {/* Table Packages */}
      <Box>
        <PackagesList packageList={packageList} userList={userList} />
      </Box>
    </Box>
  );
}
