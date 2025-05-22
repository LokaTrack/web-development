import { useEffect } from "react";
import { UserListProps } from "../../props/props";
import { Paper, TextField } from "@mui/material";

export default function DriversSearch({
  searchTerm,
  setSearchTerm,
  userList,
  setFilteredUserList,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  userList: UserListProps[];
  setFilteredUserList: (list: UserListProps[]) => void;
}) {
  // Filter trackers based on search term
  useEffect(() => {
    const filtered = userList.filter((user) =>
      user.userData.username?.toLowerCase()?.includes(searchTerm.toLowerCase()),
    );
    setFilteredUserList(filtered);
  }, [searchTerm, userList, setFilteredUserList]);

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
