import React, { ChangeEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography'; 
import Grid from '@mui/material/Grid';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserInterface } from '../../../interfaces/Iuser';
import { BloodTypeInterface } from '../../../interfaces/IBloodtype';
import { MajorInterface } from '../../../interfaces/IMajor';
import { GetAllMajor,GetAllBloodType,GetUserByStudentID,UpdateUser,UpdateAddress } from '../../../sevices/http/indexuser';
import { Divider, FormControl, InputLabel } from '@mui/material';



function Infomation() {
  const [editMode, setEditMode] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false); 
  const [bloodTypes, setBloodTypes] = useState<BloodTypeInterface[]>([]);
  const [majorTypes, setMajors] = useState<MajorInterface[]>([]);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1950 + 1 }, (_, index) => currentYear - index);

  

  const handleEditClick = () => {
    setEditMode(true);
  
  };

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
   
  });

  const storedStudentID = localStorage.getItem('StudentID');

  const handleUserSubmit = async () => {
    setEditMode(false);
  
    if (userData) {
      // Create a new object with user data excluding the password
      const userDataWithoutPassword = {
        ...userData,
        // Exclude the password property
        Password: undefined,
      };
  
      // Perform update for user data excluding password
      const userUpdateResult = await UpdateUser(storedStudentID!, userDataWithoutPassword);
      if (!userUpdateResult || !userUpdateResult.status) {
        toast.error('เกิดข้อผิดพลาดในการอัพเดทข้อมูลส่วนตัว');
      } else {
        toast.success('อัพเดทข้อมูลสำเร็จ');
      }
    }
  };
  

  const handleAddressSubmit = async () => {
    setEditMode(false);

    // Check if userData.Address is defined before updating
    if (userData.Address) {
      // Perform update for address data
      const addressUpdateResult = await UpdateAddress(storedStudentID!, userData.Address);
      if (!addressUpdateResult || !addressUpdateResult.status)
      {  toast.error('เกิดข้อผิดพลาดในการอัพเดทที่อยู่');} 
      else {
        toast.success('อัพเดทที่อยู่สำเร็จ');
      } 
    }
  };
  
  
  
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
    
    const fetchBloodTypes = async () => {
      const bloodTypesData = await GetAllBloodType();
      if (bloodTypesData) {
        setBloodTypes(bloodTypesData);
      }
    };
    fetchBloodTypes();

    const fetchMajorTypes = async () => {
      const majorTypesData = await GetAllMajor();
      if (majorTypesData) {
        setMajors(majorTypesData);
      }
    };
    fetchMajorTypes();
  }, []);

  // Inside the Infomation component
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string; // Type assertion to string
        setUserData({ ...userData, Photo: base64String }); // Update the 'Pic' field in formData
      };
      reader.readAsDataURL(file);
    }
  };
  
 
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box
          sx={{
            height: "115vh",
            marginTop: 3,
            marginBottom: 50,
            paddingTop: 5,
            
          }}
        >
        
        <Box
            sx={{
              border: 'none', // กำหนด border เป็น none
              borderRadius: 4,
              padding: 3,
              marginBottom: 5,
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
              bgcolor: 'white', // สีพื้นหลังของ Box
              
    
            }}
          >
          <Typography variant="h4" gutterBottom style={{ marginTop: '10px', marginBottom: '20px' }}>
            ประวัติส่วนตัว
          </Typography>
          <Divider sx={{ marginBottom: '40px', border: '2',}} />

          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="ชื่อ"
                  name="FirstName"
                  value={userData.FirstName}
                  sx={{ marginBottom: 2 }}
                  disabled={!editMode}
                  onChange={(e) => {
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      FirstName: e.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="นามสกุล"
                  name="LastName"
                  value={userData.LastName}
                  sx={{ marginBottom: 2 }}
                  disabled={!editMode}
                  onChange={(e) => {
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      LastName: e.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="รหัสนักศึกษา"
                  name="StudentID"
                  value={userData.StudentID}
                  sx={{ marginBottom: 2 }}
                  disabled={!editMode || editMode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="รหัสบัตรประชาชน"
                  name="CitizenID"
                  value={userData.CitizenID}
                  sx={{ marginBottom: 2 }}
                  disabled={!editMode || editMode}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="วันเดือนปีเกิด"
                  name="Birthday"
                  type="date"
                  value={userData.Birthday ? new Date(userData.Birthday).toISOString().slice(0,10) : ''}
                  InputLabelProps={{ shrink: true }}
                  sx={{ marginBottom: 2 }}
                  disabled={!editMode}
                  onChange={(e) => {
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      Birthday: new Date(e.target.value),
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="year-label">ปีที่เข้าศึกษา</InputLabel>
              <Select
                fullWidth
                label="ปีที่เข้าศึกษา"
                name="Year"
                value={userData.Year || ''}
                sx={{ marginBottom: 2 }}
                disabled={!editMode}
                onChange={(e) => {
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    Year: Number(e.target.value), // Explicitly cast to number
                  }));
                }}
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </Select>
              </FormControl>
            </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="เบอร์โทรศัทพ์"
                  name="Tel"
                  value={userData.Tel || ''}
                  sx={{ marginBottom: 2 }}
                  disabled={!editMode}
                  onChange={(e) => {
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      Tel: e.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="อีเมล"
                  name="Email"
                  value={userData.Email || ''}
                  sx={{ marginBottom: 2 }}
                  disabled={!editMode}
                  onChange={(e) => {
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      Email : e.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="majors-label">สำนักวิชา</InputLabel>
              <Select
                fullWidth
                label="สำนักวิชา"
                name="Major"
                value={userData.MajorID || ''}
                sx={{ marginBottom: 2 }}
                disabled={!editMode}
                onChange={(e) => {
                  // Step 5: Update the userData state with the selected blood type's ID
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    MajorID: Number(e.target.value), // Explicitly cast to number
                  }));
                }}
              >
                {/* Map through the bloodTypes state to render MenuItem for each blood type */}
                {majorTypes.map((majorType) => (
                  <MenuItem key={majorType.ID} value={majorType.ID}>
                    {majorType.MajorName}
                  </MenuItem>
                ))}
              </Select>
              </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="bloodType-label">กรุ๊ปเลือด</InputLabel>
                <Select
                  labelId="bloodType-label"
                  id="bloodType"
                  label="กรุ๊ปเลือด"
                  value={userData.BloodTypeID || ''}
                  disabled={!editMode}
                  onChange={(e) => {
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      BloodTypeID: Number(e.target.value), // Explicitly cast to number
                    }));
                  }}
                >
                  {bloodTypes.map((bloodType) => (
                    <MenuItem key={bloodType.ID} value={bloodType.ID}>
                      {bloodType.BloodTypeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="โรคประจำตัว"
                  name="Disease"
                  value={userData.Disease || ''}
                  sx={{ marginBottom: 2 }}
                  disabled={!editMode}
                  onChange={(e) => {
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      Disease: e.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="การแพ้ยา"
                  name="Allergy"
                  value={userData.Allergy || ''}
                  sx={{ marginBottom: 2 }}
                  disabled={!editMode}
                  onChange={(e) => {
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      Allergy: e.target.value,
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="รูปประจำตัว"
                  name="Photo"
                  type="file"
                  // value={userData.Photo || ''}
                  InputLabelProps={{ shrink: true }}
                  sx={{ marginBottom: 2 }}
                  disabled={!editMode}
                  onChange={handleImageChange}
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              onClick={editMode ? handleUserSubmit : handleEditClick}
              style={{ backgroundColor: editMode ? 'green' : 'black', color: 'white'  }}
            >
              {editMode ? 'บันทึก' : 'แก้ไข'}
            </Button>

          </form>
        </Box>

        <Box
            sx={{
              border: 'none', // กำหนด border เป็น none
              borderRadius: 4,
              padding: 3,
              marginBottom: 5,
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
              bgcolor: 'white', // สีพื้นหลังของ Box
    
            }}
          >
          <Typography variant="h4" gutterBottom style={{ marginTop: '10px', marginBottom: '20px'}}>
            ข้อมูลที่อยู่
          </Typography>
          <Divider sx={{ marginBottom: '40px', border: '2',}} />

          <form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="บ้านเลขที่"
                name="HouseNumber"
                value={userData.Address?.HouseNumber || ''}
                sx={{ marginBottom: 2 }}
                disabled={!editMode}
                onChange={(e) => {
                  // ทำการ set ค่าให้กับ userData หรือ state อื่น ๆ ตามต้องการ
                  setUserData(prevUserData => ({
                    ...prevUserData,
                    Address: {
                      ...prevUserData.Address,
                      HouseNumber: e.target.value,
                    },
                  }));
                }}
              />

              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="ถนน"
                  name="Street"
                  value={userData.Address?.Street || ''}
                  sx={{ marginBottom: 2 }}
                  disabled={!editMode}
                  onChange={(e) => {
                    setUserData(prevUserData => ({
                      ...prevUserData,
                      Address: {
                        ...prevUserData.Address,
                        Street: e.target.value,
                      },
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="ตำบล"
                  name="SubDistrict"
                  value={userData.Address?.SubDistrict || ''}
                  sx={{ marginBottom: 2 }}
                  disabled={!editMode}
                  onChange={(e) => {
                    // ทำการ set ค่าให้กับ userData หรือ state อื่น ๆ ตามต้องการ
                    setUserData(prevUserData => ({
                      ...prevUserData,
                      Address: {
                        ...prevUserData.Address,
                        SubDistrict: e.target.value,
                      },
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="อำเภอ"
                  name="District"
                  value={userData.Address?.District || ''}
                  sx={{ marginBottom: 2 }}
                  disabled={!editMode}
                  onChange={(e) => {

                    // ทำการ set ค่าให้กับ userData หรือ state อื่น ๆ ตามต้องการ
                    setUserData(prevUserData => ({
                      ...prevUserData,
                      Address: {
                        ...prevUserData.Address,
                        District: e.target.value,
                      },
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="จังหวัด"
                  name="Province"
                  value={userData.Address?.Province || ''}
                  sx={{ marginBottom: 2 }}
                  disabled={!editMode}
                  onChange={(e) => {
  
                    // ทำการ set ค่าให้กับ userData หรือ state อื่น ๆ ตามต้องการ
                    setUserData(prevUserData => ({
                      ...prevUserData,
                      Address: {
                        ...prevUserData.Address,
                        Province: e.target.value,
                      },
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="รหัสไปรษณีย์"
                  name="PostalCode"
                  value={userData.Address?.PostalCode || ''}
                  sx={{ marginBottom: 2 }}
                  disabled={!editMode}
                  onChange={(e) => {
  
                    // ทำการ set ค่าให้กับ userData หรือ state อื่น ๆ ตามต้องการ
                    setUserData(prevUserData => ({
                      ...prevUserData,
                      Address: {
                        ...prevUserData.Address,
                        PostalCode: e.target.value,
                      },
                    }));
                  }}
                />
              </Grid>
            </Grid>
            <Button variant="contained" 
             onClick={editMode ? handleAddressSubmit : handleEditClick}
             style={{ backgroundColor: editMode ? 'green' : 'black', color: 'white' }}>
            {editMode ? 'บันทึก' : 'แก้ไข'}
            </Button>
          </form>
          </Box>
        </Box>   
      </Container>
      <ToastContainer />
    </React.Fragment>
  );
}

export default Infomation;