import { useEffect } from "react";
import { TrackerListProps } from "../../props/props";
import { Paper, TextField } from "@mui/material";

export default function TrackerSearch({
  searchTerm,
  setSearchTerm,
  trackerList,
  setFilteredTrackerList,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  trackerList: TrackerListProps[];
  setFilteredTrackerList: (list: TrackerListProps[]) => void;
}) {
  // Filter trackers based on search term
  useEffect(() => {
    const filtered = trackerList.filter((tracker) =>
      tracker.trackerData.trackerName
        ?.toLowerCase()
        ?.includes(searchTerm.toLowerCase()),
    );
    setFilteredTrackerList(filtered);
  }, [searchTerm, trackerList, setFilteredTrackerList]);

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        backgroundColor: "#fff",
      }}
    >
      <TextField
        label="Search trackers"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
      />
    </Paper>
  );
}
