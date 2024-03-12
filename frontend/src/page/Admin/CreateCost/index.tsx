import React from 'react';
import Box from '@mui/material/Box';
import { TextField } from "formik-material-ui";
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {  Link, useNavigate  } from 'react-router-dom';
import {Grid} from '@mui/material';

import Swal from "sweetalert2";
import { RoomInterface } from '../../../interfaces/IRoom';
import { Field, Formik,Form } from 'formik';
import { CardActions, FormHelperText } from '@mui/material';
import { CostInterface } from '../../../interfaces/ICost';
import {  CreateCost} from '../../../sevices/http/indexcost';
import { GetRoom  } from '../../../sevices/http/index';



function CreatePayment() {
  const [room, setRoom] = React.useState<RoomInterface[]>([]);

  const Navigate = useNavigate();
 
  const CostInterface: any = {
    ElectricityBill: "",
    WaterBill: "",
    TotalPrice: "",
    RoomID: "",

     
  };

const getRoom= async () => {
        
  let res = await GetRoom();
  if (res) {
    console.log(res);
    setRoom(res);
  }
};


 React.useEffect(() => {
    getRoom();

  }, []);

  const handleSubmit = async (values: CostInterface) => {
    
    let res = await CreateCost(values);
    console.log(res);
    console.log(values);
    if (res.status) {
      Swal.fire({
        title: "Success",
        text: "บันทึกสำเร็จ !",
        icon: "success",
        timer: 4000,
      }).then((result) => {
        if (result) {
          Navigate("/Cost");
        }
      });
    } else {
      Swal.fire({
        title: "ไม่สามรถบันทึกได้",
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
            <Field name="RoomID">
            {({ field, form }: { field: any; form: any }) => (
              <FormControl
                sx={{ width: 500, marginTop: 11 }}
                error={form.touched.RoomID && form.errors.RoomID}
              >
                <InputLabel id="demo-simple-select-label">เลขห้อง</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="RoomName"
                  {...field}
                  onChange={(
                    e: React.ChangeEvent<{ value: RoomInterface }>
                  ) => form.setFieldValue("RoomID", e.target.value)}
                >
                  {room.map((item) => (
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
            <Field name="RoomID">
            {({ field, form }: { field: any; form: any }) => (
              <FormControl
                sx={{ width: 500, marginTop: 1.5 }}
                error={form.touched.RoomID && form.errors.RoomID}
              >
                <InputLabel id="demo-simple-select-label">ค่าห้อง</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Price"
                  {...field}
                  onChange={(
                    e: React.ChangeEvent<{ value: RoomInterface }>
                  ) => form.setFieldValue("RoomID", e.target.value)}
                >
                  {room.map((item) => (
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
                />
                </Grid>

                <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Field
                style={{ width: 500, marginTop: 11  }}
                component={TextField}
                name="ElectricityBill"
                type="number"
                label="ค่าไฟ"
                />
                </Grid>

                <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Field
                style={{ width: 500, marginTop: 11  }}
                component={TextField}
                name="TotalPrice"
                type="number"
                label="ยอดรวม"
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
              Create
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


export default CreatePayment;