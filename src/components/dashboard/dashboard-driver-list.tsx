import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { PackageListProps, UserListProps } from "../../props/props";
import {
  Assignment,
  AssignmentReturn,
  AssignmentTurnedIn,
  LocalShipping,
} from "@mui/icons-material";
import { useState } from "react";

interface DashboardDriverListPageProps {
  packageList: PackageListProps[];
  userList: UserListProps[];
}

function statusChip(status: string) {
  switch (status.toLowerCase()) {
    case "on delivery":
      return (
        <Chip
          icon={<LocalShipping />}
          label="On Delivery"
          color="info"
          variant="outlined"
        />
      );
    case "check-in":
      return (
        <Chip
          icon={<Assignment />}
          label="Check In"
          color="warning"
          variant="outlined"
        />
      );

    case "check-out":
      return (
        <Chip
          icon={<AssignmentTurnedIn />}
          label="Check Out"
          color="success"
          variant="outlined"
        />
      );

    case "return":
      return (
        <Chip
          icon={<AssignmentReturn />}
          label="Returned"
          color="error"
          variant="outlined"
        />
      );
  }
}

export default function DashboardDriverList({
  packageList,
  userList,
}: DashboardDriverListPageProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate the packages to display for current page
  const paginatedPackages = packageList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    // <TableContainer component={Paper} sx={{ maxHeight: "calc(100vh - 136px)" }}>
    <Paper sx={{ overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 850, overflowX: "auto" }}>
        <Table sx={{ minWidth: 850 }} aria-label="sticky table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ minWidth: 180 }}>PACKAGE ID</TableCell>
              <TableCell align="right" sx={{ minWidth: 180 }}>
                RECIPIENT
              </TableCell>
              <TableCell align="right" sx={{ minWidth: 180 }}>
                STATUS
              </TableCell>
              <TableCell align="right" sx={{ minWidth: 180 }}>
                DRIVER
              </TableCell>
              <TableCell align="right" sx={{ minWidth: 200 }}>
                DATE & TIME
              </TableCell>
              <TableCell align="right">LOCATION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPackages.map((pkg) => (
              <TableRow
                key={pkg.orderNo}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell
                  component={"th"}
                  scope="row"
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {pkg.orderNo}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {pkg.customer}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {statusChip(pkg.deliveryStatus)}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {userList.find((user) => user.userId === pkg.driverId)
                    ? userList.find((user) => user.userId === pkg.driverId)
                        ?.userData.username
                    : "Unassigned"}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {new Date(pkg.deliveryStartTime)
                    .toLocaleString("en-GB", {
                      timeZone: "Asia/Jakarta",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })
                    .replace(
                      /(\d{1,2}) (\w+) (\d{4}) at (\d{2}:\d{2})/,
                      "$1 $2 $3, $4",
                    )}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {pkg.address}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={packageList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
