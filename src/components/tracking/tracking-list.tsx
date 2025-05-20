import {
  Paper,
  List,
  ListItem,
  ListItemText,
  styled,
  ListItemAvatar,
  Avatar,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { TrackerListProps } from "../../props/props";
import { MyLocation } from "@mui/icons-material";

// Just a custom styled component for the ListItem
const ListTrackerItem = styled(ListItem)<{ selected: boolean }>(
  ({ theme, selected }) => ({
    borderRadius: theme.shape.borderRadius * 2,
    marginBottom: theme.spacing(1.5),
    backgroundColor: selected ? "rgba(46, 125, 50, 0.9)" : "#f8f9fa",
    color: selected ? "white" : "inherit",
    cursor: "pointer",
    border: selected ? "none" : "1px solid rgba(0, 0, 0, 0.08)",
    boxShadow: selected
      ? "0 4px 12px rgba(46, 125, 50, 0.4)"
      : "0 2px 6px rgba(0, 0, 0, 0.04)",
    "&:hover": {
      backgroundColor: selected ? "rgba(46, 125, 50, 1)" : "#ffffff",
      boxShadow: selected
        ? "0 6px 14px rgba(46, 125, 50, 0.5)"
        : "0 4px 10px rgba(0, 0, 0, 0.1)",
      transform: "translateY(-2px)",
    },
    "& .MuiListItemText-primary": {
      color: selected ? "white" : theme.palette.text.primary,
      fontWeight: 600,
      fontSize: "1rem",
      marginBottom: "4px",
    },
    "& .MuiListItemText-secondary": {
      color: selected
        ? "rgba(255, 255, 255, 0.85)"
        : theme.palette.text.secondary,
    },
    transition: "all 0.25s ease",
    padding: "16px",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: "4px",
      backgroundColor: selected ? "white" : "#2e7d32",
      transition: "all 0.25s ease",
    },
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
  }),
);

interface TrackingListProps {
  isLoading: boolean;
  error: string | null;
  trackerList: TrackerListProps[];
  selectedTrackerId: string | null;
  onTrackerSelect: (trackerId: string) => void;
}

export default function TrackingList({
  isLoading,
  error,
  trackerList,
  selectedTrackerId,
  onTrackerSelect,
}: TrackingListProps) {
  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        justifyContent:
          isLoading || error || trackerList.length === 0
            ? "center"
            : "flex-start",
        alignItems:
          isLoading || error || trackerList.length === 0 ? "center" : "stretch",
      }}
    >
      {error ? (
        <Box sx={{ textAlign: "center", p: 3, color: "error.main" }}>
          <Typography variant="h6" component="div" gutterBottom>
            Error
          </Typography>
          <Typography>{error}</Typography>
        </Box>
      ) : isLoading ? (
        <Box sx={{ textAlign: "center", p: 3 }}>
          <CircularProgress size={40} sx={{ color: "#2e7d32", mb: 2 }} />
          <Typography>Loading trackers...</Typography>
        </Box>
      ) : trackerList.length === 0 ? (
        <Box sx={{ textAlign: "center", p: 3 }}>
          <Typography>No trackers available.</Typography>
        </Box>
      ) : (
        <Box sx={{ overflow: "auto", height: "100%", width: "100%" }}>
          <List
            sx={{
              width: "100%",
              padding: 0,
            }}
          >
            {trackerList.map((tracker) => {
              const isSelected = tracker.trackerId === selectedTrackerId;

              return (
                <ListTrackerItem
                  key={tracker.trackerId}
                  selected={isSelected}
                  onClick={() => onTrackerSelect(tracker.trackerId)}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: isSelected ? "white" : "#2e7d32",
                        color: isSelected ? "#2e7d32" : "white",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                        width: 48,
                        height: 48,
                        transition: "all 0.25s ease",
                      }}
                    >
                      <MyLocation />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                      >
                        <Typography
                          variant="subtitle1"
                          component="span"
                          sx={{
                            fontWeight: 600,
                            color: isSelected ? "white" : "inherit",
                          }}
                        >
                          {tracker.trackerData.trackerName}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Typography
                        variant="body2"
                        component="span"
                        sx={{
                          fontSize: "0.85rem",
                          color: isSelected
                            ? "rgba(255, 255, 255, 0.85)"
                            : "text.secondary",
                        }}
                      >
                        ID: {tracker.trackerId}
                      </Typography>
                    }
                  />
                </ListTrackerItem>
              );
            })}
          </List>
        </Box>
      )}
    </Paper>
  );
}
