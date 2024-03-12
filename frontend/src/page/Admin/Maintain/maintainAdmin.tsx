import React, { useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
// import { useNavigate } from 'react-router-dom';
import {  GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { NumericFormat } from "react-number-format";
import Moment from "react-moment";
import Swal from 'sweetalert2';
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import {Box,Typography,IconButton,Container,Stack, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Select, MenuItem, InputLabel } from '@mui/material';
import { useState } from 'react';
import { MaintainInterface } from '../../../interfaces/IMaintain';
import { getAllMaintain,deleteMaintain,updateMaintain } from '../../../sevices/http/indexmaintain';
import { UserInterface } from '../../../interfaces/Iuser';
import { MaintainStatusInterface } from '../../../interfaces/IMaintainstatus';
import { GetUser } from '../../../sevices/http';


function MaintainAdmin() {
    // const Navigate = useNavigate();
    const [maintain, setMaintain] = React.useState<MaintainInterface[]>([]);
    const [maintainStatusOptions, setMaintainStatusOptions] = useState<MaintainStatusInterface[]>([]);
    

    const stockColumns: GridColDef[] = [
    
      {
        headerName: "ID",   
        field: "ID",
        width: 90,
      },
      {
        headerName: "Image",
        field: "Image",
        width: 130,
        renderCell: (params: GridRenderCellParams<any>) => (
          <img
            src={params.value}  // Assuming 'Image' property contains the URL of the image
            alt="Maintain Image"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ),
      },
      
      {
        headerName: "ชื่อ",
        field: "User.FirstName",
        width: 130,
        valueGetter: (params) => params.row.User?.FirstName || '', // Use valueGetter to handle potential null or undefined values
      }
      ,
      {
        headerName: "นามสกุล",
        field: "User.LastName", // Assuming the last name is a property of the User association
        width: 130,
        valueGetter: (params) => params.row.User?.LastName || '', // Use valueGetter to handle potential null or undefined values
      }
      ,
      {
        headerName: "หัวข้อ",
        field: "Title",
        width: 130,
      },
      {
        headerName: "รายละเอียด",
        field: "Details",
        width: 300,
      },
      {
        headerName: "สถานที่",
        field: "Location",
        width: 150,
      },
      {
        headerName: "วันที่แจ้ง",
        field: "Date",
        width: 150,
        renderCell: ({ value }: GridRenderCellParams<any>) => (
          <Typography variant="body1">
            <Moment format="DD/MM/YYYY ">{value}</Moment>
          </Typography>
        ),
      },
      
    
      {
        headerName: "สถานะ",
        field: "MaintainStatus.MaintainStatusName", // Assuming MaintainStatusName is the property you want to display
        width: 150,
        valueGetter: (params) => params.row.MaintainStatus?.MaintainStatusName || '', // Use valueGetter to handle potential null or undefined values
      },
      
      
      {
        headerName: "ACTION",
        field: ".",
        width: 120,
        renderCell: ({ row }: GridRenderCellParams<any>) => (
          <Stack direction="row">
             <IconButton
              aria-label="edit"
              size="large"
              onClick={() => {
                let timerInterval: any;
                Swal.fire({
                  title: "Please wait",
                  text: "System is going to the edit page !",
                  icon: "warning",
                  timer: 1500,
                  timerProgressBar: true,
                  didOpen: () => {
                    Swal.showLoading();
                  },
                  willClose: () => {
                    clearInterval(timerInterval);
                  },
                }).then(() => {
                  window.location.href = "/editMaintain/" + row.ID;
                });
              }}
            >
              <EditIcon fontSize="inherit" />
            </IconButton> 
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    let res = await deleteMaintain(row.ID);
                    if (res.status) {
                      Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                      });
                    }
                    getMaintain();
                    
                  }
                });
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        ),
      },
    ];

    const getMaintain= async () => {
        
      let res = await getAllMaintain();
      if (res) {
        console.log(res);
        setMaintain(res);
      }
    };

   


    useEffect(() => {
      getMaintain();
    }, []);
  
    return (

      <>
        <Container maxWidth="xl">
        <Paper elevation={3} style={{ padding: '30px', marginTop : '30px'}}>
          <Typography
            variant="h3"
            component="div"
            sx={{
              color: "#ffffff",
              marginBottom: 2,
              textShadow: "1px 2px 6px #121212, 0 0 1em #FFFF, 0 0 0.5em #404040",
              marginTop:10 ,
            }}
          >
            ข้อมูลทำความสะอาดและแจ้งซ่อมหอพัก
          </Typography>
         
          <Box
            sx={{
              width: "100%",
              background: "#FFFF",
              borderRadius: 3,
              boxShadow: "0 0 9px rgba(228, 230, 235,.7),inset 0 0 9px rgba(228, 230, 235,.7)",
            }}
          >
            <Box sx={{ padding: 2 }}>
             
              <DataGrid
                sx={{
                  height: "70vh",
                  marginTop: 2,
                }}
                rows={maintain}
                rowHeight={75}
                autoHeight={true}
                getRowId={(rows) => rows.ID}
                columns={stockColumns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
              />
            </Box>
          </Box>
        
          </Paper>
        </Container>
      </>
    );
}

export default MaintainAdmin;