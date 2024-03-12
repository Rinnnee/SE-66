import React, { useState, useEffect } from "react"
import "./payform.css"
import "../resignform/resignform.css"
import { DocumentInterface } from "../../../../interfaces/IDocument"
import { DocumentTypeInterface } from "../../../../interfaces/IDocumentType"
import { DocumentStatusInterface } from "../../../../interfaces/IDocumentStatus"
import { CreatePayForm, GetDocumentStatuses, GetDocumentTypes } from "../../../../sevices/http/indexdocument"
import { ToastContainer, toast } from "react-toastify"
import { Link, useNavigate } from "react-router-dom"
import { Form } from "antd";
import moment from "moment"
import { Container } from "@mui/system";
import { Button, Paper } from "@mui/material";



function PayForm() {
  const [document, setDocument] =useState<Partial<DocumentInterface>>({})
  const [documentType, setDocumentType] =useState<DocumentTypeInterface[]>([])
  const [documentstatus, setDocumentStatus] =useState<DocumentStatusInterface[]>([])
  const navigate = useNavigate();
  const userIDFromLocalStorage = localStorage.getItem("uid")
  const [rDate, setRDate] = useState<any>(new Date());


  const getDocumentType = async () => {
    let res = await GetDocumentTypes();
    if (res) {
      setDocumentType(res);
    }
  };

  const getDocumentStatus = async () => {
    let res = await GetDocumentStatuses();
    if (res) {
      setDocumentStatus(res);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof PayForm;

    const { value } = event.target;

    setDocument({ ...document, [id]: value });
  };

  const handleDateChange = (e: { target: { value: string | number | Date; }; }) => {
    const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
    setRDate(new Date(newDate));
    console.log(newDate);
  }; 

  useEffect(() => {
    getDocumentType();
    getDocumentStatus();
  }, []);

  async function createDocument() {
  
    let data = {    
      Description:document.Description,
      RoomBill: Number(document.RoomBill),             
      ElectricBill: Number(document.ElectricBill),        
      WaterBill: Number(document.WaterBill),            
      DateTimePay: rDate,  
      UserID: Number(userIDFromLocalStorage),      
      DocumentStatusID: 1,
      DocumentTypeID: 1
    };

    console.log(data);
    let res = await CreatePayForm(data);
      if (res.status) {
        toast.success("สร้างสำเร็จ")
        setTimeout(()=>{
          navigate("/showpayform");
        }, 1000);
      } else {
        toast.error(res.message)
        return;
    }
  }

  return (

  <Container maxWidth="xl">
    <Paper elevation={4} style={{ padding: '40px', marginTop : '55px' , borderRadius: '20px 20px 20px 20px'}}>
    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} 
    pauseOnFocusLoss draggable pauseOnHover theme="dark" />
     <Form onFinish={createDocument} style={{ marginTop: '15px' }}>
          <h2>แบบฟอร์มขอการชำระค่าหอพักนักศึกษา/ ค่าไฟฟ้า / ค่าน้ำประปา</h2>
        <div className="input-box">
            <label>ค่าหอพัก</label>
            <input className="input-field" placeholder="ค่าหอพัก" type="number" step="0.01" min="0" onChange={handleInputChange} value={document.RoomBill} id="RoomBill" required/>
        </div>
       
        <div className="input-box">
            <label>ค่าไฟฟ้า</label>
            <input className="input-field" placeholder="ค่าไฟฟ้า" type="number" step="0.01" min="0" onChange={handleInputChange} value={document.ElectricBill} id="ElectricBill" required/>
        </div>
        <div className="input-box">
            <label>ค่าน้ำ</label>
            <input className="input-field" placeholder="ค่าน้ำ" type="number" step="0.01" min="0" onChange={handleInputChange} value={document.WaterBill} id="WaterBill" required/>
        </div>
        <div className="input-box">
            <label>ชำระภายในวันที่</label>
            <input className= "input-field" type="date" onChange={handleDateChange} value={document.DateTimePay?.toLocaleString()} id="DateTimePay" required/>
        </div>
        <div className="input-box">
            <label>เนื่องจาก</label>
            <textarea className= "input-field" placeholder="เนื่องจาก" onChange={handleInputChange} value={document.Description} id="Description"/>
        </div>
        
        <div className="confirm-button">
            {/* <button className="confirm-button-detail" type="submit">ยืนยัน</button> */}
            <Button variant="contained" color="success" type="submit">
                ยืนยัน
            </Button>
        </div>

        <Link to="/showpayform">
          <div className="checkform-button">
            {/* <button className="checkform-button-detail">ตรวจสอบคำขออนุมัติ</button> */}
            <Button variant="contained" color="info" type="submit">
              ตรวจสอบคำขออนุมัติ
            </Button>
          </div>
        </Link>
      </Form>
    </Paper>
  </Container>
    
  ) 
}

export default PayForm
