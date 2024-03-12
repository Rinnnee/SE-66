import React, { useState, useEffect } from "react"
import "../inoutform/inoutform.css"
import { DocumentInterface} from "../../../../interfaces/IDocument"
import { DocumentStatusInterface } from "../../../../interfaces/IDocumentStatus"
import { DocumentTypeInterface } from "../../../../interfaces/IDocumentType"
import { CreateInOutForm, GetDocumentStatuses, GetDocumentTypes, GetInOutFormByID, GetRequestInOuts, UpdateDocument } from "../../../../sevices/http/indexdocument"
import { ToastContainer, toast } from "react-toastify"
import { RequestInOutInterface } from "../../../../interfaces/IRequestInOut"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Form } from "antd";
import moment from "moment"
import { Button, Paper } from "@mui/material"
import { Container } from "@mui/system";


function EditInOutForm() {
  const [document, setDocument] =useState<Partial<DocumentInterface>>({})
  const [documentType, setDocumentType] =useState<DocumentTypeInterface[]>([])
  const [documentstatus, setDocumentStatus] =useState<DocumentStatusInterface[]>([])
  const [requestInOut, setRequestInOut] = React.useState<RequestInOutInterface[]>([])
  const userIDFromLocalStorage = localStorage.getItem("uid")
  const [rDate, setRDate] = useState<any>(new Date());
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

  const getRequestInOut = async () => {
    let res = await GetRequestInOuts();
    if (res) {
        setRequestInOut(res);
    }
  };

  async function getInOutForm() {
    const data = await GetInOutFormByID(parseInt(state));
    setDocument(data);
  }

 
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof EditInOutForm;

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
    getRequestInOut();
    getInOutForm();
  
  }, []);

  async function updateDocument() {
    
  
    let data = { 
    ID:document.ID,   
      Description:document.Description,
      RequestInOutID:Number(document.RequestInOutID),
      DateTimeSend: rDate, 
      UserID: Number(userIDFromLocalStorage),      
      DocumentStatusID: 1,
      DocumentTypeID: 4,
    
    };

    console.log(data);
    let res = await UpdateDocument(data);
    if (res.status) {
      toast.success("แก้ไขสำเร็จ")
      setTimeout(function () {
        navigate("/showinoutform");
    }, 1000);
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
          <h2>แบบฟอร์มขออนุญาต เข้า-ออกหอพักหลังเวลาปิดหอพัก/ค้างคืนนอกหอพัก</h2>
            <div className="radio">
              <p>เรื่องที่ขอ</p>
              <div className="radio-box">
                {requestInOut.map((item: RequestInOutInterface) => (
                  <div key={item.ID}>
                    <input type="radio" id="RequestInOutID" value={item.ID} name="requestInOut" onChange={handleInputChange}  checked={item.ID===document.RequestInOutID}/>
                    <label htmlFor={`item.ID`}>{item.RequestInOutName}</label>
                  </div>
                ))}
                        
                            
              </div>
            </div>
            <div className="input-box">
              <p>เนื่องจาก</p>
              <textarea className= "input-field" value={document.Description} onChange={handleInputChange} id="Description"/>
            </div>
            <div className="input-box">
              <p>วันที่ขออนุญาต</p>
              <input className= "input-field" type="date" onChange={handleDateChange} value={document.DateTimeSend?.toLocaleString().split("T")[0]} id="DateTimeSend" required/>
            </div>
            <div className="confirm-button">
              {/* <button className="confirm-button-detail" type="submit">ยืนยัน</button> */}
              <Button variant="contained" color="success" type="submit">
                 ยืนยัน
              </Button>
            </div>
            <Link to="/showinoutform">
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
export default EditInOutForm

