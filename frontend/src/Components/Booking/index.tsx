import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { RoomInterface } from "../../interfaces/IRoom";
import { useNavigate } from "react-router-dom";
import { GetRoom } from "../../sevices/http";

function Booking() {
  const [rooms, setRoom] = React.useState<RoomInterface[]>([]);
  const Navigate = useNavigate();

  const getRoom = async () => {
    let res = await GetRoom();
    if (res) {
      setRoom(res);
    }
  };

  React.useEffect(() => {
    getRoom();
  });

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" align="center" sx={{ marginTop: "50px" }}>
          จองห้องพัก
        </Typography>
        <Grid container spacing={5} sx={{ marginTop: "20px" }}>
          {rooms
            // .filter((room) => room.RoomName?.toLowerCase().includes(search.toLowerCase()))
            .map((room) => (
              <Card
                key={room.ID}
                sx={{ maxWidth: 345, margin: 2, width: 275, height: 350 }}
              >
                <CardMedia
                  component="img"
                  height="194"
                  src={`${process.env.PUBLIC_URL}/image/sut1.png`}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {room.RoomName}
                  </Typography>
                  <Typography variant="h6" component="div">
                    ประเภทห้องพัก {room.room_type_name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">จองห้องพัก</Button>
                  <Button size="small">เพิ่มเติม</Button>
                </CardActions>
              </Card>
            ))}
        </Grid>
      </Container>
    </>
  );
}

export default Booking;
