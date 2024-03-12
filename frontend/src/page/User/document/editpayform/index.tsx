import React, { useState, useEffect, useContext } from "react"
import "../payform/payform.css"
import "../resignform/resignform.css"
import { DocumentInterface } from "../../../../interfaces/IDocument"
import { DocumentTypeInterface } from "../../../../interfaces/IDocumentType"
import { DocumentStatusInterface } from "../../../../interfaces/IDocumentStatus"
import { CreatePayForm, GetDocumentStatuses, GetDocumentTypes, GetPayFormByID, UpdateDocument } from "../../../../sevices/http/indexdocument"
import { ToastContainer, toast } from "react-toastify"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Form } from "antd";
import moment from "moment"
import { Container } from "@mui/system";
import { Button, Paper } from "@mui/material";
import { idPayForm } from "../showpayform/index"



function EditPayForm() {
  const [document, setDocument] =useState<Partial<DocumentInterface>>({})
  const [documentType, setDocumentType] =useState<DocumentTypeInterface[]>([])
  const [documentstatus, setDocumentStatus] =useState<DocumentStatusInterface[]>([])
  const navigate = useNavigate();
  const {state} = useLocation()
  const userIDFromLocalStorage = localStorage.getItem("uid")
  const [rDate, setRDate] = useState<any>(new Date());
    console.log(state); 

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

  async function getPayForm() {
    const data = await GetPayFormByID(parseInt(state));
    setDocument(data);
  }

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof EditPayForm;

    const { value } = event.target;

    setDocument({ ...document, [id]: value });
    console.log(document);
  };

  const handleDateChange = (e: { target: { value: string | number | Date; }; }) => {
    const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
    setRDate(new Date(newDate));
    console.log(newDate);
  }; 

  useEffect(() => {
    getDocumentType();
    getDocumentStatus();
    getPayForm();
}, []);


  async function updateDocument() {
  
    let data = {
      ID:document.ID,    
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
    let res = await UpdateDocument(data);
      if (res.status) {
        toast.success("แก้ไขสำเร็จ")
        setTimeout(function () {
          navigate("/showpayform");
        }, 1000);
      } else {
        toast.error(res.message)
        return;
    }
  }

  return (

  <Container maxWidth="xl">
    <Paper elevation={4} style={{ padding: '40px', marginTop : '60px'}}>
    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} 
    pauseOnFocusLoss draggable pauseOnHover theme="dark" />
     <Form onFinish={updateDocument} style={{ marginTop: '15px' }}>
        <h2>แบบฟอร์มขอการชำระค่าหอพักนักศึกษา/ ค่าไฟฟ้า / ค่าน้ำประปา</h2>
        <div className="input-box">
            <label>ค่าหอพัก</label>
            <input className="input-field" type="number" step="0.01" min="0" onChange={handleInputChange} value={document.RoomBill} id="RoomBill" required/>
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
            <label>เนื่องจาก</label>
            <textarea className= "input-field" placeholder="เนื่องจาก" onChange={handleInputChange} value={document.Description} id="Description"/>
        </div>
        <div className="input-box">
            <label>ชำระภายในวันที่</label>
            <input className= "input-field" type="date" onChange={handleDateChange} value={document.DateTimePay?.toLocaleString().split("T")[0]} id="DateTimePay" required/>
        </div>
        
        <div className="confirm-button">
            {/* <button className="confirm-button-detail" type="submit">แก้ไข</button> */}
            <Button variant="contained" color="success" type="submit">
                 ยืนยัน
        </Button>
        </div>

        <Link to="/showpayform">
          <div className="checkform-button">
            {/* <button className="checkform-button-detail">ยกเลิก</button> */}
            <Button variant="contained" color="error" type="submit">
              ยกเลิก
            </Button>
          </div>
        </Link>

      </Form>
    </Paper>
  </Container>
    
  ) 
}

export default EditPayForm
