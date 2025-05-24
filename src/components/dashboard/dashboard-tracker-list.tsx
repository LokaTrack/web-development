import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { TrackerListProps, UserListProps } from "../../props/props";

interface DashboardTrackerListPageProps {
  trackerList: TrackerListProps[];
  userList: UserListProps[];
}

export default function DashboardTrackerList({
  trackerList,
  userList,
}: DashboardTrackerListPageProps) {
  return (
    <Paper sx={{ width: "100%" }}>
      <List sx={{ width: "100%" }}>
        {trackerList.map((tracker, index) => {
          const assignedUser = userList.find(
            (user) => user.userData.trackerId === tracker.trackerId,
          );
          return (
            <Box key={tracker.trackerId}>
              <ListItem>
                <ListItemText
                  primary={tracker.trackerData.trackerName}
                  secondary={
                    assignedUser ? assignedUser.userData.username : "Unassigned"
                  }
                />
              </ListItem>
              {index < trackerList.length - 1 && <Divider />}
            </Box>
          );
        })}
      </List>
    </Paper>
  );
}
