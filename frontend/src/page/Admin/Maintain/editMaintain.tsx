import React, { useState } from 'react';
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
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import Swal from "sweetalert2";
import { MaintainInterface } from '../../../interfaces/IMaintain';
import { Field, Formik,Form } from 'formik';
import { CardActions, FormHelperText } from '@mui/material';
import { MaintainStatusInterface } from '../../../interfaces/IMaintainstatus';
import { GetMaintainById, updateMaintain } from '../../../sevices/http/indexmaintain';
import { getMaintainStatusList } from '../../../sevices/http/indexmaintain';
import { PaymentstatusInterface } from '../../../interfaces/IPaymentstatus';
import { GetPaymentstatus  } from '../../../sevices/http/indexcost';
import { GetPaymentById  } from '../../../sevices/http/indexpayment';
import { PaymentInterface } from '../../../interfaces/IPayment';
import { GetCost} from '../../../sevices/http/indexcost';
import { UserInterface } from '../../../interfaces/Iuser';
import { GetAllUsers  } from '../../../sevices/http/indexuser';


function EditMaintain() {

    let { id } = useParams();
    const Navigate = useNavigate();
    const [maintain, setMaintain] = useState<MaintainInterface>();
    const [maintainstatus, setMaintainStatus] = React.useState<MaintainStatusInterface[]>([]);
    const adminIdFromLocalStorage = localStorage.getItem('aid');
    const AdminID = adminIdFromLocalStorage
    ? parseInt(adminIdFromLocalStorage, 10)
    : undefined;
  console.log("adminID",AdminID)

     const getMaintainById = async () => {
        let res = await GetMaintainById(Number(id));
        console.log('getMaintainByID:', res);
        if (res) {
        setMaintain(res);
        }
      }; 

      const getMaintainstatus= async () => {
          
        let res = await getMaintainStatusList();
        if (res) {
          console.log(res);
          setMaintainStatus(res);
        }
      };
    

    const MaintainInterface: any = {
        ID: maintain?.ID,
        MaintainStatusID: maintain?.MaintainStatusID,
        AdminID: Number(AdminID), 
      };

    const handleSubmit = async (values: MaintainInterface) => {
    
        let res = await updateMaintain(values);
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
              Navigate("/maintainAdmin");
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
    
      React.useEffect(() => {
        Promise.all([getMaintainById(), getMaintainstatus()])
          .then(([maintainResult, statusResult]) => {
            // Do something with maintainResult and statusResult if needed
          })
          .catch(error => {
            // Handle errors
          });
      }, []);
      

  return (
    
    <Formik
    validate={(values) => {
      let err: any = {};
      if (!values.MaintainStatusID) err.MaintainStatusID = "กรุณาเลือก!";
      return err;
    }}
     enableReinitialize={true}
      initialValues={MaintainInterface}
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
            <Field name="MaintainStatusID">
            {({ field, form }: { field: any; form: any }) => (
              <FormControl
                sx={{ width: 500, marginTop: 1.5 }}
                error={form.touched.MaintainStatusID && form.errors.MaintainStatusID}
              >
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="MaintainStatusName"
                  {...field}
                  onChange={(
                    e: React.ChangeEvent<{ value: MaintainStatusInterface }>
                  ) => form.setFieldValue("MaintainStatusID", e.target.value)}
                >
                  {maintainstatus.map((item) => (
                    <MenuItem key={item?.ID} value={item?.ID}>
                      {item?.MaintainStatusName}
                    </MenuItem>
                  ))}
                </Select>
                {form.touched.MaintainStatusID && form.errors.MaintainStatusID ? (
                  <FormHelperText
                    sx={{ fontSize: 12, padding: 0.2, color: "red" }}
                  >
                    {form.errors.MaintainStatusID}
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
              to="/maintainAdmin"
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

    
  
  )
}

export default EditMaintain