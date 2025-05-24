import { Avatar, Card, Divider, Grid, Typography } from "@mui/material";
import { TrackerListProps } from "../../props/props";
import { UserListProps } from "../../props/props";

interface DriversListProps {
  trackerList: TrackerListProps[];
  userList: UserListProps[];
}

export default function DriversList({
  trackerList,
  userList,
}: DriversListProps) {
  return (
    <Grid direction={"row"} container spacing={2}>
      {userList.map((user) => (
        <Grid key={user.userId} size={4}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 2,
              margin: 1,
              backgroundColor: "#f5f5f5",
            }}
          >
            <Grid container direction={"column"} spacing={2}>
              <Grid
                container
                direction={"row"}
                spacing={1}
                alignItems={"center"}
              >
                <Avatar
                  alt={user.userData.username || "Unassgined"}
                  src={user.userData.profilePictureUrl || ""}
                  sx={{ width: 40, height: 40 }}
                />

                <Typography variant="h5">{user.userData.username}</Typography>
              </Grid>
              <Typography variant="body2">{`ID: ${user.userId}`}</Typography>
              <Divider sx={{ marginY: 1 }} />
              <Grid direction="column" container spacing={1}>
                <Typography variant="h6">Assigned to:</Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    sx={{ minHeight: 48 }}
                  >
                    <Typography variant="body1">
                      {user.userData.trackerId
                        ? trackerList.find(
                            (tracker) =>
                              tracker.trackerId === user.userData.trackerId,
                          )?.trackerData.trackerName || "Unassigned"
                        : "Unassigned"}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
