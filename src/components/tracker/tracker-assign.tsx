import {
  Avatar,
  Button,
  Card,
  Dialog,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { TrackerListProps, UserListProps } from "../../props/props";
import { useState } from "react";

interface TrackerAssignProps {
  trackerList: TrackerListProps[];
  userList: UserListProps[];
}

export default function TrackerAssign({
  trackerList,
  userList,
}: TrackerAssignProps) {
  const [openDialog, setOpenDialog] = useState(false);
  const [userSearch, setUserSearch] = useState("");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Grid direction={"row"} container spacing={2}>
      {trackerList.map((tracker) => (
        <Grid key={tracker.trackerId} size={4}>
          <Card
            key={tracker.trackerId}
            sx={{
              display: "flex",
              flexDirection: "column",
              padding: 2,
              margin: 1,
              backgroundColor: "#f5f5f5",
            }}
          >
            <Grid container direction={"column"} spacing={2}>
              <Grid key={tracker.trackerId}>
                <Typography variant="h5">
                  {tracker.trackerData.trackerName}
                </Typography>
                <Typography variant="body2">
                  {`ID: ${tracker.trackerId}`}
                </Typography>
              </Grid>
              <Divider sx={{ marginY: 1 }} />
              <Grid
                key={tracker.trackerId}
                direction="column"
                container
                spacing={1}
              >
                <Typography variant="h6">Assigned to:</Typography>
                <Grid container spacing={2} alignItems="center">
                  {(() => {
                    const assignedUser = userList.find(
                      (user) => user.userData.trackerId === tracker.trackerId,
                    );

                    return (
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        sx={{ minHeight: 48 }}
                      >
                        <Avatar
                          alt={assignedUser?.userData.username || "Unassigned"}
                          src={assignedUser?.userData.profilePictureUrl || ""}
                          sx={{ width: 40, height: 40 }}
                        />
                        <Typography variant="body1">
                          {assignedUser
                            ? assignedUser.userData.username
                            : "Unassigned"}
                        </Typography>
                      </Grid>
                    );
                  })()}
                </Grid>
              </Grid>
              <Button variant="outlined" onClick={handleOpenDialog}>
                Edit
              </Button>
              <Dialog open={openDialog} onClose={handleCloseDialog}>
                <Grid
                  container
                  direction="column"
                  spacing={2}
                  sx={{ p: 3, minWidth: 600 }}
                >
                  <Typography variant="h6">Assign Tracker:</Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    {tracker.trackerData.trackerName}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Select a user to assign:
                  </Typography>
                  <TextField
                    label="Search users"
                    onChange={(e) => setUserSearch(e.target.value)}
                    value={userSearch}
                  />
                  <Grid
                    container
                    direction="column"
                    spacing={1}
                    sx={{
                      minHeight: 230,
                    }}
                  >
                    <Button fullWidth variant="outlined" color="secondary">
                      Unassigned
                    </Button>
                    {userList
                      .filter((user) =>
                        user.userData.username
                          .toLowerCase()
                          .includes(userSearch.toLowerCase()),
                      )
                      .slice(0, 3)
                      .map((user) => (
                        <Button
                          key={user.userId}
                          fullWidth
                          variant="outlined"
                          startIcon={
                            <Avatar
                              alt={user.userData.username}
                              src={user.userData.profilePictureUrl || ""}
                              sx={{ width: 28, height: 28 }}
                            />
                          }
                        >
                          {user.userData.username}
                        </Button>
                      ))}
                  </Grid>
                  <Button
                    onClick={handleCloseDialog}
                    sx={{ mt: 2 }}
                    color="primary"
                  >
                    Close
                  </Button>
                </Grid>
              </Dialog>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
