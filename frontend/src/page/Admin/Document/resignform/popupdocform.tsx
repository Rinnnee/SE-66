import React, { useState , useContext, useEffect } from 'react'
import { idDocmentForm } from './index';
import { DocumentInterface } from '../../../../interfaces/IDocument';
import { GetDocumentByID, UpdateDocumentStatus } from '../../../../sevices/http/indexdocument';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


function PopupDocumentForm({open,onClose,}: {
  open: React.ReactNode;
  onClose: ()=>void;
  }) 
{
  const DocumentID = useContext(idDocmentForm);
  const [Document,setDocument] = useState<DocumentInterface>({});
  const adminIdFromLocalStorage = localStorage.getItem("aid");
  const adminID = adminIdFromLocalStorage
    ? parseInt(adminIdFromLocalStorage, 10)
    : undefined;
  
  const fetchDocumentFormByID = async () => { //ดึงdocumentตามid
    const data = await GetDocumentByID(DocumentID);
      setDocument(data);
  };

  useEffect(() => {
    fetchDocumentFormByID();
  }, [DocumentID]);

  async function updateApprove() {
    let data = {   
      ID: Number(DocumentID),       
      DocumentStatusID: 2,
      AdminID: adminID,
       
    };
    
    let res = await UpdateDocumentStatus(data);
      if (res.status) {
        toast.success("แก้ไขสำเร็จ") 
        setTimeout(function() {
          window.location.reload();
        },1000);
      } else {
        toast.error(res.message)
      }
  }

  async function updateDecline() {
    let data = {   
      ID: Number(DocumentID),       
      DocumentStatusID: 3,
      
    };
    
    console.log(data);
    let res = await UpdateDocumentStatus(data);
      if (res.status) {
        toast.success("แก้ไขสำเร็จ") 
        setTimeout(function() {
          window.location.reload();
        },1000);
        
      } else {
        toast.error(res.message)
      }
  }
  
  return open?(
    
    <div className="popup-docform">      
      <div className="popup-form">
        <div className='button-container'><button className ="close-popup" onClick={onClose}><FontAwesomeIcon icon={faXmark} size="xl"/></button></div>
        <div className="popup-detail">
          <h1>รายละเอียด</h1>
          <div className='center-box-topic'>
              <div className='box-topic-popup-left'>
                <p>รหัสนักศึกษา : {Document?.User?.StudentID} </p> 
                <p>ชื่อ-นามสกุล : {Document?.User?.FirstName} {Document?.User?.LastName} </p>
                <p>สำนักวิชา : {Document?.User?.Major?.MajorName}</p>
              </div>
              <div className='box-topic-popup-right'>
                <p>เลขห้อง : {Document?.User?.Room?.RoomName}</p> 
                <p>วันที่ทำเรื่อง : {Document.CreatedAt?.toLocaleString().split('T')[0]}</p>  
                <p>สถานะ : {Document.DocumentStatus?.DocumentStatusName}</p>
              </div>
            </div>

            {Document.DocumentTypeID === 2 && 
            <div className="box-popup-form">
              <p>ที่อยู่ใหม่ : {Document.HouseNumber} หมู่{Document.VillageNumber === ""?"-":Document.VillageNumber} ซอย {Document.Lane === ""?"-":Document.Lane} ถนน {Document.Street === ""?"-":Document.Street} ตำบล{Document.SubDistrict} อำเภอ{Document.District} จังหวัด{Document.Province} รหัสไปรษณีย์{Document.PostalCode}</p>
              <p>เบอร์โทรติดต่อ : {Document.Tel}</p>
              <p>วันที่ออกหอพัก : {Document.DateTimeResignation?.toLocaleString().split('T')[0]}</p>
              <p>เนื่องจาก : {Document.Description}</p>
            </div>}

            {Document.DocumentTypeID === 1 && 
              <div className="box-popup-form">
              <p>ค่าห้องพัก : {Document.RoomBill}</p>
              <p>ค่าน้ำ : {Document.WaterBill}</p>
              <p>ค่าไฟ : {Document.ElectricBill}</p>
              <p>ชำระภายในวันที่ : {Document.DateTimePay?.toLocaleString().split('T')[0]}</p>
              <p>เนื่องจาก : {Document.Description}</p>
            </div>}

            {Document.DocumentTypeID === 4 && 
              <div className="box-popup-form">
              <p>เรื่องที่ขอ : {Document.RequestInOut?.RequestInOutName}</p>
              <p>วันที่ขออนุญาต : {Document.DateTimeSend?.toLocaleString().split('T')[0]}</p>
              <p>เนื่องจาก : {Document.Description}</p>
            </div>}

            {Document.DocumentTypeID === 3 && 
              <div className="box-popup-form">
              <p>ธนาคาร : {Document.Bank?.BankName}</p>
              <p>เลขที่บัญชี : {Document.BankNumber}</p>
              <p>เบอร์โทรติดต่อ : {Document.Tel}</p>
              <p>เนื่องจาก : {Document.Description}</p>
            </div>}
            {Document.DocumentStatus?.DocumentStatusName === "รอการอนุมัติ" && 
            <div className='center-button-popup-form'>
              <button className='button-confirm-form'  onClick={updateApprove}>อนุมัติ</button>
              <button className='button-cancel-form'   onClick={updateDecline}>ไม่อนุมัติ</button>
            </div>}
          </div>

      </div>
    </div>
    
    
   
  ):null
}

export default PopupDocumentForm