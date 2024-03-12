import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select'; // Import SelectChangeEvent
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography'; // เพิ่มการนำเข้า Typography
import { MaintainInterface } from '../../../interfaces/IMaintain';
import { MaintainTypeInterface } from '../../../interfaces/IMaintaintype';
import { GetMaintainById, updateMaintainUser, getMaintainTypeList } from '../../../sevices/http/indexmaintain';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { ToastContainer, toast } from "react-toastify"; import "react-toastify/dist/ReactToastify.css"
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


interface FormErrors {
  [key: string]: string;
}

function EdiMaintain() {
  const [validationErrors, setValidationErrors] = useState<FormErrors>({});
  const [formErrors, setFormErrors] = useState<FormErrors>({}); // Updated to store errors for each field
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [maintain, setMaintain] = useState<Partial<MaintainInterface>>({})
  const [maintainTypes, setMaintainTypes] = useState<MaintainTypeInterface[]>([]);
  const [formData, setFormData] = useState({} as MaintainInterface);

  const { state } = useLocation()
  const userID = localStorage.getItem('uid');


  // ฟังก์ชันสำหรับ Select
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      MaintainType: {
        ...(prevData.MaintainType || {}), // Preserve existing properties if they exist
        MaintainTypeName: value,
      },
    }));
  };


  // ฟังก์ชันสำหรับ TextField
  const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const { name } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: FormErrors = {};
    if (!formData.Image) {
      validationErrors.image = 'Please upload an image.';
    }
    setValidationErrors(validationErrors);


    try {
      const requestData: MaintainInterface = {
        ID: Number(state),
        Title: formData?.Title,
        Details: formData?.Details,
        Location: formData?.Location,
        Contact: formData?.Contact,
        Date: new Date(formData?.Date),
        Annotation: formData?.Annotation,
        Age: Number(formData.Age),
        MaintainTypeID: Number(formData.MaintainType?.MaintainTypeName),
        Image: formData.Image,
        UserID: Number(userID),
        MaintainStatusID: 1,
      };
      console.log('Request Data:', requestData);

      const UpdateMaintain = await updateMaintainUser(requestData);

      console.log('Update Maintain:', UpdateMaintain);
      if (UpdateMaintain.status) {
        setOpenDialog(true);
      } else {
        toast.error(UpdateMaintain.message)
      }
    } catch (error) {
      console.error('Error update maintain record:', error);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate('/maintainStatus');
  };

  useEffect(() => {
    const userID = localStorage.getItem('uid');
    console.log("userID", userID);

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
        setFormData({ ...formData, Image: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  async function getNewMaintain() {
    const requestData = await GetMaintainById(parseInt(state));
    console.log("GetMaintainByID", requestData);
    setMaintain(requestData);
    setFormData(requestData);
  }

  useEffect(() => {
    getNewMaintain();
    // getMaintain()
  }, []);

  console.log(formData);
  console.log(formData.MaintainType?.MaintainTypeName);
  console.log(formData.Date?.toLocaleString().split("T")[0])


  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}
          pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        <Box
          sx={{
            //zIndex: 'left',
            bgcolor: '#FFFFFF',
            borderRadius: 2, // ขอบมน
            border: '1px solid #ccc', // ความหนา, สี, และลักษณะอื่นๆ ของเส้นขอบ
            padding: 3,
            marginTop: 10,
            marginLeft: 1,
            marginBottom: 3,
            width: '100%',
            height: 'auto',
            //display: 'flex',
            //alignItems: 'center',
            boxShadow: 5,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Typography variant="h5" sx={{ color: 'black', marginTop: 0, marginLeft: 2, fontSize: '36px' }}>
              แจ้งซ่อม/ทำความสะอาด
            </Typography>


            <InputLabel htmlFor="MaintainTypeID">ประเภทแจ้งซ่อม</InputLabel>
            <Select
              fullWidth
              id="MaintainTypeID"
              name="MaintainTypeID"
              value={formData.MaintainType?.MaintainTypeName}
              onChange={handleSelectChange}
              label="Maintain Type"

            >

              {Array.isArray(maintainTypes) && maintainTypes.length > 0 ? (
                maintainTypes.map((type) => {
                  console.log('Maintain Type:', type); // เพิ่มบรรทัดนี้
                  return (
                    <MenuItem key={type.ID} value={type.ID} >
                      {type.MaintainTypeName}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem disabled>No maintain types available</MenuItem>
              )}
            </Select>

            <TextField
              fullWidth
              margin="normal"
              name="Title"
              multiline
              defaultValue={formData.Title}
              onChange={handleTextFieldChange}
              required
              sx={{ marginBottom: '16px' }} // Add margin at the bottom
            />
            <TextField
              fullWidth
              margin="normal"
              name="Details"
              multiline
              rows={4}
              defaultValue={formData.Details}
              onChange={handleTextFieldChange}
              required
            />

            <TextField
              fullWidth
              margin="normal"
              multiline
              name="Location"
              defaultValue={formData.Location}
              onChange={handleTextFieldChange}
            />
            <TextField
              fullWidth
              margin="normal"
              multiline
              name="Contact"
              defaultValue={formData.Contact}
              onChange={handleTextFieldChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="Age"
              type="number"
              value={formData.Age}
              onChange={handleTextFieldChange}
            />
            <TextField
              fullWidth

              margin="normal"
              type="date"
              label="วันที่"
              name="Date"
              value={formData.Date?.toLocaleString().split("T")[0]}
              onChange={handleTextFieldChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              name="Annotation"
              multiline
              rows={4}
              defaultValue={formData.Annotation}
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
                แก้ไข
              </Button>
            </Box>
          </form>
        </Box>

      </Container>

      {/* Dialog for submission success */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>แก้ไขข้อมูลสำเร็จ</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            การแก้ไขข้อมูลของท่านสำเร็จ.
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

export default EdiMaintain;
