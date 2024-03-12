import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { LoginUserInterface } from "../../interfaces/lLogin_user";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const theme = createTheme();

function LoginUser() {
  const [signin, setSignin] = useState<Partial<LoginUserInterface>>({});
  const [signinAdmin, setSigninAdmin] = useState<Partial<LoginUserInterface>>(
    {}
  );
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  async function LoginUser(data: LoginUserInterface) {
    const apiUrl = "http://localhost:8080";
    // const apiUrl = "https://api.megood.site";
   
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    let res = await fetch(`${apiUrl}/login/user`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("uid", res.data.id);
          localStorage.setItem("StudentID", res.data.studentID);
          localStorage.setItem("position", res.data.position);
          return res.data;
        } else {
          console.log(res.error);
          return false;
        }
      });

    return res;
  }

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof signin;
    const { value } = event.target;
    setSignin({ ...signin, [id]: value });
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const submitUser = async () => {
    let res = await LoginUser(signin);
    if (res) {
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setError(true);
    }
  };

  return (
    <ThemeProvider
      theme={createTheme({
        typography: {
          fontFamily: "Mohave,Noto Sans Thai",
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
          fontWeightBold: 600,
        },
        spacing: 8,
        palette: {
          primary: {
            main: "#000",
          },
          background: {
            default: "#fff8f8",
          },
        },
      })}
    >
      {/** Sign In */}
      <Grid container component="main" sx={{ height: "100vh" }}>
        {/** Sign In Alert*/}
        <Snackbar
          id="success"
          open={success}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            เข้าสู่ระบบสำเร็จ
          </Alert>
        </Snackbar>
        <Snackbar
          id="error"
          open={error}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="error">
            รหัสนักศึกษาหรือรหัสผ่านไม่ถูกต้อง
          </Alert>
        </Snackbar>

        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${
              process.env.PUBLIC_URL + "/image/sut1.png"
            })`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 16,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Avatar
              sx={{ p: 3, m: 2, bgcolor: "#FF884C", cursor: "pointer" }}
              onClick={handleClickOpen}
            >
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h2" sx={{ color:"#FF884C", marginBottom:"10px"}}>
              MeGoodDorm
            </Typography>
            <Typography component="h1" variant="h6" sx={{color: "#A0A0A0" }}>
              Suranaree University of Technology
            </Typography>
            <Box sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                fullWidth
                id="StudentID"
                label="StudentID"
                name="StudentID"
                autoComplete="StudentID"
                autoFocus
                value={signin.StudentID || ""}
                onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="Password"
                autoComplete="current-password"
                value={signin.Password || ""}
                onChange={handleInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="warning"
                sx={{ mt: 3, mb: 2, p: 1.2}}
                onClick={submitUser}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginUser;
