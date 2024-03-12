import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { UserInterface } from '../../../interfaces/Iuser';
import { Box } from '@mui/material';

function InfoPopUp({
  open,
  onClose,
  user,
}: {
  open: boolean;
  onClose: () => void;
  user?: UserInterface;
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Box borderBottom={2}>
          ข้อมูลส่วนตัวนักศึกษา
        </Box>
        </DialogTitle>
        <DialogContent>
          {user && (
            <>
              <DialogContentText color="textPrimary">{`ชื่อ: ${user.FirstName} ${user.LastName}`}</DialogContentText>
              <DialogContentText color="textPrimary">{`รหัสนักศึกษา: ${user.StudentID}`}</DialogContentText>
              <DialogContentText color="textPrimary">{`อีเมล: ${user.Email || '-'}`}</DialogContentText>
              
              <DialogContentText color="textPrimary">{`วันเกิด: ${user.Birthday ? new Date(user.Birthday).toISOString().slice(0,10) : ''}`}</DialogContentText>
       
              <DialogContentText color="textPrimary">{`เบอร์ติดต่อ: ${user.Tel || '-'}`}</DialogContentText>
              <DialogContentText color="textPrimary">{`โรคประจำตัว: ${user.Disease || '-'}`}</DialogContentText>
              <DialogContentText color="textPrimary">{`อาการแพ้: ${user.Allergy || '-'}`}</DialogContentText>
              <DialogContentText color="textPrimary">{`กรุ๊ปเลือด: ${user.BloodType?.BloodTypeName || '-'}`}</DialogContentText>
              <DialogContentText color="textPrimary">{`สำนักวิชา: ${user.Major?.MajorName || '-'}`}</DialogContentText>
              {/* Displaying Address Information */}
              {user.Address && (
                <>
                  <DialogContentText color="textPrimary">{`ที่อยู่ปัจจุบัน: ${user.Address.HouseNumber} ถนน${user.Address.Street || ' '} ตำบล${user.Address.SubDistrict || ' '} อำเภอ${user.Address.District || ' '} จังหวัด${user.Address.Province || ' '} รหัสไปรณีย์ ${user.Address.PostalCode || ' '}`}</DialogContentText>
                </>
              )}

              {/* Add other fields as needed */}
            </>
          )}
        </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          ปิดหน้าต่าง
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InfoPopUp;
