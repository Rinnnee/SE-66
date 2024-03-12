import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  GetRoom,
  GetDormitory,
  BookingRoom,
  GetUser,
  DeleteBookingRoom,
} from "../../../sevices/http";
import { BookingInterface } from "../../../interfaces/Ibooking";
import { RoomInterface } from "../../../interfaces/IRoom";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from '@mui/icons-material/Send';

function Booking() {
  const [rooms, setRooms] = useState<RoomInterface[]>([]);
  const [dormitories, setDormitories] = useState<any[]>([]); // Update with the correct type if available
  const [selectedDormitory, setSelectedDormitory] = useState<number | null>(
    null
  );
  const [userId, setUserId] = useState<number | undefined>();

  const Navigate = useNavigate();

  const getRoom = async (dormitoryId: number) => {
    try {
      const res = await GetRoom();
      if (res) {
        const filteredRooms = res.filter(
          (room: RoomInterface) => room.DormitoryID === dormitoryId
        );
        setRooms(filteredRooms);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const getUser = async () => {
    const storedUserId = localStorage.getItem("uid");
    const userId = storedUserId ? Number(storedUserId) : undefined;
    setUserId(Number(userId));
  };

  const getDormitories = async () => {
    try {
      const res = await GetDormitory();
      if (res) {
        setDormitories(res);
      }
    } catch (error) {
      console.error("Error fetching dormitories:", error);
    }
  };

  useEffect(() => {
    getRoom(selectedDormitory || 0);
    getDormitories();
    getUser();
  }, [selectedDormitory]);

  const handleDormitoryChange = (event: SelectChangeEvent<number>) => {
    const selectedDormitoryId = event.target.value as number;
    setSelectedDormitory(selectedDormitoryId);
  };

  const handleBookRoom = async (
    roomId: number,
    dormitoryId: number,
    userId: number
  ) => {
    try {
      const bookingData: BookingInterface = {
        RoomID: roomId,
        DormitoryID: dormitoryId,
        UserID: userId,
      };

      const response = await BookingRoom(bookingData);

      if (response.status) {
        Swal.fire({
          title: "Success",
          text: "จองห้องสำเร็จถ้าต้องการยกเลิกให้กดปุ่มยกเลิกเเละห้ามออกจากระบบไม่งั้นจะยกเลิกไม่ใด้",
          icon: "success",
        }).then((result) => {
          if (result) {
            Navigate("/Member");
          }
        });
      } else {
        Swal.fire({
          title: "ไม่สามารถจองห้องพักได้",
          text: response.message,
          icon: "error",
        });
      }
    } finally {
    }
  };

  const handleCancelBooking = async () => {
    try {
      const response = await DeleteBookingRoom(userId);

      if (response) {
        Swal.fire("Success!", "ยกเลิกการจองห้องพักสำเร็จ", "success");
      } else {
        Swal.fire("Error!", "ยังไม่ใด้จองห้องพัก", "error");
      }
    } finally {
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" align="center" sx={{ marginTop: "50px" }}>
          จองห้องพัก
        </Typography>

        <Select
          value={selectedDormitory || ""}
          onChange={handleDormitoryChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{ marginTop: "20px" }}
        >
          <MenuItem value="" disabled>
            เลือกหอพัก
          </MenuItem>
          {dormitories.map((dormitory) => (
            <MenuItem key={dormitory.ID} value={dormitory.ID}>
              {dormitory.DormitoryName}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          sx={{ marginLeft: 4 }}
          onClick={handleCancelBooking}
        >
          ยกเลิกจองห้อง
        </Button>
        <Grid container spacing={5} sx={{ marginTop: "20px" }}>
          {rooms.map((room) => (
            <Card
              key={room.ID}
              sx={{ maxWidth: 350, margin: 2, width: 275, height: 420 }}
            >
              <CardMedia
                component="img"
                height="200"
                src={`${process.env.PUBLIC_URL}/image/sut1.png`}
                alt="Room"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {room.RoomName}
                </Typography>
                <Typography variant="h6" component="div">
                  ประเภทห้องพัก {room.room_type_name}
                </Typography>
                <Typography variant="h6" component="div">
                  จำนวนคนพัก {room.Occupancy}/{room.Capacity}
                </Typography>
                <Typography variant="h6" component="div">
                  สถาณะห้องพัก {room.room_status_name}
                </Typography>
              </CardContent>
             
                <Button sx={{marginLeft:2}} variant="contained" endIcon={<SendIcon />}
                  size="small"
                  onClick={() =>
                    handleBookRoom(
                      room.ID ?? 0,
                      room.DormitoryID ?? 0,
                      userId ?? 0
                    )
                  }
                >
                  จองห้องพัก
                </Button>
              
            </Card>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default Booking;
