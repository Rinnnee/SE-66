import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { CreateContactLog , GetContactLogsByUserID } from '../../../sevices/http/indexcontact';
import { ContactLogInterface } from '../../../interfaces/IContactLog';
import { AdminResponseInterface } from '../../../interfaces/IAdminResponse';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Box, Divider, Grid, MenuItem, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

function UserContact() {
  const [title, setTitle] = useState<string>('');
  const [issueType, setIssueType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [contactLogs, setContactLogs] = useState<ContactLogInterface[]>([]);

  useEffect(() => {
  const userID = localStorage.getItem('uid');
  console.log(userID);

  const fetchContactLogs = async () => {
    if (userID) {
      try {
        const logs = await GetContactLogsByUserID(parseInt(userID, 10));
        
        // Ensure that logs is an array before setting it
        if (Array.isArray(logs)) {
          console.log('Contact Logs:', logs);
          setContactLogs(logs);
        } else {
          console.error('Invalid data returned:', logs);
        }
      } catch (error) {
        console.error('Error fetching contact logs:', error);
      }
    }
  };
  

  fetchContactLogs();
}, []);

  
  
  const handleCreateContactLog = async () => {
    const storedStudentID = localStorage.getItem('StudentID');
    
    if (storedStudentID) {

      const newContactLog: ContactLogInterface = {
        Title: title,
        IssueType: issueType,
        Description: description,
        TimeAt: new Date(),
      };

      const result = await CreateContactLog(storedStudentID, newContactLog);

      if (result.status) {

        // แสดง toast แจ้งเตือน
        toast.success('Contact log created successfully', {
          position: 'top-right',
          autoClose: 3000, // ปิดอัตโนมัติหลังจาก 3 วินาที
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setContactLogs(prevContactLogs => [...prevContactLogs, newContactLog]);
      } else {
        toast.error(result.message);
      }
    } else {
      console.error('Student ID not available.');
    }
  };

  return (
    <Container maxWidth="xl">
      <div style={{ marginTop: '80px' }}>
        
        <Paper elevation={3} style={{ padding: '20px' }}>
        <h2>ติดต่อผู้ดูแลหอพัก</h2>
        <Divider sx={{ marginBottom: '40px', border: '2',}} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="หัวข้อ"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                select
                label="ประเภท"
                variant="outlined"
                fullWidth
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
              >
                <MenuItem value="แจ้งเรื่องผิดกฏหอพัก">แจ้งเรื่องผิดกฏหอพัก</MenuItem>
                <MenuItem value="ติดต่อปัญหาส่วนบุคคล">ติดต่อปัญหาส่วนบุคคล</MenuItem>
                <MenuItem value="แจ้งเหตุทะเลาะวิวาท">แจ้งเหตุทะเลาะวิวาท</MenuItem>
                <MenuItem value="แจ้งเหตุก่อความรบกวน">แจ้งเหตุก่อความรบกวน</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="คำอธิบาย"
                variant="outlined"
                multiline
                rows={3}
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleCreateContactLog}>
                ยันยืน
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>

      {/* แสดงรายการ Contact Logs */}
      {/* Display Contact Logs in a Table */}
      <div style={{ marginTop: '40px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <h2>Contact Logs</h2>
       
        <Table>
          <TableHead>
            <TableRow>
            <TableCell style={{ fontWeight: 'bold' }}>หัวข้อ</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>ประเภท</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>เนื้อความ</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>เวลาร้องเรียน</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>ข้อความตอบกลับ</TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>เวลาตอบกลับ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contactLogs.map((log) => (
              <TableRow key={log.ID}>
                <TableCell>{log.Title}</TableCell>
                <TableCell>{log.IssueType}</TableCell>
                <TableCell>{log.Description}</TableCell>
                <TableCell>{log.TimeAt.toLocaleString()}</TableCell>
                <TableCell>
                  <span style={{ color: log.AdminResponse?.Message ? 'green' : 'red' }}>
                    {log.AdminResponse?.Message ? log.AdminResponse?.Message : 'กรุณารอการตอบกลับ'}
                  </span>
                </TableCell>
                <TableCell>
                  <span style={{ color: log.AdminResponse?.Message ? 'green' : 'red' }}>
                    {log.AdminResponse?.Message ? log.AdminResponse?.TimeStamp.toLocaleString() : 'กรุณารอการตอบกลับ'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </Paper>
      </div>
      
      <ToastContainer />
    </Container>
  );

}

export default UserContact;
