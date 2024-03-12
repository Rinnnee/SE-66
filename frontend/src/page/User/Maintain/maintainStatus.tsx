import React, { createContext, useEffect, useState } from 'react';
import "./Status.css";
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { useNavigate } from "react-router-dom";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MaintainInterface } from '../../../interfaces/IMaintain';
import { MaintainStatusInterface } from '../../../interfaces/IMaintainstatus';
import { getAllMaintain, updateMaintain, deleteMaintain } from '../../../sevices/http/indexmaintain';
import { ToastContainer, toast } from "react-toastify";
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';  // Import EditIcon
import DeleteIcon from '@mui/icons-material/Delete';
export const idMaintain = createContext(0);

function MaintainStatus() {

 

  const [maintains, setMaintains] = useState<MaintainInterface[]>([]);
  const userID = localStorage.getItem('uid');
  const navigate = useNavigate();
  const [inMaintainID, setInOutFormID] = useState(0);

    

  const getMaintain = async () => {
    let res = await getAllMaintain();
    if (res) {
      setMaintains(res);
    }
  };



  const handleDeleteMaintain = async (maintainID: number | undefined) => {
    if (maintainID !== undefined) {
      try {
        const response = await deleteMaintain(maintainID);
        if (response.status ) {
          toast.success("ลบสำเร็จ");
          getMaintain(); // Refresh the data after deletion
        } 
        else {
          setTimeout(function() {
            window.location.reload();
          },1000);
          getMaintain(); // Refresh the data after deletion
          toast.success("ลบสำเร็จ");
          
        }
      } catch (error) {
        console.error('Error deleting maintain:', error);
        toast.error("เกิดข้อผิดพลาดในการลบ");
      }
    }
  };

  useEffect(() => {
    getMaintain();
    }, []);


  useEffect(() => {
    getMaintain();
  }, [inMaintainID]);

  return (
    <idMaintain.Provider value={inMaintainID}>
    <Container>
     
      <Paper elevation={3} style={{ padding: '30px', marginTop : '60px'}}>
         <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} 
         pauseOnFocusLoss draggable pauseOnHover theme="dark" />
         <div style={{ marginTop: '20px' }}>
            <h2>สถานะแจ้งซ่อม/ทำความสะอาด</h2>
        <Table >
          <TableHead>
            <TableRow>
            <TableCell>ลำดับ</TableCell>
            <TableCell align="left" style={{ fontWeight: 'bold' }}>หัวข้อ</TableCell>
              <TableCell align="left" style={{ fontWeight: 'bold' }}>รายละเอียด</TableCell>
              <TableCell align="center" style={{ fontWeight: 'bold' }}>สถานะ</TableCell>
              <TableCell>  </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maintains
              .filter((maintain) => maintain.User?.ID === Number(userID))
              .slice(0, 20)
              .map((maintain, index) => (
                <TableRow key={index}>
                  <TableCell>{index+1}</TableCell>
                  <TableCell align="left">{maintain.Title}</TableCell>
                  <TableCell align="left">{maintain.Details.toString().substring(0,)}</TableCell>
                  <TableCell align="center">{maintain.MaintainStatus?.MaintainStatusName.toString().substring(0, 25)}</TableCell>
                  
                  <TableCell>
                  <IconButton onClick={() => {
                          if (maintain.ID !== undefined) {
                            console.log(maintain.ID);
                            navigate("/editmaintain", { state: maintain.ID });
                          }
                        }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteMaintain(maintain.ID)}>
                          <DeleteIcon />
                        </IconButton>
                     </TableCell> 
                </TableRow>
              ))}
          </TableBody>
        </Table>
        </div>
         </Paper>
    </Container>
    </idMaintain.Provider>
  );
}

export default MaintainStatus;
