import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { RoomInterface } from "../../../interfaces/IRoom";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { NumericFormat } from "react-number-format";
import Moment from "react-moment";
import Swal from "sweetalert2";
import { DeleteRoomID, GetRoom } from "../../../sevices/http";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";

function Room() {
  // const Navigate = useNavigate();
  const [room, setRoom] = React.useState<RoomInterface[]>([]);

  const stockColumns: GridColDef[] = [
    {
      headerName: "ID",
      field: "ID",
      width: 60,
    },
    {
      headerName: "RoomName",
      field: "RoomName",
      width: 150,
    },

    {
      headerName: "Capacity",
      width: 150,
      field: "Capacity",
      renderCell: ({ value }: GridRenderCellParams<Number>) => (
        <Typography variant="body1">
          <NumericFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={0}
            fixedDecimalScale={true}
          />
        </Typography>
      ),
    },
    {
      headerName: "Price",
      field: "Price",
      width: 150,
      renderCell: ({ value }: GridRenderCellParams<Number>) => (
        <Typography variant="body1">
          <NumericFormat
            value={value}
            displayType={"text"}
            thousandSeparator={true}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={"฿"}
          />
        </Typography>
      ),
    },

    {
      headerName: "Roomstatus",
      field: "room_status_name",
      width: 150,
    },
    {
      headerName: "RoomType",
      field: "room_type_name",
      width: 150,
    },
    {
      headerName: "Dormitory",
      field: "dormitory_name",
      width: 150,
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
    {
      headerName: "ACTION",
      field: ".",
      width: 120,
      renderCell: ({ row }: GridRenderCellParams<any>) => (
        <Stack direction="row">
          <IconButton
            aria-label="edit"
            size="large"
            onClick={() => {
              let timerInterval: any;
              Swal.fire({
                title: "Please wait",
                text: "System is going to the edit page !",
                icon: "warning",
                timer: 1500,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                },
                willClose: () => {
                  clearInterval(timerInterval);
                },
              }).then(() => {
                window.location.href = "/Room/edit/" + row.ID;
              });
            }}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
              }).then(async (result) => {
                if (result.isConfirmed) {
                  let res = await DeleteRoomID(row.ID);
                  if (res.status) {
                    Swal.fire({
                      title: "Deleted!",
                      text: "Your file has been deleted.",
                      icon: "success",
                    });
                  }
                  getRoom();
                }
              });
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const getRoom = async () => {
    let res = await GetRoom();
    if (res) {
      console.log(res);
      setRoom(res);
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
        marginLeft: 30,
        marginRight: 30,
        boxShadow: 3,
        borderRadius: 2,
        p: 2,
        height: 700,
       
      }}
    >
      <Container maxWidth="xl">
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
          ห้องพัก
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

export default Room;
