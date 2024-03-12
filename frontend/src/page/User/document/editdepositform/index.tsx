import React, { useState, useEffect } from "react"
import "../depositform/depositform.css"
import "../resignform/resignform.css"
import { DocumentInterface } from "../../../../interfaces/IDocument"
import { DocumentTypeInterface } from "../../../../interfaces/IDocumentType"
import { DocumentStatusInterface } from "../../../../interfaces/IDocumentStatus"
import { CreateDepositForm, GetDepositFormByID, GetDocumentBanks, GetDocumentStatuses, GetDocumentTypes, UpdateDocument } from "../../../../sevices/http/indexdocument"
import { ToastContainer, toast } from "react-toastify"
import { BankInterface } from "../../../../interfaces/IBank"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button, Container, Paper } from "@mui/material"
import { Form } from "antd"



function EditDepositForm() {
  const [document, setDocument] =useState<Partial<DocumentInterface>>({})
  const [documentType, setDocumentType] =useState<DocumentTypeInterface[]>([])
  const [documentstatus, setDocumentStatus] =useState<DocumentStatusInterface[]>([])
  const [bank, setBank] = React.useState<BankInterface[]>([]);
  const userIDFromLocalStorage = localStorage.getItem("uid")
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

  const getDocumentBank = async () => {
    let res = await GetDocumentBanks();
    if (res) {
      setBank(res);
    }
  }; 

  async function getDepositForm() {
    const data = await GetDepositFormByID(parseInt(state));
      setDocument(data);
  }

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof EditDepositForm;

    const { value } = event.target;

    setDocument({ ...document, [id]: value });
  };

  useEffect(() => {
    getDocumentType();
    getDocumentStatus();
    getDocumentBank();
    getDepositForm();
  }, []);

  async function updateDocument() {

    let data = {    
      ID:document.ID, 
      Description:document.Description,
      BankNumber: document.BankNumber, 
      Tel: document.Tel,     
      UserID: Number(userIDFromLocalStorage), 
      DocumentStatusID: 1,
      DocumentTypeID: 3,
      BankID:Number(document.BankID)
    };

    console.log(data);
    let res = await UpdateDocument(data);
    if (res.status) {
      toast.success("แก้ไขสำเร็จ")
      setTimeout(function () {
        navigate("/showdepositform");
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
            <h2>แบบฟอร์มขอคืนเงินประกันหอพัก</h2>
                <div className="input-box">
                    <p>เบอร์โทรศัพท์</p>
                    <input className= "input-field" type="text" onChange={handleInputChange} value={document.Tel} id="Tel" required/>
                </div>
                <div className="input-box">
                    <p>เนื่องจาก</p>
                    <textarea className= "input-field" value={document.Description} onChange={handleInputChange} id="Description"/>
                 </div>
                <div className="input-box">
                    <p>ช่องทางการรับเงินคืน</p>
                    <select id="BankID"  className="input-field"  value={document.BankID} onChange={handleInputChange}>
                        <option  value="" >ช่องทางการรับเงินคืน</option>
                        {bank.map((item: BankInterface) => (
                        <option key={item.ID} value={item.ID}>
                        {item.BankName}
                        </option>))}
                    </select>
                </div>
                {document.BankID != 5 && document.BankID && 
                <div className="input-box">
                    <p>เลขที่บัญชี</p>
                    <input className= "input-field" type="text"  onChange={handleInputChange} value={document.BankNumber} id="BankNumber" required/>
                </div>
                }
                <div className="confirm-button">
                    {/* <button className="confirm-button-detail" type="submit">ยืนยัน</button> */}
                    <Button variant="contained" color="success" type="submit">
                            ยืนยัน
                    </Button>
                </div>

                <Link to="/showdepositform">
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
export default EditDepositForm

