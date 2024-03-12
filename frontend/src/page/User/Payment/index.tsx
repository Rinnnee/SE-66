import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { GetPaymentByUserID } from '../../../sevices/http/indexpayment';
import { PaymentInterface } from '../../../interfaces/IPayment';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import Button from '@mui/material/Button';
import { ChangeEvent } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import IconButton from '@mui/material/IconButton';
import Swal from "sweetalert2";
import { UpdateSlip } from '../../../sevices/http/indexpayment';
import {  useNavigate  } from 'react-router-dom';

function PaymentUser() {
  const [paymentData, setPaymentData] = useState<PaymentInterface>({});
  const styles = {
    paper: {
      padding: 20,
      margin: '50px auto',
      backgroundColor: '#ffffff',
    },
    saveButton: {
      width: 100,
      marginRight: 120,
      marginBottom: 20,
      padding: '10px 15px',
      backgroundColor: '#3f51b5',
      color: '#fff',
      borderRadius: 8,
    },
  };
  
  useEffect(() => {
    const storeduid = localStorage.getItem('uid');
    const getData = async (id: string) => {
      try {
        const res = await GetPaymentByUserID(id);
        if (res) {
          setPaymentData(res);
          console.log('Payment Data:', res);
        }
      } catch (error) {
        toast.error('Error fetching payment data.');
        console.error('Error fetching payment data:', error);
      }
    };

    getData(storeduid!);
  }, []);

  const Navigate = useNavigate();

  const handleSubmit = async (values: PaymentInterface) => {
    
    let res = await UpdateSlip(values);
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
          Navigate("/PaymentUser");
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
// Inside the Infomation component
const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files && e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string; // Type assertion to string
      setPaymentData({ ...paymentData, Slip: base64String }); // Update the 'Pic' field in formData
    };
    reader.readAsDataURL(file);
  }
};
  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={styles.paper}>
        <Typography variant="h4" gutterBottom>
          ภาระค่าใช้จ่าย
          <span style={{ float: 'right' , fontSize: '1.2rem' }}>
          สถานะ: {paymentData.PaymentStatus?.PaymentStatusName}
         </span>
        </Typography>
        <Paper elevation={3} style={styles.paper}>
        เลขห้อง: {paymentData.Room?.RoomName}
        <Typography variant="body1">
          วันที่สร้าง: {paymentData.PaymentDate
            ? format(paymentData.PaymentDate, 'yyyy-MM-dd')
            : 'N/A'}
        </Typography>
        <Typography variant="body1">
          วันที่สินสุดการชำระ: {paymentData.PaymentEndDate
            ? format(paymentData.PaymentEndDate, 'yyyy-MM-dd')
            : 'N/A'}
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>รายการ</TableCell>
                <TableCell align="right">จำนวนเงิน</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>ค่าห้อง</TableCell>
                <TableCell align="right">{paymentData.Room?.Price}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ค่าน้ำ</TableCell>
                <TableCell align="right">{paymentData.Cost?.WaterBill}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>ค่าไฟ</TableCell>
                <TableCell align="right">{paymentData.Cost?.ElectricityBill}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell >ยอดรวม</TableCell>
                <TableCell align="right">{paymentData.Cost?.TotalPrice}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Typography>
          เลขบัญชีธนาคาร กรุงไทย 6783578664 มหาลัยวิยาลัยเทคโนโลยีสุรนารี
        </Typography>
        <Typography>
          Upload Slip
        </Typography>
        <input
          accept="image/*"
          id="payment-slip-upload"
          type="file"
          onChange={handleImageChange}
          style={{ display: 'none' }}
        />
       <label htmlFor="payment-slip-upload">
      <IconButton color="primary" component="span">
        <AddPhotoAlternateIcon />
      </IconButton>
      </label>
        {/* Display the uploaded image if available */}
        {paymentData.Slip && (
          <div>
            <Typography variant="body1">Payment Slip:</Typography>
            <img 
            src={paymentData.Slip} 
            alt="Payment Slip" 
            style={{ maxWidth: '100%', borderRadius: 8, marginTop: 10 }} 
           />

          </div>
        )}
        <Button
              fullWidth
              variant="text"
              color="primary"
              type="submit"
              sx={{ width: 100, marginRight: 120, marginBottom: 2, padding: 1.5 }}
              onClick={() => handleSubmit(paymentData)} 
            >
              Save
            </Button>
          </Paper>
      </Paper>
    </Container>
  );
}

export default PaymentUser;
