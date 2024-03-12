import React, { useEffect, useState, createContext } from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import blankProfile from './blankprofile.png';
import { UserInterface } from '../../../interfaces/Iuser';
import { GetAllUsers, DeleteUser } from '../../../sevices/http/indexuser';
import { Box, Button, Divider } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import InfoPopUp from "./InfoPopUp";


export const idEditContext = createContext(0);

function UserAll() {

  const [users, setUsers] = useState<UserInterface[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cardsPerPage] = useState<number>(4); // สามารถปรับจำนวนการ์ดต่อหน้าได้ตามต้องการ

  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    open: boolean;
    studentID?: string;
  }>({
    open: false,
  });

  const [searchTerm, setSearchTerm] = useState<string>('');

  const [infoPopUp, setInfoPopUp] = useState<{
    open: boolean;
    user?: UserInterface;
  }>({
    open: false,
  });


  useEffect(() => {
    // ดึงข้อมูลผู้ใช้ทั้งหมดเมื่อ Component โหลด
    fetchUsers();
  }, []);


  const [clickedRowId, setClickedRowId] = useState<number | null>(null);
  

  const handleOpenInfoPopUp = (user: UserInterface) => {
    setInfoPopUp({ open: true, user });
  };
  
  const handleCloseInfoPopUp = () => {
    setInfoPopUp({ open: false });
  };
  
  const fetchUsers = async () => {
    try {
      const data = await GetAllUsers();
      setUsers(data || []); // กำหนดข้อมูลผู้ใช้ใน state
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (studentID: string) => {
    setDeleteConfirmation({ open: true, studentID });
  };

  const handleConfirmDelete = async () => {
    try {
      // ลบผู้ใช้ตาม StudentID
      await DeleteUser(deleteConfirmation.studentID || '');
      // หลังจากลบเสร็จแล้ว ดึงข้อมูลผู้ใช้ใหม่
      await fetchUsers(); // เปลี่ยนจาก fetchUsers() เป็น await fetchUsers()
      // ปิดตัวยืนยันการลบ
      setDeleteConfirmation({ open: false });

      // แสดง toast success
      toast.success('User deleted successfully');
    } catch (error) {
      console.error(`Error deleting user with StudentID ${deleteConfirmation.studentID}:`, error);
      // ปิดตัวยืนยันการลบ
      setDeleteConfirmation({ open: false });

      // แสดง toast error
      toast.error('Error deleting user');
    }
  };

  const handleCancelDelete = () => {
    // ปิดตัวยืนยันการลบ
    setDeleteConfirmation({ open: false });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    (user?.FirstName ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user?.LastName ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user?.StudentID ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user?.Room?.RoomName ?? '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  // คำนวณหน้าทั้งหมด
  const totalPages = Math.ceil(filteredUsers.length / cardsPerPage);

  // กำหนด index ของการ์ดเริ่มต้นและสิ้นสุดของหน้าปัจจุบัน
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstCard, indexOfLastCard);
  
  
  // ฟังก์ชันเปลี่ยนหน้า
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex-1"> 
    <InfoPopUp open={infoPopUp.open} onClose={handleCloseInfoPopUp} user={infoPopUp.user} />
    <Container maxWidth="xl">
    <Box
            sx={{
              marginTop: 10,
              border: 'none', // กำหนด border เป็น none
              borderRadius: 4,
              paddingTop:4,
              paddingBottom:4,
              paddingLeft: 6,
              paddingRight: 6,
              marginBottom: 10,
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
              bgcolor: 'white', // สีพื้นหลังของ Box
    
            }}
          >

          <Typography variant="h4" gutterBottom style={{ marginTop: '10px', marginBottom: '20px' }}>
            ข้อมูลนักศึกษาในหอพัก
          </Typography>
         <Divider sx={{ marginBottom: '20px', border: '3',}} />

      <TextField
        label="ค้นหา รหัสนักศึกษา,ชื่อ-นามสกุล,ห้อง"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px' }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(calc(25% - 16px), 1fr))', gap: '20px' }}>

          {currentUsers.map((user) => (
            <Card key={user.ID} style={{ marginBottom: '10px', position: 'relative', marginRight: '8px', overflow: 'hidden' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'left', padding: '0' }}>
              <Typography variant="h5" component="div" style={{ minHeight: '300px', margin: '0' }}>
                {user.Photo ? (
                  <img
                    src={user.Photo}
                    alt={`photo-${user.ID}`}
                    className="w-20 h-20 object-cover mt-2"
                    style={{ width: '100%', height: '100%' }}
                  />
                ) : (
                  <img
                    src={blankProfile}
                    alt={`blank-profile-photo-${user.ID}`}
                    className="w-20 h-20 object-cover mt-2"
                    style={{ width: '100%', height: '100%' }}
                  />
                )}
              </Typography>
              <div style={{ textAlign: 'left', marginTop: '10px' ,marginBottom: '30px'}}>
                <Typography variant="h6" component="div" style={{ marginRight: '10px',marginLeft: '10px' }}>
                  {`${user?.FirstName} ${user?.LastName}`}
                </Typography>
                <Typography color="text.secondary" style={{ marginTop: '5px',marginRight: '10px',marginLeft: '10px' }}>{`รหัสนักศึกษา: ${user?.StudentID}`}</Typography>
                <Typography color="text.secondary" style={{ marginRight: '10px',marginLeft: '10px' }}>{`ห้องพัก: ${user.Room?.RoomName || "N/A"}`}</Typography>
                <Typography color="text.secondary" style={{ marginRight: '10px',marginLeft: '10px' }}>{`เบอร์ติดต่อ: ${user.Tel}`}</Typography>
              </div>

            </CardContent>
            <IconButton
              color="info"
              onClick={() => handleOpenInfoPopUp(user)}
              style={{ position: 'absolute', bottom: '8px', left: '8px' }}
            >
              <Tooltip title="View Personal Information">
                <InfoIcon />
              </Tooltip>
            </IconButton>
            <IconButton
              color="error"
              onClick={() => handleDeleteUser(user.StudentID || '')}
              style={{ position: 'absolute', bottom: '8px', right: '8px' }}
            >
              <DeleteIcon />
            </IconButton>
          </Card>
          
        ))}
      
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button variant="contained" onClick={prevPage} disabled={currentPage === 1}>ก่อนหน้า</Button>
          <Typography variant="body1">{`หน้า ${currentPage} / ${totalPages}`}</Typography>
          <Button variant="contained" onClick={nextPage} disabled={currentPage === totalPages}>ถัดไป</Button>
        </div>   
  </Box>
  
      <Dialog
        open={deleteConfirmation.open}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
       
        </DialogActions>
      </Dialog>
      <ToastContainer/>
     
    </Container>
     </div> 
  );
}

export default UserAll;
