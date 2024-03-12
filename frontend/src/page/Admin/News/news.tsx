import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { NewsInterface } from '../../../interfaces/INews';
import { createNews, getAllCategories } from '../../../sevices/http/indexnews';
import { useNavigate } from 'react-router-dom';
import { CategoryInterface } from '../../../interfaces/ICategory';
import Select, { SelectChangeEvent } from '@mui/material/Select'; // Import SelectChangeEvent
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Swal from "sweetalert2";
import Typography from '@mui/material/Typography';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ToastContainer, toast } from "react-toastify"; import "react-toastify/dist/ReactToastify.css"

interface FormData {
  title: string;
  details: string;
  datePosted: string;
  image: string;
  link: string;
  CategoryID: string;
  AdminID: string;

}

interface FormErrors {
  [key: string]: string; // Index signature
}

function NewsForm() {
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [validationErrors, setValidationErrors] = useState<FormErrors>({}); // Declare validationErrors state
  const [categories, setCategory] = useState<CategoryInterface[]>([]);
  const Navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    details: '',
    datePosted: new Date().toISOString().split('T')[0], // Set initial date value to current date
    image: '',
    link: '',
    CategoryID: '',
    AdminID: '',

  });
  const adminIdFromLocalStorage = localStorage.getItem('aid');
  const AdminID = adminIdFromLocalStorage
    ? parseInt(adminIdFromLocalStorage, 10)
    : undefined;
  console.log("adminID", AdminID)
  const getAllCategory = async () => {

    let res = await getAllCategories();
    if (res) {
      console.log(res);
      setCategory(res);
    }
  };


  const navigate = useNavigate();

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

    const requestData: NewsInterface = {
      Title: formData.title,
      Details: formData.details,
      DatePosted: new Date(formData.datePosted),
      Image: formData.image,
      Link: formData.link,
      CategoryID: Number(formData.CategoryID),
      AdminID: Number(AdminID),
    };

    const createdNews = await createNews(requestData);

    console.log('Created News:', createdNews);

    if (createdNews.status) {
      Swal.fire({
        title: "Success",
        text: "สร้างข่าวสารสำเร็จ !",
        icon: "success",
        timer: 4000,
      }).then((result) => {
        if (result) {
          Navigate("/Homeadmin");
        }
      });
    } else {
      /* Swal.fire({
        title: "ไม่สามรถเเก้ไขได้",
        text: " กรุณาตรวจสอบความถูกต้อง!",
        icon: "error",
        timer: 4000,
      }); */
      toast.error(createdNews.message)
    }

  };

  // ฟังก์ชันสำหรับ Select
  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, CategoryID: value }));
  };


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


  React.useEffect(() => {
    getAllCategory()
  }, []);


  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false}
          pauseOnFocusLoss draggable pauseOnHover theme="dark" />
        <Box
          sx={{
            bgcolor: '#FFFFFF',
            borderRadius: 2,
            border: '1px solid #ccc',
            padding: 3,
            marginTop: 10,
            marginBottom: 3,
            width: '100%',
            height: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >


          <form onSubmit={handleSubmit}>
            <Typography variant="h5" sx={{ color: 'black', marginTop: 0, marginLeft: 2, fontSize: '36px' }}>
              เพิ่มข้อมูลข่าวสาร
            </Typography>
            <InputLabel htmlFor="maintainTypeId">ประเภทข่าวสาร</InputLabel>
            <Select
              fullWidth
              id="CategoryID"
              name="CategoryID"
              value={formData.CategoryID}
              onChange={handleSelectChange}
              label="Category"
            >
              {Array.isArray(categories) && categories.length > 0 ? (
                categories.map((type) => {
                  console.log('Category:', type); // เพิ่มบรรทัดนี้
                  return (
                    <MenuItem key={type.ID} value={type.ID}>
                      {type.CategoryName}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem disabled>No category available</MenuItem>
              )}
            </Select>
            <TextField
              fullWidth
              margin="normal"
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleTextFieldChange}
              required
              sx={{ marginBottom: '16px' }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Details"
              name="details"
              multiline
              rows={4}
              value={formData.details}
              onChange={handleTextFieldChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Date Posted"
              name="datePosted"
              type="date"
              value={formData.datePosted}
              onChange={handleTextFieldChange}
              InputLabelProps={{
                shrink: true,
              }}
              defaultValue={new Date().toISOString().split('T')[0]}
              required
            />

            <TextField
              fullWidth
              margin="normal"
              label="Link"
              name="link"
              value={formData.link}
              onChange={handleTextFieldChange}
              required
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
              <div key={fieldName}>
                {formErrors[fieldName]}
              </div>
            ))}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button type="submit" variant="contained" style={{ backgroundColor: '#90DE33', color: 'white' }}>
                ยืนยัน
              </Button>
            </Box>


          </form>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default NewsForm;
