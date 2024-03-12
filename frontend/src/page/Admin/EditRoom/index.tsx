import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextField } from "formik-material-ui";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { RoomstatusInterface } from '../../../interfaces/IRoomstatus';
import { RoomTypeInterface } from '../../../interfaces/IRoomtype';
import {  Link, useNavigate, useParams } from 'react-router-dom';

import Swal from "sweetalert2";
import { RoomInterface } from '../../../interfaces/IRoom';
import { Field, Formik,Form } from 'formik';
import { CardActions, FormHelperText } from '@mui/material';
import { RoomDormitoryInterface } from '../../../interfaces/Idormitorys';
import { CreateRoom, GetDormitory, GetRoomType, GetRoomstatus ,GetRoomtById, UpdateRoom } from '../../../sevices/http';




export default function EditRoom() {
  const [Roomstatus, setRoomstatus] = React.useState<RoomstatusInterface[]>([]);
  const [RoomType, setRoomType] = React.useState<RoomTypeInterface[]>([]); 
  const [ Dormitory, setDormitory] = React.useState<RoomDormitoryInterface[]>([]);
  const [room, setRoom] = useState<RoomInterface>();
  
  const Navigate = useNavigate();

  let { id } = useParams();

  const getRoomtById = async () => {
    let res = await GetRoomtById(Number(id));
    console.log(res);
    if (res) {
    setRoom(res);
      
    }
  };

  const RoomInterface: any = {
    ID: room?.ID,
    RoomName: room?.RoomName,
    Capacity:room?.Capacity,
    Price: room?.Price,
    RoomStatusID: room?.RoomStatusID,
    RoomTypeID: room?.RoomTypeID,
    DormitoryID: room?.DormitoryID 


  };

  const getRoomstatus = async () => {
    let res = await GetRoomstatus();
    console.log(res);
    if (res) {
      setRoomstatus(res);
    }
  };

  const getRoomType = async () => {
    let res = await GetRoomType();
    console.log(res);
    if (res) {
      setRoomType(res);
    }
  };

  const getDormitory = async () => {
    let res = await GetDormitory();
    console.log(res);
    if (res) {
      setDormitory(res);
    }
  };

  React.useEffect(() => {
    getRoomstatus();
    getRoomType();
    getDormitory();
    getRoomtById();
  }, []);

  const handleSubmit = async (values: RoomInterface) => {
    
    let res = await UpdateRoom(values);
    console.log(res);
    console.log(values);
    if (res.status) {
      Swal.fire({
        title: "Success",
        text: "เเก้ไขสำเร็จ !",
        icon: "success",
        timer: 4000,
      }).then((result) => {
        if (result) {
          Navigate("/Room");
        }
      });
    } else {
      Swal.fire({
        title: "ไม่สามารถเเก้ไขใด้",
        text: " กรุณาตรวจสอบความถูกต้อง!",
        icon: "error",
        timer: 4000,
      });
    }
  };


  return (
    <Formik
      validate={(values) => {
        let err: any = {};
        if (!values.RoomName) err.RoomName = "กรุณากรอกชื่อ !";
        if (!values.Capacity) err.Capacity = "กรุณากรอกราคา !";
        if (!values.Price) err.Price = "กรุณาเลือกประเภท !";
        if (!values.RoomStatusID) err.RoomStatusID = "กรุณาบริษัทผู้ผลิต !";
        if (!values.RoomTypeID) err.RoomTypeID = "กรุณาบริษัทผู้ผลิต !";
        if (!values.DormitoryID) err.DormitoryID = "กรุณาบริษัทผู้ผลิต !";
        return err;
      }}
      enableReinitialize={true}
       initialValues={RoomInterface}
      onSubmit={handleSubmit}
    >
      <Form>
        <Box
          sx={{
            bgcolor: "#fff",
            marginTop: 10,
            marginBottom: 3,
            paddingTop: 5,
            boxShadow: 3,
            borderRadius: 2,
            p: 2,
            width: "100%",
            height: 500,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            marginLeft={2}
            marginTop={2}
            sx={{ fontFamily: "Sarabun" }}
            marginBottom={2}
          >
            เเก้ไขห้องพัก
          </Typography>

          <Field
            style={{ marginTop: 2 }}
            fullWidth
            component={TextField}
            name="RoomName"
            type="text"
            label="RoomName"
            focused
            
          />
          <Field
            style={{ marginTop: 11 }}
            fullWidth
            component={TextField}
            name="Capacity"
            type="number"
            label="Capacity"
            focused
          />
          <Field
            style={{ marginTop: 11 }}
            fullWidth
            component={TextField}
            name="Price"
            type="number"
            label="Price"
            focused
          />

          <Field name="RoomStatusID">
            {({ field, form }: { field: any; form: any }) => (
              <FormControl
                sx={{ width: 250, marginTop: 1.5 }}
                error={form.touched.RoomStatusID && form.errors.RoomStatusID}
              >
                <InputLabel id="demo-simple-select-label">Roomstatus</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Roomstatus"
                  {...field}
                  value={field.value || ""}
                  onChange={(
                    e: React.ChangeEvent<{ value: any }>
                  ) => form.setFieldValue("RoomStatusID", e.target.value)}
                >
                  {Roomstatus.map((item) => (
                    <MenuItem key={item?.ID} value={item?.ID}>
                      {item?.RoomStatusName}
                    </MenuItem>
                  ))}
                </Select>
                {form.touched.RoomStatusID && form.errors.RoomStatusID ? (
                  <FormHelperText
                    sx={{ fontSize: 12, padding: 0.2, color: "red" }}
                  >
                    {form.errors.RoomStatusID}
                  </FormHelperText>
                ) : null}
              </FormControl>
            )}
          </Field>
          
          <Field name="RoomTypeID" >
            {({ field, form }: { field: any; form: any }) => (
              <FormControl
                sx={{ width: 250, marginTop: 1.5 ,marginLeft:3 }}
                error={form.touched.RoomTypeID && form.errors.RoomTypeID}
              >
                <InputLabel id="demo-simple-select-label">RoomType</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="RoomType"
                  {...field}
                  value={field.value || ""}
                  onChange={(
                    e: React.ChangeEvent<{ value: any }>
                  ) => form.setFieldValue("RoomTypeID", e.target.value)}
                >
                  {RoomType.map((item) => (
                    <MenuItem key={item?.ID} value={item?.ID}>
                      {item?.RoomTypeName}
                    </MenuItem>
                  ))}
                </Select>
                {form.touched.RoomTypeID && form.errors.RoomTypeID ? (
                  <FormHelperText
                    sx={{ fontSize: 12, padding: 0.2, color: "red" }}
                  >
                    {form.errors.RoomTypeID}
                  </FormHelperText>
                ) : null}
              </FormControl>
            )}
          </Field>

          <Field name="DormitoryID" >
            {({ field, form }: { field: any; form: any }) => (
              <FormControl
                sx={{ width: 250, marginTop: 1.5 ,marginLeft:3 }}
                error={form.touched.DormitoryID && form.errors.DormitoryID}
              >
                <InputLabel id="demo-simple-select-label">Dormitory</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Dormitory"
                  {...field}
                  value={field.value || ""}
                  onChange={(
                    e: React.ChangeEvent<{ value: any }>
                  ) => form.setFieldValue("DormitoryID", e.target.value)}
                >
                  {Dormitory.map((item) => (
                    <MenuItem key={item?.ID} value={item?.ID}>
                      {item?.DormitoryName}
                    </MenuItem>
                  ))}
                </Select>
                {form.touched.DormitoryID && form.errors.DormitoryID ? (
                  <FormHelperText
                    sx={{ fontSize: 12, padding: 0.2, color: "red" }}
                  >
                    {form.errors.DormitoryID}
                  </FormHelperText>
                ) : null}
              </FormControl>
            )}
          </Field>
          <CardActions>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginRight: 1, marginBottom: 2, padding: 1.5 }}
            >
              Create
            </Button>
            <Button
              component={Link}
              to="/Homeadmin"
              variant="outlined"
              fullWidth
              sx={{ padding: 1.5, marginBottom: 2 }}
            >
              Cancle
            </Button>
          </CardActions>

          {/* <Button
              sx={{ marginTop: 3 }}
              variant="contained"
              color="success"
              type="submit"
            >
              Add
            </Button> */}
        </Box>
      </Form>
    </Formik>
  );
}


