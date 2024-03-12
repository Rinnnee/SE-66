import { Container, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import React, { useState, useEffect, createContext } from "react"
import { DocumentInterface } from "../../../../interfaces/IDocument";
import { DeleteDocumentID, GetResignFormByUserID } from "../../../../sevices/http/indexdocument";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import  "./showresign.css";
import { Popconfirm } from "antd";
export const idResignForm = createContext(0);

function ShowResignForm() {
   const [document, setDocument] = useState<DocumentInterface[]>([]);
   const navigate = useNavigate();
   const userID = localStorage.getItem("uid")
   const [currentPage, setCurrentPage] = useState(1);
   const [resignFormID, setResignFormID] = useState(0);

   const rowsPerPage = 6;
   const startIndex = (currentPage - 1) * rowsPerPage;
   const endIndex = startIndex + rowsPerPage;
   const visibleRowdocumentform = document.slice(startIndex, endIndex);
    
      const cancel = () => {
         toast.error('Click on No');
      };   

      const fetchResignForm = async () => {
        
         const data = await GetResignFormByUserID(Number(userID));
            setDocument(data);
        
      };
      console.log(document);

      async function deleteDocumentID(ID: number) {
         let res = await DeleteDocumentID(Number(ID));
         if (res.status === true) {
           toast.success("ลบสำเร็จ");
           fetchResignForm();
         } else {
           toast.error("ลบไม่สำเร็จ");
         }
      }

   useEffect(() => {
     fetchResignForm();
    }, []);

    useEffect(() => {
      fetchResignForm();
     }, [resignFormID]);

   return (
      <idResignForm.Provider value={resignFormID}>
      <Container maxWidth="xl">
         <Paper elevation={3} style={{ padding: '30px', marginTop : '60px'}}>
         <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} 
         pauseOnFocusLoss draggable pauseOnHover theme="dark" />
         <div style={{ marginTop: '20px' }}>
            <h2>แบบขออนุญาตลาออกหอพัก</h2>
            <Table>
               <TableHead>
                  <TableRow>
                  <TableCell>ลำดับ</TableCell>
                  <TableCell>รหัสนักศึกษา</TableCell>
                  <TableCell>เบอร์โทรติดต่อ</TableCell>
                  <TableCell>ที่อยู่</TableCell>
                  <TableCell>วันที่ทำเรื่อง</TableCell>
                  <TableCell>วันที่ออกหอพัก</TableCell>
                  <TableCell>เหตุผล</TableCell>
                  <TableCell>สถานะ</TableCell>
                  <TableCell></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {visibleRowdocumentform.map((data,index) => ( 
                  <TableRow key={index}>
                     <TableCell>{index+1+(currentPage - 1) * rowsPerPage}</TableCell>
                     <TableCell>{data.User?.StudentID!}</TableCell>
                     <TableCell>{data.Tel}</TableCell>
                     <TableCell sx={{maxWidth:"250px",maxHeight:"20px"}}>
                        <div className="pos">
                        {data.HouseNumber} {data.VillageNumber} 
                        {data.Lane} {data.Street} {data.SubDistrict} {data.District} {data.Province} {data.PostalCode}
                        </div>
                     </TableCell>
                     <TableCell>{data.CreatedAt?.toLocaleString().split('T')[0]}</TableCell>
                     <TableCell>{data.DateTimeResignation?.toLocaleString().split('T')[0]}</TableCell>
                     <TableCell sx={{overflowX:"auto",maxWidth:"250px",maxHeight:"20px"}}>{data.Description}</TableCell> 
                     <TableCell sx={{ color: data.DocumentStatus?.DocumentStatusName === "อนุมัติ" ? 'green' :data.DocumentStatus?.DocumentStatusName === "ไม่อนุมัติ" ? 'red':'#f56129' , fontWeight:"700"  }}>{data.DocumentStatus?.DocumentStatusName}</TableCell>  
                     
                     <TableCell>
                     {data.DocumentStatus?.DocumentStatusName === "รอการอนุมัติ" && 
                        
                        <button className="icon-document" onClick={() => {
                        if(data.ID !== undefined){
                           console.log(data.ID);
                           navigate("/editresignform",{state: data.ID});
                        }}}>
                        <FontAwesomeIcon icon={faPen} size="xl" style={{color:"#555555"}} />
                        </button>}
                     {data.DocumentStatus?.DocumentStatusName === "รอการอนุมัติ" && 
                        <Popconfirm
                        title="ลบการจอง"
                        description="คุณต้องการที่จะลบรายการนี้ใช่มั้ย"
                        onConfirm={() => deleteDocumentID(data.ID!)}
                        onCancel={() => cancel}
                        okText="Yes"
                        cancelText="No"
                        >
                        <button className="icon-document">
                          <FontAwesomeIcon icon={faTrashCan} size="xl" style={{color:"#555555"}} />
                        </button>
                        </Popconfirm>
                        }

                        
                     </TableCell> 
                  </TableRow>
                     ))}
               </TableBody>
            </Table>
            
         </div>
         </Paper>
      </Container>
      </idResignForm.Provider>

   )
  
  }
  export default ShowResignForm
  

  