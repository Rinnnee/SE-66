import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GetBookingRoomID } from "../../../sevices/http";
import { DataGrid } from "@mui/x-data-grid";
import { BookingInterface } from "../../../interfaces/Ibooking";
import Moment from "react-moment";
function Member() {
  // const Navigate = useNavigate();
  const [room, setRoom] = React.useState<BookingInterface[]>([]);

  const stockColumns: GridColDef[] = [
    
    {
      headerName: "RoomName",
      type: "text",
      field: "RoomName",
      width: 250,
    },
    {
      headerName: "FirstName",
      field: "FirstName",
      width: 250,
    },
    {
      headerName: "LastName",
      field: "LastName",
      width: 250,
    },
    {
      headerName: "StudentID",
      field: "StudentID",
      width: 250,
    },
    {
      headerName: "TIME",
      field: "CreatedAt",
      width: 160,
      renderCell: ({ value }: GridRenderCellParams<any>) => (
        <Typography variant="body1">
          <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>
        </Typography>
      ),
    },
  ];

  const getRoom = async () => {
    const userID: string | null = localStorage.getItem("uid");
    if (userID !== null) {
      let res = await GetBookingRoomID(Number(userID));
      if (res) {
        console.log(res);
        setRoom(res);
      }
    }
  };

  useEffect(() => {
    getRoom();
  }, []);
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        marginTop: 10,
        marginBottom: 3,
        paddingTop: 5,
        marginLeft: 20,
        marginRight: 20,
        boxShadow: 3,
        borderRadius: 2,
        p: 2,
        height: 600,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="div"
          sx={{
            color: "#121212",
            marginBottom: 2,
            textShadow: "1px 2px 6px #121212, 0 0 1em #FFFF, 0 0 0.5em #404040",
            marginTop: 10,
          }}
        >
          รายชื่อผู้พัก
        </Typography>
        <Box
          sx={{
            width: "100%",
            background: "#FFFF",
            borderRadius: 3,
            boxShadow:
              "0 0 9px rgba(228, 230, 235,.7),inset 0 0 9px rgba(228, 230, 235,.7)",
          }}
        >
          <Box sx={{ padding: 2 }}>
            <DataGrid
              sx={{
                height: "70vh",
                marginTop: 2,
              }}
              rows={room}
              rowHeight={75}
              autoHeight={true}
              getRowId={(rows) => rows.ID}
              columns={stockColumns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Member;
