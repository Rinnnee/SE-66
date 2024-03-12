import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { CreateAdminResponse, GetAllContactLogs } from '../../../sevices/http/indexcontact';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { ContactLogInterface } from '../../../interfaces/IContactLog';
import { AdminResponseInterface } from '../../../interfaces/IAdminResponse';

function Contact() {
  const [contactLogs, setContactLogs] = useState<ContactLogInterface[]>([]);
  const [id, setID] = useState<string>('');
  const [messages, setMessages] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;


  useEffect(() => {
    const fetchContactLogs = async () => {
      try {
        const logs = await GetAllContactLogs();

        if (Array.isArray(logs)) {
          setContactLogs(logs);
        } else {
          console.error('Invalid data returned:', logs);
        }
      } catch (error) {
        console.error('Error fetching contact logs:', error);
      }
    };

    fetchContactLogs();
  }, []);

  
  const handleCreateAdminResponse = async () => {
    const adminID = localStorage.getItem('aid');
  
    if (adminID) {
      // แปลง id เป็น number
      const contactLogID = parseInt(id, 10);
  
      // ตรวจสอบว่า id ไม่เป็น NaN
      if (!isNaN(contactLogID)) {
        const newAdminResponse: AdminResponseInterface = {
          Message: messages,
          TimeStamp: new Date(),
        };
  
        const result = await CreateAdminResponse(parseInt(adminID, 10), contactLogID, newAdminResponse);
  
        if (result.status) {
          toast.success('Reply created successfully', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
  
          const logs = await GetAllContactLogs();
  
          if (Array.isArray(logs)) {
            setContactLogs(logs);
          } else {
            console.error('Invalid data returned:', logs);
          }
        } else {
          console.error(result.message);
        }
      } else {
        console.error('Invalid contactLogID');
      }
    } else {
      console.error('adminID not available.');
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contactLogs.slice(indexOfFirstItem, indexOfLastItem);
  
  return (
    <Container maxWidth="xl">
      <div style={{ marginTop: '80px' }}></div>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <h2>ฟอร์มตอบกลับนักศึกษา</h2>
        <FormControl fullWidth style={{ marginBottom: '15px' }}>
          <InputLabel id="contact-log-id-label">ตอบกลับลำดับที่</InputLabel>
          <Select
            labelId="contact-log-id-label"
            id="contact-log-id"
            value={id}
            onChange={(e) => setID(e.target.value)}
            label="ตอบกลับลำดับที่"
          >
            {contactLogs.map((log) => (
              <MenuItem key={log.ID} value={log.ID}>
                {log.ID}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="ข้อความตอบกลับ"
          variant="outlined"
          fullWidth
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
          style={{ marginBottom: '15px' }}
        />
        <Button onClick={handleCreateAdminResponse} variant="contained" color="primary">
          ยืนยัน
        </Button>
      </Paper>
  
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <h2>Contact Logs</h2>
        <TextField
          label="ค้นหา ลำดับการติดต่อ,รหัสนักศึกษา,ชื่อ-นามสกุล"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: '15px' }}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ลำดับ</TableCell>
              <TableCell>รหัสนักศึกษา</TableCell>
              <TableCell>ชื่อ-นามสกุล</TableCell>
              <TableCell>ห้องพัก</TableCell>
              <TableCell>หัวข้อ</TableCell>
              <TableCell>ประเภท</TableCell>
              <TableCell>การติดต่อ</TableCell>
              <TableCell>เวลาที่ติดต่อ</TableCell>
              <TableCell>ผลการดำเนินการ</TableCell>
              <TableCell>เวลาที่ตอบกลับ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentItems
              .filter((log) => {
                const user = log.User;
                if (!user) return false;

                return (
                  user?.StudentID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  `${user?.FirstName} ${user?.LastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  user?.Room?.RoomName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  log.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  log.IssueType.toLowerCase().includes(searchTerm.toLowerCase())
                );                
              })
              .map((log) => (
                <TableRow key={log.ID}>
                  <TableCell>{log.ID}</TableCell>
                  <TableCell>{log.User?.StudentID}</TableCell>
                  <TableCell>{`${log.User?.FirstName} ${log.User?.LastName}`}</TableCell>
                  <TableCell>{log.User?.Room?.RoomName}</TableCell>
                  <TableCell>{log.Title}</TableCell>
                  <TableCell>{log.IssueType}</TableCell>
                  <TableCell>{log.Description}</TableCell>
                  <TableCell>{log.TimeAt.toLocaleString()}</TableCell>
                  <TableCell>
                    <span style={{ color: log.AdminResponse?.Message ? 'green' : 'red' }}>
                      {log.AdminResponse?.Message ? log.AdminResponse?.Message : 'Waiting for response'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span style={{ color: log.AdminResponse?.Message ? 'green' : 'red' }}>
                      {log.AdminResponse?.Message ? log.AdminResponse?.TimeStamp.toLocaleString() : 'Waiting for response'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
  
        <Grid container justifyContent="space-between" style={{ marginTop: '10px' }}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          variant="outlined"
          color="primary"
          disabled={currentPage === 1}
        >
          ก่อนหน้า
        </Button>
        <span>{`หน้า ${currentPage} / ${Math.ceil(contactLogs.length / itemsPerPage)}`}</span>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          variant="outlined"
          color="primary"
          disabled={indexOfLastItem >= contactLogs.length}
        >
          ถัดไป
        </Button>
      </Grid>
      </Paper>
  
      <ToastContainer />
    </Container>
  );
  
}

export default Contact;
