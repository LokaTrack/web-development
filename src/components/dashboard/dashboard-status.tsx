import { Card, CardContent, Grid, Typography } from "@mui/material";
import {
  PackageListProps,
  TrackerListProps,
  UserListProps,
} from "../../props/props";
import {
  Group,
  Inventory2,
  LocalShipping,
  LocationOn,
} from "@mui/icons-material";

interface DashboardStatusProps {
  error: string | null;
  isLoading: boolean;
  userList: UserListProps[];
  trackerList: TrackerListProps[];
  packageList: PackageListProps[];
}

export default function DashboardStatus({
  error,
  isLoading,
  userList,
  trackerList,
  packageList,
}: DashboardStatusProps) {
  return (
    <Grid container spacing={2}>
      {/* Total Packages */}
      <Grid size={3} container>
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Grid
              container
              alignItems={"center"}
              justifyContent={"space-between"}
              direction={"row"}
            >
              <Grid>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Total Packages
                </Typography>
                {isLoading ? (
                  <Typography
                    variant="h5"
                    component="div"
                    gutterBottom
                    sx={{ opacity: 0.6 }}
                  >
                    Grid Loading...
                  </Typography>
                ) : error ? (
                  <Typography
                    variant="body2"
                    component="div"
                    gutterBottom
                    color="error"
                  >
                    Error loading data
                  </Typography>
                ) : (
                  <Typography variant="h5" component="div" gutterBottom>
                    {packageList.length}
                  </Typography>
                )}
              </Grid>
              <Inventory2 sx={{ fontSize: 40, opacity: isLoading ? 0.5 : 1 }} />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {/* Active Deliveries */}
      <Grid size={3} container>
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Grid
              container
              alignItems={"center"}
              justifyContent={"space-between"}
              direction={"row"}
            >
              <Grid>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Active Deliveries
                </Typography>
                {isLoading ? (
                  <Typography
                    variant="h5"
                    component="div"
                    gutterBottom
                    sx={{ opacity: 0.6 }}
                  >
                    Loading...
                  </Typography>
                ) : error ? (
                  <Typography
                    variant="body2"
                    component="div"
                    gutterBottom
                    color="error"
                  >
                    Error loading data
                  </Typography>
                ) : (
                  <Typography variant="h5" component="div" gutterBottom>
                    {
                      packageList.filter(
                        (pkg) =>
                          pkg.deliveryStatus !== "Check-out" &&
                          pkg.deliveryStatus !== "Return",
                      ).length
                    }
                  </Typography>
                )}
              </Grid>
              <LocalShipping
                sx={{ fontSize: 40, opacity: isLoading ? 0.5 : 1 }}
              />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {/* Active Trackers */}
      <Grid size={3} container>
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Grid
              container
              alignItems={"center"}
              justifyContent={"space-between"}
              direction={"row"}
            >
              <Grid>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Active Trackers
                </Typography>
                {isLoading ? (
                  <Typography
                    variant="h5"
                    component="div"
                    gutterBottom
                    sx={{ opacity: 0.6 }}
                  >
                    Loading...
                  </Typography>
                ) : error ? (
                  <Typography
                    variant="body2"
                    component="div"
                    gutterBottom
                    color="error"
                  >
                    Error loading data
                  </Typography>
                ) : (
                  <Typography variant="h5" component="div" gutterBottom>
                    {trackerList.length}
                  </Typography>
                )}
              </Grid>
              <LocationOn sx={{ fontSize: 40, opacity: isLoading ? 0.5 : 1 }} />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      {/* Total Drivers */}
      <Grid size={3} container>
        <Card sx={{ width: "100%" }}>
          <CardContent>
            <Grid
              container
              alignItems={"center"}
              justifyContent={"space-between"}
              direction={"row"}
            >
              <Grid>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Total Drivers
                </Typography>
                {isLoading ? (
                  <Typography
                    variant="h5"
                    component="div"
                    gutterBottom
                    sx={{ opacity: 0.6 }}
                  >
                    Loading...
                  </Typography>
                ) : error ? (
                  <Typography
                    variant="body2"
                    component="div"
                    gutterBottom
                    color="error"
                  >
                    Error loading data
                  </Typography>
                ) : (
                  <Typography variant="h5" component="div" gutterBottom>
                    {userList.length}
                  </Typography>
                )}
              </Grid>
              <Group sx={{ fontSize: 40, opacity: isLoading ? 0.5 : 1 }} />
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
