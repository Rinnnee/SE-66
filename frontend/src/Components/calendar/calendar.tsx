import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box } from '@mui/material';


export default function BasicDateCalendar() {
  return (
   
    <LocalizationProvider dateAdapter={AdapterDayjs}  >
      <Box sx={{backgroundColor:'#616161',width:'400px' ,marginTop:5 ,boxShadow:4 ,borderRadius: "5%", }}>
      <DateCalendar  />
      </Box>  
    </LocalizationProvider>
    
  );
}