import React, { useState } from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CreateAddress, CreateUser  } from '../../../sevices/http/indexuser';
import { UserInterface } from '../../../interfaces/Iuser';
import { Box, Typography } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddUser() {
  const initialUserData: UserInterface = {
    StudentID: '',
    CitizenID: '',
    FirstName: '',
    LastName: '',
    Birthday: new Date(),
    Tel: '',
  };

  const [userData, setUserData] = useState<UserInterface>({
    StudentID: '',
    CitizenID: '',
    FirstName: '',
    LastName: '',
    Birthday: new Date(),
    Tel: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleCreate = async () => {
    try {
      // Step 1: Create User
      const createUserResult = await CreateUser(userData);
  
      if (createUserResult.status) {
        // Extract StudentID from the form or wherever it is available
        const studentID = userData.StudentID; // Adjust this line based on where you store the StudentID
  
        if (studentID !== undefined) { // Check if studentID is not undefined
          // Step 2: Create Address using the extracted StudentID
          const createAddressResult = await CreateAddress(studentID, {
            StudentID: studentID,
            // Other address data fields...
          });
  
          if (createAddressResult.status) {
            toast.success('User and Address created successfully');
            setUserData(initialUserData);
          } else {
            toast.error(`Error creating address: ${createAddressResult.message}`);
          }
        } else {
          // Handle the case when studentID is undefined
          toast.error('Error: StudentID is undefined');
        }
      } else {
        // If user creation fail s, show an error message
        const errorMessage = Array.isArray(createUserResult.message) ? createUserResult.message[0] : createUserResult.message;
        toast.error(`Error creating User: ${errorMessage}`);
      }
  
      console.log(createUserResult);
    } catch (error) {
      console.error(error);
    }
  };
  
  

  
  
  

  return (
    <Container maxWidth="xl">
      <Box mt={4} p={4} border={1} borderRadius={8} borderColor="grey.300"  style={{ marginTop: '80px'}} >
      <Typography variant="h4" gutterBottom style={{  fontWeight: 'bold' , borderRadius: '10px',}}>
          เพิ่มข้อมูลผู้เข้าพัก
        </Typography>
        <TextField
          label="StudentID *"
          fullWidth
          margin="normal"
          variant="outlined"
          name="StudentID"
          value={userData.StudentID}
          onChange={handleInputChange}
        />

        <TextField
          label="CitizenID *"
          fullWidth
          margin="normal"
          variant="outlined"
          name="CitizenID"
          value={userData.CitizenID}
          onChange={handleInputChange}
        />

        <TextField
          label="FirstName"
          fullWidth
          margin="normal"
          variant="outlined"
          name="FirstName"
          value={userData.FirstName}
          onChange={handleInputChange}
        />

        <TextField
          label="LastName"
          fullWidth
          margin="normal"
          variant="outlined"
          name="LastName"
          value={userData.LastName}
          onChange={handleInputChange}
        />

        <TextField
          label="Tel"
          fullWidth
          margin="normal"
          variant="outlined"
          name="Tel"
          value={userData.Tel}
          onChange={handleInputChange}
        />

        <Button variant="contained" color="primary" onClick={handleCreate}>
          สร้างข้อมูล
        </Button>

        {/* ToastContainer for displaying notifications */}
        <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar={true} />
      </Box>
    </Container>
  );
}

export default AddUser;