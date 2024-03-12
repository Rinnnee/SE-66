import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import 'react-toastify/dist/ReactToastify.css';
import { Avatar, Box, Divider, Grid, MenuItem, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { UserInterface } from '../../../interfaces/Iuser';
import { GetUserByStudentID } from '../../../sevices/http/indexuser';

function Profile() {
    const [userData, setUserData] = useState<UserInterface>({
        // สร้าง state เพื่อเก็บข้อมูลผู้ใช้
        ID: undefined,
        FirstName: '',
        LastName: '',
        StudentID: '',
        CitizenID: '',
        Password: undefined,
        Email: '',
        Birthday: undefined,
        Year: 0,
        Tel: '',
        Disease: '',
        Allergy: '',
        Photo: '',
        AddressID: undefined,
        Address: {
          ID: undefined,
          PostalCode: '',
          Street: '',
          District: '',
          StudentID: '',
          SubDistrict: '',
          Province: '',
          HouseNumber: '',
        },
        BloodTypeID: undefined,
        BloodType: {
          ID: undefined,
          BloodTypeName: '',
        },
        MajorID: undefined,
        Major: {
          ID: undefined,
          MajorName: '',
        },
        RoomID: undefined,
        Room: {
            ID: undefined,
            RoomName: '',
        }
      });

      const storedStudentID = localStorage.getItem('StudentID');

      
  useEffect(() => {
    
    const storedStudentID = localStorage.getItem('StudentID');
    const getData =async (id:string) => {
      const res = await GetUserByStudentID(id)
      if(res){
        setUserData(res);
        console.log('User Data:', res);
        console.log('Birthday:', res.Birthday); 
      }
    }
    getData(storedStudentID!);
    
  }, []);

  return (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        >
    <Box
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', 
        maxheight: 400,
        border: 'none',
        borderRadius: 4,
        padding: 3,
        marginBottom: 5,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
        bgcolor: 'white',
        width: '80%', // Set the width to 80% of the container
        maxWidth: 400, // Set the maximum width to 400px
        mt: 5,
      }}
    >
      <Typography variant="h4" gutterBottom style={{ marginTop: '10px', marginBottom: '20px',margin: 'auto' }}>
        โปรไฟล์
      </Typography>
      <Divider sx={{ marginBottom: '40px', border: '3' }} />
      <Avatar alt={`${userData.FirstName} ${userData.FirstName} ${userData.LastName}`} src={userData.Photo} sx={{ width: 300, height: 300 ,margin: 'auto' , marginBottom: '40px' }} />
      <Divider sx={{ marginBottom: '10px', border: '3' }} />
      <Typography variant="h6">{`${userData.StudentID} ${userData.FirstName} ${userData.LastName}`}</Typography>
      <Typography variant="h6">{`ห้องพัก :  ${userData.Room?.RoomName ? userData.Room?.RoomName : ' '}`}</Typography>
       
    </Box>
    </Box>
  );

}

export default Profile;
