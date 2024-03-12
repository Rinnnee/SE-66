import { Container, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import React, { useState, useEffect, createContext } from "react"
import { DocumentInterface } from "../../../../interfaces/IDocument";
import { ToastContainer } from "react-toastify";
import { GetAllDepositForms, GetAllInOutForms, GetAllPayForms, GetAllResignForms, } from "../../../../sevices/http/indexdocument";
import  "./popupdocform.css";
import PopupResign from "./popupdocform";
import { faChevronLeft, faChevronRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";


export const idDocmentForm = createContext(0);

function ShowAllFormForAdmin() {
   const [resignform, setResignForm] = useState<DocumentInterface[]>([]);
   const [payform, setPayForm] = useState<DocumentInterface[]>([]);
   const [depositform, setDepositForm] = useState<DocumentInterface[]>([]);
   const [inoutform, setInOutForm] = useState<DocumentInterface[]>([]);
   const [showpoppost, setshowpoppost] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [DocumentFormID , setDocumentFormID] = useState(0);

   const rowsPerPage = 5;
   const startIndex = (currentPage - 1) * rowsPerPage;
   const endIndex = startIndex + rowsPerPage;
   const visibleRowresignform = resignform.slice(startIndex, endIndex);
   const visibleRowrepayform = payform.slice(startIndex, endIndex);
   const visibleRowredepositform = depositform.slice(startIndex, endIndex);
   const visibleRowreinoutform = inoutform.slice(startIndex, endIndex);


   
   const fetchAllResignForm = async () => {
      const data = await GetAllResignForms();
         setResignForm(data);
   };

   const fetchAllPayForm = async () => {
      const data = await GetAllPayForms();
         setPayForm(data);
   };

   const fetchAllDepositForm = async () => {
      const data = await GetAllDepositForms();
         setDepositForm(data);
   };

   const fetchAllInOutForm = async () => {
      const data = await GetAllInOutForms();
         setInOutForm(data);
   };

   useEffect(() => {
      fetchAllResignForm();
      fetchAllPayForm();
      fetchAllDepositForm();
      fetchAllInOutForm();
   }, []);
   return (
     <idDocmentForm.Provider value={DocumentFormID}>
      <Container maxWidth="xl">
         <Paper elevation={3} style={{ padding: '30px', marginTop : '60px', height:"600px"}}>
         <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} 
         pauseOnFocusLoss draggable pauseOnHover theme="dark" />
         <div style={{ marginTop: '20px' }}>
            <h2>แบบขออนุญาตลาออกหอพัก</h2>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>ลำดับ</TableCell>
                     <TableCell>รหัสนักศึกษา</TableCell>
                     <TableCell>วันที่ทำเรื่อง</TableCell>
                     <TableCell>วันที่ออกหอพัก</TableCell>
                     <TableCell>เหตุผล</TableCell>
                     <TableCell>สถานะ</TableCell>
                     <TableCell></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {visibleRowresignform.map((data,index) => ( 
                  <TableRow key={index}>
                     <TableCell>{index+1+(currentPage - 1) * rowsPerPage}</TableCell>
                     <TableCell>{data.User?.StudentID!}</TableCell>
                     <TableCell>{data.CreatedAt?.toLocaleString().split('T')[0]}</TableCell>
                     <TableCell>{data.DateTimeResignation?.toLocaleString().split('T')[0]}</TableCell>
                     <TableCell sx={{overflowY:"auto",maxWidth:"300px",maxHeight:"20px"}}>{data.Description}</TableCell> 
                     <TableCell sx={{ color: data.DocumentStatus?.DocumentStatusName === "อนุมัติ" ? 'green' :data.DocumentStatus?.DocumentStatusName === "ไม่อนุมัติ" ? 'red':'#f56129' , fontWeight:"700"  }}>
                                    {data.DocumentStatus?.DocumentStatusName}
                     </TableCell> 
                     <TableCell>
                        <button className="duu-button" onClick={()=>{
                           setshowpoppost(true);
                           setDocumentFormID(Number(data.ID));}}>
                           <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" style={{color:"#555555"}}/>
                        </button>
                     </TableCell>  
                  </TableRow>
                  ))}
               </TableBody>
            </Table>
            <PopupResign open={showpoppost} onClose={()=>setshowpoppost(false)}/>  
            <div className="nextdoc-but">
               <button style={{ backgroundColor: "transparent",borderColor: "transparent",color: "black",fontSize: 40,}}
                       onClick={() => setCurrentPage(currentPage - 1)}
                       disabled={currentPage === 1}>
                       <FontAwesomeIcon icon={faChevronLeft} size="2xs" style={{color:"#555555"}}/>
               </button>
               <span style={{ fontSize: 20, fontWeight: 20 }}>{currentPage}</span>
               <button style={{backgroundColor: "transparent", borderColor: "transparent", color: "black",fontSize: 40,}}
                       onClick={() => setCurrentPage(currentPage + 1)}
                       disabled={endIndex >= resignform.length}>
                       <FontAwesomeIcon icon={faChevronRight} size="2xs" style={{color:"#555555"}}/>
               </button>
            </div> 
         </div>
         </Paper>

         <Paper elevation={3} style={{ padding: '30px', marginTop : '60px', height:"600px"}}>
         <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} 
         pauseOnFocusLoss draggable pauseOnHover theme="dark" />
         <div style={{ marginTop: '20px' }}>
            <h2>ประวัติการทำเรื่องยื่นอนุมัติแบบฟอร์มขอผ่อนผันการชำระค่าหอพักนักศึกษา/ค่าไฟฟ้า/ค่าน้ำ</h2>
            <Table>
               <TableHead>
                  <TableRow>
                  <TableCell>ลำดับ</TableCell>
                  <TableCell>รหัสนักศึกษา</TableCell>
                  <TableCell>วันที่ทำเรื่อง</TableCell>
                  <TableCell>ชำระภายในวันที่</TableCell>
                  <TableCell>เหตุผล</TableCell>
                  <TableCell>สถานะ</TableCell>
                  <TableCell></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {visibleRowrepayform.map((data,index) => ( 
                  <TableRow key={index}>
                     <TableCell>{index+1+(currentPage - 1) * rowsPerPage}</TableCell>
                     <TableCell>{data.User?.StudentID!}</TableCell>
                     <TableCell>{data.CreatedAt?.toLocaleString().split('T')[0]}</TableCell>
                     <TableCell>{data.DateTimePay?.toLocaleString().split('T')[0]}</TableCell>
                     <TableCell sx={{overflowY:"auto",maxWidth:"300px",maxHeight:"20px"}}>{data.Description}</TableCell> 
                     <TableCell sx={{ color: data.DocumentStatus?.DocumentStatusName === "อนุมัติ" ? 'green' :data.DocumentStatus?.DocumentStatusName === "ไม่อนุมัติ" ? 'red':'#f56129' , fontWeight:"700"  }}>{data.DocumentStatus?.DocumentStatusName}</TableCell>  
                     <TableCell>
                        <button className="duu-button" onClick={()=>{
                           setshowpoppost(true);
                           setDocumentFormID(Number(data.ID));
                           }}>
                           <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" style={{color:"#555555"}}/>
                        </button>
                     </TableCell>  
                  </TableRow>))}
               </TableBody>
            </Table>
            <div className="nextdoc-but">
               <button style={{ backgroundColor: "transparent",borderColor: "transparent",color: "black",fontSize: 40,}}
                       onClick={() => setCurrentPage(currentPage - 1)}
                       disabled={currentPage === 1}>
                       <FontAwesomeIcon icon={faChevronLeft} size="2xs" style={{color:"#555555"}}/>
               </button>
               <span style={{ fontSize: 20, fontWeight: 20 }}>{currentPage}</span>
               <button style={{backgroundColor: "transparent", borderColor: "transparent", color: "black",fontSize: 40,}}
                       onClick={() => setCurrentPage(currentPage + 1)}
                       disabled={endIndex >= payform.length}>
                       <FontAwesomeIcon icon={faChevronRight} size="2xs" style={{color:"#555555"}}/>
               </button>
            </div> 
         </div>
         </Paper>


         <Paper elevation={3} style={{ padding: '30px', marginTop : '60px', height:"600px"}}>
         <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} 
         pauseOnFocusLoss draggable pauseOnHover theme="dark" />
         <div style={{ marginTop: '20px' }}>
            <h2>แบบขออนุญาต เข้า-ออกหอพักหลังเวลาปิดหอพัก/ค้างคืนนอกหอพัก</h2>
            <Table>
               <TableHead>
                  <TableRow>
                  <TableCell>ลำดับ</TableCell>
                  <TableCell>รหัสนักศึกษา</TableCell>
                  <TableCell>วันที่ทำเรื่อง</TableCell>
                  <TableCell>วันที่ขออนุญาต</TableCell>
                  <TableCell>เหตุผล</TableCell>
                  <TableCell>สถานะ</TableCell>
                  <TableCell></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {visibleRowreinoutform.map((data,index) => ( 
                  <TableRow key={index}>
                     <TableCell>{index+1}</TableCell>
                     <TableCell>{data.User?.StudentID!}</TableCell>
                     {/* <TableCell>{data.RequestInOut?.RequestInOutName}</TableCell> */}
                     <TableCell>{data.CreatedAt?.toLocaleString().split('T')[0]}</TableCell>
                     <TableCell>{data.DateTimeSend?.toLocaleString().split('T')[0]}</TableCell>
                     <TableCell sx={{overflowY:"auto",maxWidth:"300px",maxHeight:"20px"}}>{data.Description}</TableCell> 
                     <TableCell sx={{ color: data.DocumentStatus?.DocumentStatusName === "อนุมัติ" ? 'green' :data.DocumentStatus?.DocumentStatusName === "ไม่อนุมัติ" ? 'red':'#f56129' , fontWeight:"700"  }}>{data.DocumentStatus?.DocumentStatusName}</TableCell>   
                     <TableCell>
                        <button className="duu-button" onClick={()=>{
                           setshowpoppost(true);
                           setDocumentFormID(Number(data.ID));
                           }}>
                           <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" style={{color:"#555555"}}/>
                        </button>
                     </TableCell>  
                  </TableRow>
                     ))}
               </TableBody>
            </Table>
            <div className="nextdoc-but">
               <button style={{ backgroundColor: "transparent",borderColor: "transparent",color: "black",fontSize: 40,}}
                       onClick={() => setCurrentPage(currentPage - 1)}
                       disabled={currentPage === 1}>
                       <FontAwesomeIcon icon={faChevronLeft} size="2xs" style={{color:"#555555"}}/>
               </button>
               <span style={{ fontSize: 20, fontWeight: 20 }}>{currentPage}</span>
               <button style={{backgroundColor: "transparent", borderColor: "transparent", color: "black",fontSize: 40,}}
                       onClick={() => setCurrentPage(currentPage + 1)}
                       disabled={endIndex >= inoutform.length}>
                       <FontAwesomeIcon icon={faChevronRight} size="2xs" style={{color:"#555555"}}/>
               </button>
            </div> 
         </div>
         </Paper>
         <Paper elevation={3} style={{ padding: '30px', marginTop : '60px', height:"600px"}}>
         <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} 
         pauseOnFocusLoss draggable pauseOnHover theme="dark" />
         <div style={{ marginTop: '20px' }}>
            <h2>แบบฟอร์มขอคืนเงินประกันหอพัก</h2>
            <Table>
               <TableHead>
                  <TableRow>
                  <TableCell>ลำดับ</TableCell>
                  <TableCell>รหัสนักศึกษา</TableCell>
                  {/* <TableCell>เบอร์โทรติดต่อ</TableCell>
                  <TableCell>ธนาคาร</TableCell> */}
                  {/* <TableCell>เลขที่บัญชี</TableCell> */}
                  <TableCell>วันที่ทำเรื่อง</TableCell>
                  <TableCell>เหตุผล</TableCell>
                  <TableCell>สถานะ</TableCell>
                  <TableCell></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {visibleRowredepositform.map((data,index) => ( 
                  <TableRow key={index}>
                     <TableCell>{index+1+(currentPage - 1) * rowsPerPage}</TableCell>
                     <TableCell>{data.User?.StudentID!}</TableCell>
                     {/* <TableCell>{data.Tel}</TableCell>
                     <TableCell>{data.Bank?.BankName!}</TableCell> */}
                     {/* <TableCell>{data.BankNumber}</TableCell> */}
                     <TableCell>{data.CreatedAt?.toLocaleString().split('T')[0]}</TableCell>
                     <TableCell sx={{overflowY:"auto",maxWidth:"300px",maxHeight:"20px"}}>{data.Description}</TableCell> 
                     <TableCell sx={{ color: data.DocumentStatus?.DocumentStatusName === "อนุมัติ" ? 'green' :data.DocumentStatus?.DocumentStatusName === "ไม่อนุมัติ" ? 'red':'#f56129' , fontWeight:"700"  }}>{data.DocumentStatus?.DocumentStatusName}</TableCell> 
                     <TableCell>
                        <button className="duu-button" onClick={()=>{
                           setshowpoppost(true);
                           setDocumentFormID(Number(data.ID));
                           }}>
                           <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" style={{color:"#555555"}}/>
                        </button>
                     </TableCell>  
                  </TableRow>
                     ))}
               </TableBody>
            </Table>
            <div className="nextdoc-but">
               <button style={{ backgroundColor: "transparent",borderColor: "transparent",color: "black",fontSize: 40,}}
                       onClick={() => setCurrentPage(currentPage - 1)}
                       disabled={currentPage === 1}>
                       <FontAwesomeIcon icon={faChevronLeft} size="2xs" style={{color:"#555555"}}/>
               </button>
               <span style={{ fontSize: 20, fontWeight: 20 }}>{currentPage}</span>
               <button style={{backgroundColor: "transparent", borderColor: "transparent", color: "black",fontSize: 40,}}
                       onClick={() => setCurrentPage(currentPage + 1)}
                       disabled={endIndex >= depositform.length}>
                       <FontAwesomeIcon icon={faChevronRight} size="2xs" style={{color:"#555555"}}/>
               </button>
            </div> 
            
         </div>
         </Paper>

      </Container> 
      </idDocmentForm.Provider>
     

   )
  
  }
  export default ShowAllFormForAdmin
  

  