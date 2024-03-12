import React, { useState ,useEffect} from 'react';
import Box from '@mui/material/Box';
import { TextField } from "formik-material-ui";
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {  Link, useNavigate ,useParams} from 'react-router-dom';
import {Grid} from '@mui/material';

import Swal from "sweetalert2";
import { RoomInterface } from '../../../interfaces/IRoom';
import { Field, Formik,Form } from 'formik';
import { CardActions, FormHelperText } from '@mui/material';
import { CostInterface } from '../../../interfaces/ICost';
import { UpdateCosts ,GetCostById } from '../../../sevices/http/indexcost';
import { GetRoom  } from '../../../sevices/http/index';


export default function EditPayment() {
  const [Room, setRoom] = React.useState<RoomInterface[]>([]);
  const [cost, setCost] = useState<CostInterface>();

  const Navigate = useNavigate();

  let { id } = useParams();

  const getCostById = async () => {
    let res = await GetCostById(Number(id));
    console.log(res);
    if (res) {
    setCost(res);
      
    }
  };

  const CostInterface: any = {
    ID: cost?.ID,
    ElectricityBill: cost?.ElectricityBill,
    WaterBill: cost?.WaterBill,
    TotalPrice: cost?.TotalPrice,
    RoomID: cost?.RoomID,
     
  };

  const getRoom = async () => {
    let res = await GetRoom();
    console.log(res);
    if (res) {
      setRoom(res);
    }
  };
  
  

  React.useEffect(() => {
    getRoom();
    getCostById();
  }, []);

  const handleSubmit = async (values: CostInterface) => {
    
    let res = await UpdateCosts(values);
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
          Navigate("/Cost");
        }
      });
    } else {
      Swal.fire({
        title: "ไม่สามรถเเก้ไขได้",
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
      if (!values.ElectricityBill) err.ElectricityBill = "กรุณากรอกค่าไฟ !";
      if (!values.WaterBill) err.WaterBill = "กรุณากรอกค่าน้ำ !";
      if (!values.TotalPrice) err.TotalPrice = "กรุณากรอกยอดรวม !";
      if (!values.RoomID) err.RoomID = "กรุณาเลือก!";
      return err;
    }}
     enableReinitialize={true}
      initialValues={CostInterface}
      onSubmit={handleSubmit}
    >
      <Form>
        <Box
          sx={{
            bgcolor: "#cfd8dc",
            marginTop: 10,
            marginBottom: 3,
            paddingTop: 5,
            boxShadow: 1,
            borderRadius: 2,
            p: 2,
            width: 1000,
            height: 800,
            marginLeft: 35,
          }}
        >
            <Card sx={{ Width: 200, marginBottom: 2, borderRadius: 4 }}>
               <CardContent>
               <Grid container spacing={2}>

               <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Field name="RoomID" >
                    {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    sx={{ width: 500, marginTop: 1.5  }}
                    error={form.touched.RoomID && form.errors.RoomID}
                  >
                    <InputLabel id="demo-simple-select-label">เลขห้อง</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Room"
                      {...field}
                      value={field.value || ""}
                      onChange={(
                        e: React.ChangeEvent<{ value: any }>
                      ) => form.setFieldValue("RoomID", e.target.value)}
                    >
                      {Room.map((item) => (
                        <MenuItem key={item?.ID} value={item?.ID}>
                          {item?.RoomName}
                        </MenuItem>
                      ))}
                    </Select>
                    {form.touched.RoomID && form.errors.RoomID ? (
                      <FormHelperText
                        sx={{ fontSize: 12, padding: 0.2, color: "red" }}
                      >
                        {form.errors.RoomID}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                )}
                </Field>
              </Grid>


              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Field name="RoomID" >
                    {({ field, form }: { field: any; form: any }) => (
                  <FormControl
                    sx={{ width: 500, marginTop: 1.5  }}
                    error={form.touched.RoomID && form.errors.RoomID}
                  >
                    <InputLabel id="demo-simple-select-label">ค่าห้อง</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Room"
                      {...field}
                      value={field.value || ""}
                      onChange={(
                        e: React.ChangeEvent<{ value: any }>
                      ) => form.setFieldValue("RoomID", e.target.value)}
                    >
                      {Room.map((item) => (
                        <MenuItem key={item?.ID} value={item?.ID}>
                          {item?.Price}
                        </MenuItem>
                      ))}
                    </Select>
                    {form.touched.RoomID && form.errors.RoomID ? (
                      <FormHelperText
                        sx={{ fontSize: 12, padding: 0.2, color: "red" }}
                      >
                        {form.errors.RoomID}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                )}
                </Field>
              </Grid>



                <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Field
                style={{ width: 500, marginTop: 11  }}
                component={TextField}
                name="WaterBill"
                type="number"
                label="ค่าน้ำ"
                focused
                />
                </Grid>

                <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Field
                style={{ width: 500, marginTop: 11  }}
                component={TextField}
                name="ElectricityBill"
                type="number"
                label="ค่าไฟ"
                focused
                />
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Field
                style={{ width: 500, marginTop: 11  }}
                component={TextField}
                name="TotalPrice"
                type="number"
                label="ยอดรวม"
                focused
                />
                </Grid>
            <CardActions>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{ marginRight: 1, marginBottom: 2, padding: 1.5 }}
            >
              Update
            </Button>
            <Button
              component={Link}
              to="/Cost"
              variant="outlined"
              fullWidth
              sx={{ padding: 1.5, marginBottom: 2 }}
            >
              Cancle
            </Button>
          </CardActions>
        </Grid>
        </CardContent>
      </Card>

        </Box>
      </Form>
    </Formik>
  );
}