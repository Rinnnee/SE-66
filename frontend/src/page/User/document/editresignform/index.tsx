import React, { useState, useEffect } from "react"
import "../resignform/resignform.css"
import "../depositform/depositform.css"
import { ToastContainer, toast } from "react-toastify"; import "react-toastify/dist/ReactToastify.css"
import { DocumentInterface } from "../../../../interfaces/IDocument"
import { DocumentTypeInterface } from "../../../../interfaces/IDocumentType";
import { DocumentStatusInterface } from "../../../../interfaces/IDocumentStatus";
import { CreateResignForm, GetDocumentStatuses, GetDocumentTypes, GetResignFormByID, UpdateDocument } from "../../../../sevices/http/indexdocument";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form } from "antd";
import moment from "moment";
import { Container } from "@mui/system";
import { Button, Paper } from "@mui/material";

function EditResignForm() {
  const [document, setDocument] =useState<Partial<DocumentInterface>>({})
  const [documentType, setDocumentType] =useState<DocumentTypeInterface[]>([])
  const [documentstatus, setDocumentStatus] =useState<DocumentStatusInterface[]>([])
  const userIDFromLocalStorage = localStorage.getItem("uid")
  const [rDate, setRDate] = useState(new Date());
  const navigate = useNavigate();
  const {state} = useLocation()
        
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

  async function getResignForm() {
    const data = await GetResignFormByID(parseInt(state));
    setDocument(data);
  }

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof EditResignForm;

    const { value } = event.target;

    setDocument({ ...document, [id]: value });
    console.log(document.DateTimeResignation)
  };

  const handleDateChange = (e: { target: { value: string | number | Date; }; }) => {
    const newDate = moment(new Date(e.target.value)).format('YYYY-MM-DD');
    setRDate(new Date(newDate));
    console.log(newDate);
  };  

  useEffect(() => {
    getDocumentType();
    getDocumentStatus();
    getResignForm();
  }, []);

  async function updateDocument() {
    let data = {    
      ID:document.ID,   
      Description:document.Description,
      HouseNumber: document.HouseNumber,          
      VillageNumber: document.VillageNumber,       
      Lane: document.Lane,                
      Street: document.Street,          
      SubDistrict: document.SubDistrict,       
      District: document.District,            
      Province: document.Province,            
      PostalCode:document.PostalCode, 
      Tel: document.Tel,
      DateTimeResignation: rDate, 
      UserID: Number(userIDFromLocalStorage),        
      DocumentStatusID: 1,
      DocumentTypeID: 2
    };
    
    console.log(data);
    let res = await UpdateDocument(data);
      if (res.status) {
        toast.success("แก้ไขสำเร็จ") 
        setTimeout(function () {
            navigate("/showresignform");
        }, 2000);
      } else {
        toast.error(res.message)
      }
  }

  return (
  
  <Container maxWidth="xl">
    <Paper elevation={4} style={{ padding: '40px', marginTop : '60px'}}>
    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} 
    pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    <Form onFinish={updateDocument} style={{ marginTop: '15px' }}>
      <h2>แบบขออนุญาตลาออกหอพัก</h2>
      <div className="input-box">
        <p>เหตุผลที่ลาออกเนื่องจาก</p>
        <textarea className= "input-field" value={document.Description} onChange={handleInputChange} id="Description"/>
      </div>
      <div className="input-box">
        <label>บ้านเลขที่</label>
        <input className="input-field" type="text" placeholder="บ้านเลขที่" onChange={handleInputChange} value={document.HouseNumber} id="HouseNumber" required/>
      </div>
      <div className="input-box">
        <label>หมู่ที่</label>
        <input className="input-field" type="text" placeholder="หมู่ที่" onChange={handleInputChange} value={document.VillageNumber} id="VillageNumber" />
      </div>
      <div className="input-box">
        <label>ซอย</label>
        <input className="input-field" type="text" placeholder="ซอย" onChange={handleInputChange} value={document.Lane} id="Lane" />
      </div>
      <div className="input-box">
        <label>ถนน</label>
        <input className="input-field" type="text" placeholder="ถนน" onChange={handleInputChange} value={document.Street} id="Street" />
      </div>
      <div className="input-box">
        <label>ตำบล/แขวง</label>
        <input className="input-field" type="text" placeholder="ตำบล/แขวง" onChange={handleInputChange} value={document.SubDistrict} id="SubDistrict" required/>
      </div>
      <div className="input-box">
        <label>อำเภอ/เขต</label>
        <input className="input-field" type="text" placeholder="อำเภอ/เขต" onChange={handleInputChange} value={document.District} id="District" required/>
      </div>
      <div className="input-box">
        <label>จังหวัด</label>
        <input className="input-field" type="text" placeholder="จังหวัด" onChange={handleInputChange} value={document.Province} id="Province" required/>
      </div>
      <div className="input-box">
        <label>รหัสไปรษณีย์</label>
        <input className="input-field" type="text" placeholder="รหัสไปรษณีย์" onChange={handleInputChange} value={document.PostalCode} id="PostalCode" required/>
      </div>
      <div className="input-box">
        <label>เบอร์โทรศัพท์</label>
        <input className="input-field" type="text" placeholder="เบอร์โทรศัพท์" onChange={handleInputChange} value={document.Tel} id="Tel" required/>
      </div>
      <div className="input-box">
        <label>วัน/เดือน/ปี ที่ออก</label>
        <input className="input-field" type="date" onChange={handleDateChange} value={document.DateTimeResignation?.toLocaleString().split("T")[0]} id="DateTimeResignation" required/>
      </div>

      <div className="confirm-button">
        {/* <button className="confirm-button-detail" type="submit">ยืนยัน</button> */}
        <Button variant="contained" color="success" type="submit">
                 ยืนยัน
        </Button>
      </div>

      <Link to="/showresignform">
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

export default EditResignForm