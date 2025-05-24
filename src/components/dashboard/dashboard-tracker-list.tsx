import { Divider, List, ListItem, ListItemText, Paper } from "@mui/material";
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
    <Paper>
      <List sx={{ width: "100%" }}>
        {trackerList.map((tracker) => {
          const assignedUser = userList.find(
            (user) => user.userData.trackerId === tracker.trackerId,
          );
          return (
            <>
              <ListItem key={tracker.trackerId}>
                <ListItemText
                  primary={tracker.trackerData.trackerName}
                  secondary={
                    assignedUser ? assignedUser.userData.username : "Unassigned"
                  }
                />
              </ListItem>
              <Divider />
            </>
          );
        })}
      </List>
    </Paper>
  );
}
