import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select'; // Import SelectChangeEvent
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography'; // เพิ่มการนำเข้า Typography
import { MaintainInterface } from '../../../interfaces/IMaintain';
import { MaintainTypeInterface } from '../../../interfaces/IMaintaintype';
import {createMaintain,getMaintainTypeList} from '../../../sevices/http/indexmaintain';
import { useNavigate } from 'react-router-dom';
import { Input, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ToastContainer, toast } from "react-toastify"; import "react-toastify/dist/ReactToastify.css"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


interface FormData {
  title: string;
  details: string;
  location: string;
  contact: string;
  date: string;
  image: string;
  annotation: string;
  age: number;
  maintainTypeId: string;
}
interface FormErrors {
  [key: string]: string; // Index signature
}

function MaintainForm() {
  const [validationErrors, setValidationErrors] = useState<FormErrors>({});
  const [formErrors, setFormErrors] = useState<FormErrors>({}); // Updated to store errors for each field
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [maintainTypes, setMaintainTypes] = useState<MaintainTypeInterface[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    details: '',
    location: '',
    contact: '',
    date: new Date().toISOString().split('T')[0], // Set initial date value to current date
    image: '',
    annotation: '',
    age: 0,
    maintainTypeId: '',
  });


  const userID = localStorage.getItem('uid');

  // ฟังก์ชันสำหรับ Select
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, maintainTypeId: value }));
  };


  // ฟังก์ชันสำหรับ TextField
  const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: FormErrors = {};
    if (!formData.image) {
      validationErrors.image = 'Please upload an image.';
    }
    setValidationErrors(validationErrors);


    try {
      const requestData: MaintainInterface = {
        Title: formData.title,
        Details: formData.details,
        Location: formData.location,
        Contact: formData.contact,
        Date: new Date(formData.date),
        Annotation: formData.annotation,
        Age: Number(formData.age),
        MaintainTypeID: Number(formData.maintainTypeId),
        Image: formData.image,
        UserID: Number(userID),
        MaintainStatusID: 1,
      };
      console.log('Request Data:', requestData);

      const createdMaintain = await createMaintain(requestData);

      console.log('Created Maintain:', createdMaintain);
      if (createdMaintain.status) {
        setOpenDialog(true);
      } else {
        toast.error(createdMaintain.message)
      }
    } catch (error) {
      console.error('Error creating maintain record:', error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate('/maintainStatus');
  };

  useEffect(() => {
    const userID = localStorage.getItem('uid');
    console.log(userID);

    const fetchMaintainTypes = async () => {
      try {
        const maintainTypesData = await getMaintainTypeList();
        console.log('Maintain Types Data:', maintainTypesData);
        setMaintainTypes(maintainTypesData);

      } catch (error) {
        console.error('Error fetching maintain types:', error);
      }
    };
    fetchMaintainTypes();
  }, []);


  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData({ ...formData, image: base64String });
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}
          pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        <Box
          sx={{
            bgcolor: '#FFFFFF',
            borderRadius: 2, 
            border: '1px solid #ccc', 
            padding: 3,
            marginTop: 10,
            marginLeft: 1,
            marginBottom: 3,
            width: '100%',
            height: 'auto',
            
            boxShadow: 5,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h5" sx={{ color: 'black', marginTop: 0, marginLeft: 2, fontSize: '36px' }}>
                แจ้งซ่อม/ทำความสะอาด
              </Typography>
              <Button
                variant="contained"
                style={{ backgroundColor: '#D3D3D3', color: 'black', marginTop: 0, marginLeft: 50, fontSize: '16px' }}
                onClick={() => navigate('/maintainStatus')}
              >
                สถานะแจ้งซ่อม
              </Button>
            </Box>


            <InputLabel htmlFor="maintainTypeId">ประเภทแจ้งซ่อม</InputLabel>
            <Select
              fullWidth
              id="maintainTypeId"
              name="maintainTypeId"
              value={formData.maintainTypeId}
              onChange={handleSelectChange}
              label="Maintain Type"
            >
              {Array.isArray(maintainTypes) && maintainTypes.length > 0 ? (
                maintainTypes.map((type) => {
                  console.log('Maintain Type:', type); // เพิ่มบรรทัดนี้
                  return (
                    <MenuItem key={type.ID} value={type.ID}>
                      {type.MaintainTypeName}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem disabled>No maintain types available</MenuItem>
              )}
            </Select>


            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                fullWidth
                margin="normal"
                label="หัวข้อเรื่อง"
                name="title"
                value={formData.title}
                onChange={handleTextFieldChange}
                required
                sx={{ marginRight: '8px' }} // ระยะห่างของ TextField กับ TextField ถัดไป
              />

              <TextField
                fullWidth
                margin="normal"
                label="สถานที่"
                name="location"
                value={formData.location}
                onChange={handleTextFieldChange}
              />
            </Box>



            <TextField
              fullWidth
              margin="normal"
              label="รายละเอียด"
              name="details"
              multiline
              rows={4}
              value={formData.details}
              onChange={handleTextFieldChange}
              required
            />



            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                fullWidth
                margin="normal"
                label="เบอร์โทรติดต่อ"
                name="contact"
                value={formData.contact}
                onChange={handleTextFieldChange}
                sx={{ marginRight: '8px' }} // ระยะห่างของ TextField กับ TextField ถัดไป
              />
              <TextField
                fullWidth
                margin="normal"
                label="อายุ"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleTextFieldChange}
                sx={{ marginRight: '8px' }} // ระยะห่างของ TextField กับ TextField ถัดไป
              />
              <TextField
                fullWidth
                margin="normal"
                type="date"
                label="วันที่"
                name="date"
                value={formData.date}
                onChange={handleTextFieldChange}
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={new Date().toISOString().split('T')[0]} // Set default value to current date
              />
            </Box>

            <TextField
              fullWidth
              margin="normal"
              label="หมายเหตุ"
              name="annotation"
              multiline
              rows={4}
              value={formData.annotation}
              onChange={handleTextFieldChange}
            />
            <label htmlFor="Image" style={{ cursor: 'pointer' }}>
              <AddPhotoAlternateIcon fontSize="large" />
              <input
                type="file"
                id="Image"
                name="Image"
                accept="image/*"
                onChange={handleImageChange}
                className={`mt-2 ${validationErrors.Image ? "border-red-500" : ""}`}
                style={{ display: 'none', marginTop: 50, }} // ซ่อน input file
              />
            </label>

            {Object.keys(formErrors).map((fieldName) => (
              <Typography key={fieldName} variant="body1" color="error">
                {formErrors[fieldName]}
              </Typography>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" variant="contained" style={{ backgroundColor: '#90DE33', color: 'white' }}>
                ยืนยัน
              </Button>
            </Box>


          </form>
        </Box>
      </Container>

      {/* Dialog for submission success */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Submission Successful</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Your submission was successful.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default MaintainForm;
