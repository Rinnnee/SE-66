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
import Moment from 'moment';
import 'moment/locale/th';



import Swal from "sweetalert2";
import { RoomInterface } from '../../../interfaces/IRoom';
import { Field, Formik,Form } from 'formik';
import { CardActions, FormHelperText } from '@mui/material';
import { CostInterface } from '../../../interfaces/ICost';
import { GetCost} from '../../../sevices/http/indexcost';
import { CreatePayments  } from '../../../sevices/http/indexpayment';
import { PaymentstatusInterface } from '../../../interfaces/IPaymentstatus';
import { PaymentInterface } from '../../../interfaces/IPayment';
import { UserInterface } from '../../../interfaces/Iuser';
import { GetRoom  } from '../../../sevices/http/index';
import { GetAllUsers  } from '../../../sevices/http/indexuser';
import { GetPaymentstatus  } from '../../../sevices/http/indexcost';

function CreatePay() {
  const [room, setRoom] = React.useState<RoomInterface[]>([]);
  const [cost, setCost] = React.useState<CostInterface[]>([]);
  const [user, setUser] = React.useState<UserInterface[]>([]);
  const [paymentstatus, setPaymentstatus] = React.useState<PaymentstatusInterface[]>([]);
  const Navigate = useNavigate();
 
  const PaymentInterface: any = {
    PaymentDate: Moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ'),  // ใส่ Z สำหรับ timezone
    PaymentEndDate: Moment().add(7, 'days').format('YYYY-MM-DDTHH:mm:ss.SSSSSSZ'), 
    CostID:"",
    RoomID:"",
    UserID:"",
    PaymentStatusID: "",
  };

const getCost= async () => {
        
  let res = await GetCost();
  if (res) {
    console.log(res);
    setCost(res);
  }
};
const getAllUsers= async () => {
        
  let res = await GetAllUsers();
  if (res) {
    console.log(res);
    setUser(res);
  }
};
const getPaymentstatus= async () => {
        
  let res = await GetPaymentstatus();
  if (res) {
    console.log(res);
    setPaymentstatus(res);
  }
};

const getRoom= async () => {
        
    let res = await GetRoom();
    if (res) {
      console.log(res);
      setRoom(res);
    }
  };

 React.useEffect(() => {
    getCost();
    getPaymentstatus();
    getRoom();
    getAllUsers();
  }, []);

  const handleSubmit = async (values: PaymentInterface) => {
    
    let res = await CreatePayments(values);
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
          Navigate("/Payment");
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
      if (!values.PaymentDate) err.PaymentDate = "กรุณากรอกค่าไฟ !";
      if (!values.PaymentEndDate) err.PaymentEndDate = "กรุณากรอกค่าน้ำ !";
      if (!values.CostID) err.CostID = "กรุณาเลือก!";
      if (!values.RoomID) err.RoomID = "กรุณาเลือก!";
      if (!values.UserID) err.UserID = "กรุณาเลือก!";
      if (!values.PaymentStatusID) err.PaymentStatusID = "กรุณาเลือก!";
      return err;
    }}
      initialValues={PaymentInterface}
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
            <Field name="CostID">
            {({ field, form }: { field: any; form: any }) => (
              <FormControl
                sx={{ width: 500, marginTop: 1.5 }}
                error={form.touched.CostID && form.errors.CostID}
              >
                <InputLabel id="demo-simple-select-label">ยอดรวม</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="TotalPrice"
                  {...field}
                  onChange={(
                    e: React.ChangeEvent<{ value: CostInterface }>
                  ) => form.setFieldValue("CostID", e.target.value)}
                >
                  {cost.map((item) => (
                    <MenuItem key={item?.ID} value={item?.ID}>
                      {item?.TotalPrice}
                    </MenuItem>
                  ))}
                </Select>
                {form.touched.CostID && form.errors.CostID ? (
                  <FormHelperText
                    sx={{ fontSize: 12, padding: 0.2, color: "red" }}
                  >
                    {form.errors.CostID}
                  </FormHelperText>
                ) : null}
                </FormControl>
                )}
            </Field>
            </Grid>
              
            <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Field name="UserID">
            {({ field, form }: { field: any; form: any }) => (
              <FormControl
                sx={{ width: 500, marginTop: 1.5 }}
                error={form.touched.UserID && form.errors.UserID}
              >
                <InputLabel id="demo-simple-select-label">รหัสนักศึกษา</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="StudentID"
                  {...field}
                  onChange={(
                    e: React.ChangeEvent<{ value: UserInterface }>
                  ) => form.setFieldValue("UserID", e.target.value)}
                >
                  {user.map((item) => (
                    <MenuItem key={item?.ID} value={item?.ID}>
                      {item?.StudentID}
                    </MenuItem>
                  ))}
                </Select>
                {form.touched.UserID && form.errors.UserID ? (
                  <FormHelperText
                    sx={{ fontSize: 12, padding: 0.2, color: "red" }}
                  >{form.errors.UserID}</FormHelperText>
                ) : null}
                </FormControl>
                )}
            </Field>
            </Grid>

            <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Field
            style={{ width: 500, marginTop: 11  }}
            component={TextField}
            label="วันที่สร้าง"
            name="PaymentDate"
            type="datetime"  // ใช้ type "datetime-local" สำหรับวันที่และเวลา
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 2 }}
          />
        </Grid>        
              <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Field
            style={{ width: 500, marginTop: 11  }}
            component={TextField}
            label="วันสิ้นสุดการชำระ"
            name="PaymentEndDate"
            type="datetime"  // ใช้ type "datetime-local" สำหรับวันที่และเวลา
            InputLabelProps={{ shrink: true }}
            sx={{ marginBottom: 2 }}
          />
        </Grid> 

              <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Field name="PaymentStatusID">
            {({ field, form }: { field: any; form: any }) => (
              <FormControl
                sx={{ width: 500, marginTop: 1.5 }}
                error={form.touched.PaymentStatusID && form.errors.PaymentStatusID}
              >
                <InputLabel id="demo-simple-select-label">สถานะ</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="PaymentStatusName"
                  {...field}
                  onChange={(
                    e: React.ChangeEvent<{ value: PaymentstatusInterface }>
                  ) => form.setFieldValue("PaymentStatusID", e.target.value)}
                >
                  {paymentstatus.map((item) => (
                    <MenuItem key={item?.ID} value={item?.ID}>
                      {item?.PaymentStatusName}
                    </MenuItem>
                  ))}
                </Select>
                {form.touched.PaymentStatusID && form.errors.PaymentStatusID ? (
                  <FormHelperText
                    sx={{ fontSize: 12, padding: 0.2, color: "red" }}
                  >
                    {form.errors.PaymentStatusID}
                  </FormHelperText>
                ) : null}
                </FormControl>
                )}
            </Field>
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
              to="/Payment"
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


export default CreatePay;