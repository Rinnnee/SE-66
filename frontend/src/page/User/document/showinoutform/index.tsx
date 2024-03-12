import { Container, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import React, { useState, useEffect, createContext } from "react"
import { DocumentInterface } from "../../../../interfaces/IDocument";
import { DeleteDocumentID, GetInOutFormByUserID} from "../../../../sevices/http/indexdocument";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import  "../showresignform/showresign.css";
import { Popconfirm } from "antd";
export const idInOutForm = createContext(0);


function ShowInOutForm() {
   const [document, setDocument] = useState<DocumentInterface[]>([]);
   const navigate = useNavigate();
   const [inOutFormID, setInOutFormID] = useState(0);
   const userID = localStorage.getItem("uid")
      console.log(userID);
      const cancel = () => {
         toast.error('Click on No');
      };  
      const fetchInOutForm = async () => {
       
         const data = await GetInOutFormByUserID(Number(userID));
         
            setDocument(data);
         
      }    
      console.log(document);

      async function deleteDocumentID(ID: number) {
         let res = await DeleteDocumentID(Number(ID));
         if (res.status === true) {
           toast.success("ลบสำเร็จ");
           fetchInOutForm();
         } else {
           toast.error("ลบไม่สำเร็จ");
         }
      }
      
   useEffect(() => {
    fetchInOutForm();
    }, []);

   useEffect(() => {
      fetchInOutForm();
   }, [inOutFormID]);

   return (
   <idInOutForm.Provider value={inOutFormID}>
      <Container maxWidth="xl">
         <Paper elevation={3} style={{ padding: '30px', marginTop : '60px'}}>
         <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} 
         pauseOnFocusLoss draggable pauseOnHover theme="dark" />
         <div style={{ marginTop: '20px' }}>
            <h2>แบบขออนุญาต เข้า-ออกหอพักหลังเวลาปิดหอพัก/ค้างคืนนอกหอพัก</h2>
            <Table>
               <TableHead>
                  <TableRow>
                  <TableCell>ลำดับ</TableCell>
                  <TableCell>รหัสนักศึกษา</TableCell>
                  <TableCell>เรื่องที่ขอ</TableCell>
                  <TableCell>เหตุผล</TableCell>
                  <TableCell>วันที่ทำเรื่อง</TableCell>
                  <TableCell>วันที่ขออนุญาต</TableCell>
                  <TableCell>สถานะ</TableCell>
                  <TableCell>  </TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {document.map((data,index) => ( 
                  <TableRow key={index}>
                     <TableCell>{index+1}</TableCell>
                     <TableCell>{data.User?.StudentID!}</TableCell>
                     <TableCell>{data.RequestInOut?.RequestInOutName}</TableCell>
                     <TableCell sx={{overflowY:"auto",maxWidth:"300px",maxHeight:"20px"}}>{data.Description}</TableCell> 
                     <TableCell>{data.CreatedAt?.toLocaleString().split('T')[0]}</TableCell>
                     <TableCell>{data.DateTimeSend?.toLocaleString().split('T')[0]}</TableCell>
                     <TableCell sx={{ color: data.DocumentStatus?.DocumentStatusName === "อนุมัติ" ? 'green' :data.DocumentStatus?.DocumentStatusName === "ไม่อนุมัติ" ? 'red':'#f56129' , fontWeight:"700"  }}>{data.DocumentStatus?.DocumentStatusName}</TableCell>   
                    
                     <TableCell>
                     {data.DocumentStatus?.DocumentStatusName === "รอการอนุมัติ" &&
                        <button className="icon-document" onClick={() => {
                           if(data.ID !== undefined){
                              console.log(data.ID);
                              navigate("/editinoutform",{state: data.ID});
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
                        </Popconfirm>}
                     </TableCell> 
                  </TableRow>
                     ))}
               </TableBody>
            </Table>
            
         </div>
         </Paper>
      </Container>
   </idInOutForm.Provider>
   )
  
  }
  export default ShowInOutForm
  

  