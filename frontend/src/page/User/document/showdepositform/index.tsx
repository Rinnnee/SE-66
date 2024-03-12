import { Container, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import React, { useState, useEffect, createContext } from "react"
import { DocumentInterface } from "../../../../interfaces/IDocument";
import { DeleteDocumentID, GetDepositFormByUserID } from "../../../../sevices/http/indexdocument"
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Popconfirm } from "antd";
import  "../showresignform/showresign.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
export const idDepositForm = createContext(0);

function ShowDepositForm() {
   const [document, setDocument] = useState<DocumentInterface[]>([]);
   const navigate = useNavigate();
   const [depositFormID, setDepositFormID] = useState(0);
   const userID = localStorage.getItem("uid")
   
      const cancel = () => {
         toast.error('Click on No');
      };   
    
      const fetchDeposit = async () => {
       
         const data = await GetDepositFormByUserID(Number(userID));
            setDocument(data);
      };
      console.log(document);

      async function deleteDocumentID(ID: number) {
         let res = await DeleteDocumentID(Number(ID));
         if (res.status === true) {
           toast.success("ลบสำเร็จ");
           fetchDeposit();
         } else {
           toast.error("ลบไม่สำเร็จ");
         }
      }

   useEffect(() => {
      fetchDeposit();
    }, []);

    useEffect(() => {
      fetchDeposit();
     }, [depositFormID]);


   return (
   <idDepositForm.Provider value={depositFormID}>
      <Container maxWidth="xl">
         <Paper elevation={3} style={{ padding: '30px', marginTop : '60px'}}>
         <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} 
         pauseOnFocusLoss draggable pauseOnHover theme="dark" />
         <div style={{ marginTop: '20px' }}>
            <h2>แบบฟอร์มขอคืนเงินประกันหอพัก</h2>
            <Table>
               <TableHead>
                  <TableRow>
                  <TableCell>ลำดับ</TableCell>
                  <TableCell>รหัสนักศึกษา</TableCell>
                  <TableCell>เบอร์โทรติดต่อ</TableCell>
                  <TableCell>ธนาคาร</TableCell>
                  <TableCell>เลขที่บัญชี</TableCell>
                  <TableCell>วันที่ทำเรื่อง</TableCell>
                  <TableCell>เหตุผล</TableCell>
                  <TableCell>สถานะ</TableCell>
                  <TableCell></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {document.map((data,index) => ( 
                  <TableRow key={index}>
                     <TableCell>{index+1}</TableCell>
                     <TableCell>{data.User?.StudentID!}</TableCell>
                     <TableCell>{data.Tel}</TableCell>
                     <TableCell>{data.Bank?.BankName!}</TableCell>
                     <TableCell>{data.BankNumber}</TableCell>
                     <TableCell>{data.CreatedAt?.toLocaleString().split('T')[0]}</TableCell>
                     <TableCell sx={{overflowY:"auto",maxWidth:"300px",maxHeight:"20px"}}>{data.Description}</TableCell> 
                     <TableCell sx={{ color: data.DocumentStatus?.DocumentStatusName === "อนุมัติ" ? 'green' :data.DocumentStatus?.DocumentStatusName === "ไม่อนุมัติ" ? 'red':'#f56129' , fontWeight:"700"  }}>{data.DocumentStatus?.DocumentStatusName}</TableCell> 
                     
                     <TableCell>
                     {data.DocumentStatus?.DocumentStatusName === "รอการอนุมัติ" &&
                        <button  className="icon-document" onClick={() => {
                           if(data.ID !== undefined){
                              console.log(data.ID);
                              navigate("/editdepositform",{state: data.ID});
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
   </idDepositForm.Provider>

      
   )
  
  }
  export default ShowDepositForm
  

  