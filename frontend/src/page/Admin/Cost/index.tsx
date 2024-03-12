import React, { useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
// import { useNavigate } from 'react-router-dom';
import {  GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { NumericFormat } from "react-number-format";
import Moment from "react-moment";
import Swal from 'sweetalert2';
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import {Box,Typography,IconButton,Container,Stack ,Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';



import { CostInterface } from '../../../interfaces/ICost';
import { GetCost,DeleteCostID } from '../../../sevices/http/indexcost';



function Cost() {
    // const Navigate = useNavigate();
    const [cost, setCost] = React.useState<CostInterface[]>([]);
   
    const stockColumns: GridColDef[] = [
    
      {
        headerName: "ลำดับ",   
        field: "ID",
        width: 90,
      },
      {
        headerName: "เลขห้อง",
        field: "room_name",
        width: 150,
        
      },
      {
        headerName: "ค่าไฟ",
        field: "ElectricityBill",
        width: 150,
        renderCell: ({ value }: GridRenderCellParams<Number>) => (
          <Typography variant="body1">
            <NumericFormat
              value={value}
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={"฿"}
            />
          </Typography>
        ),
      },
      {
        headerName: "ค่าน้ำ",
        field: "WaterBill",
        width: 150,
        renderCell: ({ value }: GridRenderCellParams<Number>) => (
          <Typography variant="body1">
            <NumericFormat
              value={value}
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={"฿"}
            />
          </Typography>
        ),
      },
      {
        headerName: "ค่าห้อง",
        field: "price",
        width: 150,
        renderCell: ({ value }: GridRenderCellParams<Number>) => (
          <Typography variant="body1">
            <NumericFormat
              value={value}
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={"฿"}
            />
          </Typography>
        ),
      },
      {
        headerName: "ยอดรวม",
        field: "TotalPrice",
        width: 150,
        renderCell: ({ value }: GridRenderCellParams<Number>) => (
          <Typography variant="body1">
            <NumericFormat
              value={value}
              displayType={"text"}
              thousandSeparator={true}
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={"฿"}
            />
          </Typography>
        ),
      },
      {
        headerName: "วันที่สร้าง",
        field: "CreatedAt",
        width: 200,
        renderCell: ({ value }: GridRenderCellParams<any>) => (
          <Typography variant="body1">
            <Moment format="DD/MM/YYYY HH:mm">{value}</Moment>
          </Typography>
        ),
      },
      {
        headerName: "จัดการ",
        field: ".",
        width: 140,
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
                  window.location.href = "/Cost/edit/" + row.ID;
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
                    let res = await DeleteCostID(row.ID);
                    if (res.status) {
                      Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success",
                      });
                    }
                    getCost();
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

    const getCost= async () => {
        
      let res = await GetCost();
      if (res) {
        console.log(res);
        setCost(res);
      }
    };

    useEffect(() => {
      getCost();
    }, []);
  
    return (

      <>
        <Container maxWidth="xl">
        <Paper elevation={3} style={{  marginBottom: '20px' }}>
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
            Cost
          </Typography>
          <IconButton
              aria-label="add"
              size="large"
              sx={{ marginLeft: 156, marginBottom: 2, padding: 1.5 }}
              onClick={() => {
                let timerInterval: any;
                Swal.fire({
                  title: "Please wait",
                  text: "System is going to the add page !",
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
                  window.location.href = "/Cost/add" ;
                });
              }}
            ><AddIcon fontSize="inherit" /></IconButton>
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
                rows={cost}
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

export default Cost